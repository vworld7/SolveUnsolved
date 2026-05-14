import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── data ─────────────────────────────────────────────────── */
const capabilities = [
  {
    title: "Signal Detected. Context Verified. Action Triggered.",
    detail:
      "Event intelligence fuses observability, workflow state, and policy to trigger the right response path in seconds.",
  },
  {
    title: "One Platform. Any Stack. Production Ready.",
    detail:
      "Deploy across cloud, on-prem, or hybrid with reusable adapters and runtime controls designed for enterprise IT landscapes.",
  },
  {
    title: "One Team Sees. Every Team Aligns.",
    detail:
      "Shared operational graph synchronizes architecture, product, and engineering decisions with fewer escalations and faster throughput.",
  },
];

const metrics = [
  { value: "47%", label: "Less workflow touchpoints" },
  { value: "2.6x", label: "Faster release cycle" },
  { value: "99.99%", label: "Availability target" },
];

const services = [
  {
    icon: "✉",
    title: "Email Marketing",
    detail:
      "Targeted campaigns that nurture leads, re-engage dormant contacts, and drive measurable pipeline outcomes at every stage.",
  },
  {
    icon: "🌐",
    title: "Website Creation",
    detail:
      "High-performance, conversion-optimized websites built on modern stacks with full accessibility, SEO, and mobile coverage.",
  },
  {
    icon: "📱",
    title: "App Development",
    detail:
      "Mobile and web applications from concept to production — designed for usability and built to scale with your business.",
  },
  {
    icon: "⚡",
    title: "Automation",
    detail:
      "Eliminate repetitive manual work with intelligent workflow automation across your entire IT and business operations stack.",
  },
  {
    icon: "◑",
    title: "Social Media",
    detail:
      "Strategic content, scheduling, and analytics that grow your brand presence and generate qualified inbound leads consistently.",
  },
];

const whyUs = [
  {
    icon: "◈",
    title: "Built by practitioners",
    detail:
      "Founded by enterprise IT veterans with 15+ years delivering large-scale transformation programs. We've lived the problem. We built the fix.",
  },
  {
    icon: "◉",
    title: "Outcome-first, not feature-first",
    detail:
      "We don't measure success by features shipped. We measure it by friction removed, cycles compressed, and decisions unblocked.",
  },
  {
    icon: "◌",
    title: "Startup velocity, enterprise discipline",
    detail:
      "Quarterly releases, zero vendor lock-in, and a roadmap driven by your real problems — not a backlog maintained by committee.",
  },
];

/* ─── helpers ───────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── HeroMesh canvas ───────────────────────────────────────── */
function HeroMesh() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const COUNT = 72;
    const LINK_DIST = 160;
    const DOT_R = 1.8;
    const COLOR = "22,178,157";

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${COLOR},${0.28 * (1 - d / LINK_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},0.55)`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="hero-mesh" aria-hidden="true" />;
}

/* ─── LeadModal ─────────────────────────────────────────────── */
function LeadModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lead = { name, email, company, ts: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("su_leads") || "[]");
    localStorage.setItem("su_leads", JSON.stringify([...existing, lead]));
    setSubmitted(true);
  };

  return (
    <motion.div
      className="modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close dialog">
          ✕
        </button>

        {submitted ? (
          <div className="modal-success">
            <span className="success-icon" aria-hidden="true">✓</span>
            <h3 id="modal-title">You're on the list.</h3>
            <p>We'll be in touch within one business day. Keep building.</p>
            <button className="btn btn-primary" onClick={onClose}>
              Back to site
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Book a Free Demo</p>
            <h3 id="modal-title">See Solve Unsolved in action.</h3>
            <p className="modal-sub">
              Book a free 30-minute live demo. We'll walk through the platform,
              map it to your use case, and answer every question — no commitment required.
            </p>
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-row">
                <label className="sr-only" htmlFor="lead-name">Full name</label>
                <input
                  id="lead-name"
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
                <label className="sr-only" htmlFor="lead-email">Work email</label>
                <input
                  id="lead-email"
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <label className="sr-only" htmlFor="lead-company">Company name</label>
              <input
                id="lead-company"
                type="text"
                placeholder="Company name (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="organization"
              />
              <button type="submit" className="btn btn-primary">
                Book a Free Demo →
              </button>
            </form>
            <p className="modal-privacy">
              Your information is stored locally and never shared with third parties.
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── App ───────────────────────────────────────────────────── */
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLight, setIsLight] = useState(
    () => localStorage.getItem("su_theme") === "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    localStorage.setItem("su_theme", isLight ? "light" : "dark");
  }, [isLight]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="site-shell" id="top">
      <AnimatePresence>
        {modalOpen && <LeadModal onClose={closeModal} />}
      </AnimatePresence>

      <header className="topbar container">
        <a href="#" className="brand" aria-label="Solve Unsolved Home">
          <span className="brand-mark" />
          Solve Unsolved
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#platform">Platform</a>
          <a href="#why">Why Us</a>
          <a href="#model">Model</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={() => setIsLight((v) => !v)}
            aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
          >
            {isLight ? "🌙" : "☀️"}
          </button>
          <button className="btn btn-ghost" type="button" onClick={openModal}>
            Book Advisory Call
          </button>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero-wrap">
          <HeroMesh />
          <div className="hero container">
            <motion.p className="eyebrow" {...fadeUp(0)}>
              Purpose-built for enterprise IT leadership
            </motion.p>
            <motion.h1 {...fadeUp(0.08)}>
              Built for IT leaders who are done explaining why transformation takes
              this long.
            </motion.h1>
            <motion.p className="hero-copy" {...fadeUp(0.16)}>
              Solve Unsolved removes the gap between your strategy and your execution.
              One adaptive platform that eliminates handoff failures, compresses
              delivery cycles, and gives every stakeholder a real-time view of
              what's actually moving.
            </motion.p>
            <motion.div className="hero-actions" {...fadeUp(0.22)}>
              <button className="btn btn-primary" type="button" onClick={openModal}>
                Get Started Free
              </button>
              <button className="btn btn-outline" type="button" onClick={openModal}>
                Book 30-min Strategy Call
              </button>
            </motion.div>
            <motion.div
              className="metrics-row"
              aria-label="Platform metrics"
              {...fadeUp(0.3)}
            >
              {metrics.map((item) => (
                <article key={item.label} className="signal-card">
                  <h2>{item.value}</h2>
                  <p>{item.label}</p>
                </article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <section className="ticker" aria-label="platform value signals">
          <div className="ticker-track">
            <span>INTELLIGENT ORCHESTRATION</span>
            <span>ZERO VENDOR LOCK-IN</span>
            <span>BOARDROOM VISIBILITY</span>
            <span>SECURITY BY DEFAULT</span>
            <span>API-FIRST ARCHITECTURE</span>
            <span>ALWAYS-ON OPERATIONS</span>
            <span>INTELLIGENT ORCHESTRATION</span>
            <span>ZERO VENDOR LOCK-IN</span>
            <span>BOARDROOM VISIBILITY</span>
            <span>SECURITY BY DEFAULT</span>
          </div>
        </section>

        {/* ── Platform capabilities ── */}
        <section id="platform" className="container section">
          <motion.div className="section-head" {...fadeUp(0)}>
            <p className="eyebrow">Platform Advantage</p>
            <h2>THREE CORE CAPABILITIES. ONE DECISIVE OPERATING LAYER.</h2>
          </motion.div>
          <div className="offer-grid">
            {capabilities.map((item, i) => (
              <motion.article
                key={item.title}
                className="offer-card"
                {...fadeUp(i * 0.1)}
              >
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <button className="card-link" type="button" onClick={openModal}>
                  Learn more →
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="container section">
          <motion.div className="section-head" {...fadeUp(0)}>
            <p className="eyebrow">What We Deliver</p>
            <h2>SERVICES BUILT FOR MODERN DIGITAL GROWTH.</h2>
          </motion.div>
          <div className="services-grid">
            {services.map((item, i) => (
              <motion.article
                key={item.title}
                className="service-card"
                {...fadeUp(i * 0.08)}
                onClick={openModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openModal()}
              >
                <span className="service-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span className="card-link">Get started →</span>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── Why Us ── */}
        <section id="why" className="container section">
          <motion.div className="section-head" {...fadeUp(0)}>
            <p className="eyebrow">Why Solve Unsolved</p>
            <h2>WE'VE LIVED THE PROBLEM. NOW WE'VE BUILT THE FIX.</h2>
          </motion.div>
          <div className="why-grid">
            {whyUs.map((item, i) => (
              <motion.article key={item.title} className="why-card" {...fadeUp(i * 0.1)}>
                <span className="why-icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── Advantage ── */}
        <section id="advantage" className="container section split-section">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow">Strategic Design</p>
            <h2>Built by UI/UX specialists with consulting-grade simplification</h2>
            <p className="muted">
              This experience is intentionally high-clarity: less clicks, fewer
              handoffs, and stronger decision confidence. Each journey is optimized to
              get users from intent to outcome in the minimum number of interactions.
            </p>
          </motion.div>
          <div className="pillars-grid" role="list">
            {[
              "Consulting-led IA for executive and operator personas",
              "Unified navigation model across platform modules",
              "Data-first dashboards for quick action and less noise",
              "Automation-first workflows to remove repetitive approvals",
              "Component design system for predictable adoption",
              "Progressive disclosure to reduce cognitive load",
            ].map((pillar, i) => (
              <motion.div
                key={pillar}
                className="pillar-item"
                role="listitem"
                {...fadeUp(i * 0.07)}
              >
                <span className="dot" aria-hidden="true" />
                <p>{pillar}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Engagement model ── */}
        <section id="model" className="container section timeline-wrap">
          <motion.div className="section-head" {...fadeUp(0)}>
            <p className="eyebrow">Engagement Model</p>
            <h2>Discover. Deploy. Scale. Repeat with measurable value.</h2>
          </motion.div>
          <div className="timeline">
            {[
              {
                n: "01",
                label: "Discover",
                d: "Map architecture debt, surface process friction points, and align on measurable outcome KPIs with your leadership team.",
              },
              {
                n: "02",
                label: "Deploy",
                d: "Activate high-impact workflows, release integration accelerators, and ship your first production wave in weeks — not months.",
              },
              {
                n: "03",
                label: "Scale",
                d: "Expand across business units using governance patterns, reusable modules, and real-time analytics to sustain compounding value.",
              },
            ].map((wave, i) => (
              <motion.article
                key={wave.n}
                className="timeline-card"
                {...fadeUp(i * 0.12)}
              >
                <span className="timeline-num">{wave.n}</span>
                <h3>{wave.label}</h3>
                <p>{wave.d}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section
          id="contact"
          className="container section cta-panel"
          {...fadeUp(0)}
        >
          <p className="eyebrow">Ready To Accelerate?</p>
          <h2>Build your next-gen IT SaaS platform with less complexity.</h2>
          <div className="cta-actions">
            <button className="btn btn-primary" type="button" onClick={openModal}>
              Start Your Transformation
            </button>
            <button className="btn btn-outline" type="button" onClick={openModal}>
              Book 30-min Strategy Call
            </button>
          </div>
        </motion.section>
      </main>

      <footer className="container footer">
        <p>Solve Unsolved</p>
        <p>Enterprise IT SaaS. Precision execution for modern transformation.</p>
      </footer>
    </div>
  );
}

export default App;
