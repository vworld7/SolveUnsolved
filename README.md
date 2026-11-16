[README.md](https://github.com/user-attachments/files/34912716/README.md)
# Solve Unsolved

## Contact form email setup

The contact, demo, and advisory forms send requests through the Vercel function in
`api/contact.js`. Configure these environment variables in the Vercel project:

- `RESEND_API_KEY`: API key from Resend.
- `RESEND_FROM_EMAIL`: sender address using a domain verified with Resend, for example
  `Solve Unsolved <website@your-verified-domain.com>`.
- `CONTACT_EMAIL` (optional): destination inbox. Defaults to
  `support@solveunsolved.com`.

Add the variables to the Vercel deployment environments and redeploy. For local
development, use `vercel dev` after setting the same variables in a local
`.env.local` file. Do not expose the Resend API key in frontend code or use a
`VITE_`-prefixed variable for it.
