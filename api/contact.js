const allowedRequestTypes = new Set([
  "General inquiry",
  "Platform demo",
  "Advisory call",
  "Transformation inquiry",
]);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Please submit valid contact details." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const requestType =
    typeof body.requestType === "string" ? body.requestType.trim() : "";

  if (
    !name ||
    name.length > 120 ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    company.length > 160 ||
    !allowedRequestTypes.has(requestType)
  ) {
    return res.status(400).json({ error: "Please check your contact details and try again." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL || "support@solveunsolved.com";

  if (!apiKey || !from) {
    console.error("Contact email is not configured: set RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return res.status(503).json({
      error: "Our contact form is temporarily unavailable. Please try again later.",
    });
  }

  const text = [
    `Request type: ${requestType}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website ${requestType.toLowerCase()}`,
        text,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend rejected a contact email:", response.status, details);
      return res.status(502).json({
        error: "We couldn't send your request right now. Please try again shortly.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unable to reach Resend for a contact email:", error);
    return res.status(502).json({
      error: "We couldn't send your request right now. Please try again shortly.",
    });
  }
}
