import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";
import portrait from "@/assets/portrait.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhumica C — Aspiring Data Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Bhumica C, B.E. CSE – Data Science student at Sapthagiri NPS University, Bengaluru. Data analysis, machine learning and research projects.",
      },
      { property: "og:title", content: "Bhumica C — Aspiring Data Analyst" },
      {
        property: "og:description",
        content:
          "Turning data into meaningful insights and real-world solutions. Projects in data analytics, machine learning and computer vision.",
      },
    ],
  }),
  component: Portfolio,
});

const LINKEDIN = "https://www.linkedin.com/in/bhumica-c";
const GITHUB = "https://github.com/Bhumica-C";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.2 1.46-2.2 2.97V21h-4V9Z" />
    </svg>
  );
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#home" aria-label="Back to top" className="block h-5 w-5" />
        <nav className="hidden items-center gap-8 md:flex">
          {sections.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative text-[0.8rem] tracking-wide transition-colors ${
                active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
              <span
                className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-olive transition-opacity duration-300 ${
                  active === s.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-5 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-5 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3 font-display text-lg tracking-tight"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function SectionHead({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <Reveal className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-5">
      <div>
        <p className="eyebrow mb-3">{index}</p>
        <h2 className="display-xl text-4xl sm:text-5xl">{title}</h2>
      </div>
      {kicker && (
        <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground sm:block">
          {kicker}
        </p>
      )}
    </Reveal>
  );
}

function Hero() {
  return (
    <section id="home" className="relative px-6 pt-32 pb-20 sm:pt-40">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <Reveal>
          <p className="eyebrow mb-6">Bengaluru, India · Class of 2028</p>
          <h1 className="display-xl text-[clamp(2.25rem,5vw,3.5rem)] whitespace-nowrap">
            BHUMICA C
          </h1>
          <p className="mt-6 font-serif text-2xl text-olive italic sm:text-3xl">
            Aspiring Data Analyst
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            Turning data into meaningful insights and real-world solutions. A CSE – Data Science
            student exploring data analysis, visualization and machine learning to solve problems
            that matter.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-md bg-olive px-6 py-3 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-foreground/25 px-6 py-3 text-sm tracking-wide transition-colors hover:border-olive hover:text-olive"
            >
              Let's Connect
            </a>
            <div className="ml-2 flex items-center gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-olive"
              >
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-olive"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative flex flex-col items-center lg:items-end">
          <img
            src={portrait}
            alt="Portrait of Bhumica C"
            width={538}
            height={521}
            className="aspect-square w-64 rounded-full border border-olive/30 object-cover object-center sm:w-80 lg:w-[22rem]"
          />
          <p className="mt-3 text-right font-serif text-sm text-muted-foreground italic">
            B.E. CSE – Data Science, Sapthagiri NPS University
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl items-center gap-3 text-muted-foreground">
        <span className="h-10 w-px animate-pulse bg-olive/60" />
        <span className="text-[0.7rem] tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

function About() {
  const qualities = [
    "Dedication",
    "Determination",
    "Curiosity",
    "Persistence",
    "Problem-solving",
    "Continuous learning",
  ];
  const enjoys = [
    "Working with datasets",
    "Identifying patterns",
    "Transforming raw information into actionable strategies",
    "Learning new analytical tools and techniques",
    "Taking on challenging problems",
  ];
  return (
    <section id="about" className="bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="01 — About" title="About Me" />
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="font-serif text-2xl leading-snug sm:text-[2rem]">
              “I am an aspiring data analyst with a strong passion for exploring data and uncovering
              meaningful insights that solve real-world problems.”
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {enjoys.map((e) => (
                <li key={e} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-px w-4 shrink-0 bg-olive" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-2">
              {qualities.map((q) => (
                <span
                  key={q}
                  className="rounded-full border border-olive/35 px-4 py-1.5 text-xs tracking-wide text-olive"
                >
                  {q}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-8">
            <dl className="rounded-xl border border-border bg-background p-7">
              {[
                ["Education", "B.E. – CSE, Data Science"],
                ["University", "Sapthagiri NPS University"],
                ["Graduation", "2028"],
                ["Location", "Bengaluru, India"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-6 border-b border-border py-3 last:border-0 last:pb-0 first:pt-0"
                >
                  <dt className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                    {k}
                  </dt>
                  <dd className="text-right text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="relative border-l border-border pl-7">
              <span className="absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full bg-olive" />
              <p className="eyebrow mb-2">2025 — 2028 (Expected)</p>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                B.E. — Computer Science & Engineering, Data Science
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sapthagiri NPS University, Bengaluru
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Academic focus across data science, programming, data analytics, machine learning,
                statistics and data visualization.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    no: "01",
    title: "Breast Cancer Detection",
    category: "Research · Ideathon",
    badge: "Research",
    desc: "An IoT-based device concept combining Graph Neural Networks with sensor data for early breast cancer detection and predictive analysis.",
    tech: ["GNN", "IoT Sensors", "Machine Learning", "Healthcare Tech", "Predictive Analysis"],
  },
  {
    no: "02",
    title: "Smart Waste Image Detection",
    category: "Computer Vision",
    badge: "Paper Publication",
    desc: "A Java-based smart waste detection system that identifies and categorises waste using image processing concepts.",
    tech: ["Java", "Image Processing", "Computer Vision", "Smart Waste Management"],
  },
  {
    no: "03",
    title: "Spam Email Detection",
    category: "Machine Learning",
    desc: "A machine learning classifier that detects spam emails using the Naive Bayes algorithm with text preprocessing.",
    tech: ["Python", "Naive Bayes", "Text Classification", "Data Preprocessing"],
  },
  {
    no: "04",
    title: "AI-Based License Plate Recognition",
    category: "Computer Vision",
    badge: "Paper Publication",
    desc: "An AI system for recognising vehicle license plates using computer vision and deep learning techniques.",
    tech: ["AI", "Computer Vision", "CNN", "Recognition"],
  },
];

function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="02 — Selected Work"
          title="Featured Projects"
          kicker="Academic, research and hackathon projects built around data, vision and machine learning."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal
              key={p.no}
              delay={i * 90}
              as="article"
              className="group flex flex-col rounded-xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-olive/40 hover:shadow-[0_18px_40px_-28px_rgba(60,55,40,0.5)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-3xl font-bold text-olive/35">{p.no}</span>
                {p.badge && (
                  <span className="rounded-full bg-olive/10 px-3 py-1 text-[0.65rem] tracking-[0.15em] text-olive uppercase">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="eyebrow mt-6">{p.category}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border px-2.5 py-1 text-[0.7rem] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-7 inline-flex w-fit items-center gap-2 text-sm text-olive"
              >
                View on GitHub <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  { title: "Programming", items: ["Python", "Java", "R", "SQL"] },
  {
    title: "Data Analytics",
    items: [
      "Pandas",
      "NumPy",
      "Power BI",
      "Statistics",
      "Data Analysis",
      "Data Visualization",
    ],
  },
  { title: "Machine Learning", items: ["Naive Bayes", "SVM", "GNN", "CNN"] },
  { title: "Tools & Platforms", items: ["GitHub", "Visual Studio", "Google Colab", "Claude", "Jupyter"] },
  {
    title: "Professional",
    items: ["Communication", "Problem Solving", "Teamwork", "Leadership", "Volunteering"],
  },
];

function Skills() {
  return (
    <section id="skills" className="bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="03 — Toolkit" title="Skills" />
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 70} className="bg-background p-8">
              <h3 className="font-display text-lg font-semibold tracking-tight">{g.title}</h3>
              <span className="mt-3 mb-5 block h-px w-8 bg-olive" />
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md bg-card px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal delay={350} className="flex items-center bg-background p-8">
            <p className="font-serif text-xl leading-snug text-olive italic">
              Always adding one more tool to the kit.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="04 — Enquiry" title="Research & Innovation" />
        <p className="eyebrow mb-6">Published Research Papers</p>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {[
            {
              t: "AI-Based License Plate Recognition",
              pub: "TIJER",
              d: "A computer-vision system that detects vehicle number plates and extracts characters using deep learning and OCR, supporting automated traffic monitoring and smart parking.",
              url: "https://tijer.org/tijer/papers/TIJER2606022.pdf",
            },
            {
              t: "Smart Waste Image Detection",
              pub: "JETIR",
              d: "An image-classification model that identifies and categorises waste from photos, enabling smarter segregation and supporting sustainable waste management.",
              url: "https://www.jetir.org/papers/JETIR2512457.pdf",
            },
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 100} className="flex flex-col rounded-xl border border-border p-8 transition-colors hover:border-olive/50">
              <span className="w-fit rounded-full bg-olive/10 px-3 py-1 text-xs font-medium tracking-[0.15em] text-olive uppercase">
                Published · {p.pub}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.d}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-olive px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                View Published Paper →
              </a>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-6">
          <Reveal delay={120} className="rounded-xl border border-border bg-card p-8">
            <p className="eyebrow mb-6">Research Interests</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Data Analytics",
                "Machine Learning",
                "Computer Vision",
                "AI-based solutions",
                "Healthcare technology",
                "Smart systems",
              ].map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-px w-4 shrink-0 bg-olive" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const experience = [
  ["Smart India Hackathon (SIH)", "Team shortlisted for the next round"],
  ["National Level 24-Hour Hackathon", "Participant"],
  ["Bharatiya Antariksh Hackathon", "Participant"],
  ["Hack with Bengaluru 3.0", "Participant"],
  ["Debugging Event", "Participant"],
  ["Master UX Design Workshop", "Workshop"],
  ["Research Methodology & IPR Workshop", "Workshop"],
  ["Power BI Workshop", "Workshop"],
  ["ElevenLabs Workshop", "Workshop"],
  ["IoT Training", "Training"],
  ["Tech Mahindra", "Professional survey / interview exposure"],
  ["Soil Moisture Sensor Detection", "Hands-on project activity"],
];

function Experience() {
  return (
    <section id="experience" className="bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="05 — Practice"
          title="Experience & Innovation"
          kicker="Hands-on exposure through hackathons, workshops, training and collaborative events."
        />
        <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {experience.map(([title, meta], i) => (
            <Reveal
              key={title}
              as="li"
              delay={(i % 2) * 60}
              className="bg-background p-6 transition-colors hover:bg-card"
            >
              <p className="font-display text-lg font-semibold tracking-tight">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="06 — Recognition" title="Achievements" />
        <Reveal className="rounded-xl border border-olive/40 bg-olive/[0.06] p-10">
          <p className="eyebrow mb-4">Highlight</p>
          <h3 className="display-xl text-3xl sm:text-4xl">Smart India Hackathon</h3>
          <p className="mt-3 font-serif text-xl text-olive italic">
            Shortlisted for the next round
          </p>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Research Paper Publications", "Two published research projects"],
            ["Hackathon Participation", "National and city-level hackathons"],
            ["Technical Workshops", "UX, Power BI, IPR, ElevenLabs"],
            ["Innovation & Training", "Ideathon participation, IoT training"],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 80} className="rounded-xl border border-border p-6">
              <h4 className="font-display text-base font-semibold tracking-tight">{t}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 grid gap-8 border-t border-border pt-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-3">07 — Career Focus</p>
            <h3 className="display-xl text-4xl">Where I'm Headed</h3>
          </div>
          <div>
            <p className="font-serif text-2xl leading-snug">
              To become a skilled Data Analyst contributing to impactful decision-making through
              data-driven solutions.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {[
                "Data analysis",
                "Data visualization",
                "Business & problem insights",
                "Machine learning applications",
                "Real-world decision-making",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-olive/35 px-4 py-1.5 text-xs text-olive"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");
    try {
      const payload = new FormData();
      payload.append("access_key", "c9756b85-db3a-4846-9e6f-24c14a184088");
      payload.append("name", String(data.get("name")));
      payload.append("email", String(data.get("email")));
      payload.append("message", String(data.get("message")));
      payload.append("subject", `Portfolio message from ${data.get("name")}`);
      payload.append("from_name", "Portfolio Contact Form");
      payload.append("replyto", String(data.get("email")));
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead index="08 — Contact" title="Let's Connect" />
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="font-serif text-2xl leading-snug">
              Interested in data, technology, research, or building meaningful solutions? Let's
              connect.
            </p>
            <dl className="mt-10 space-y-4">
              <div>
                <dt className="eyebrow">Location</dt>
                <dd className="mt-1 text-base">Bengaluru, India</dd>
              </div>
            </dl>
            <div className="mt-8 flex gap-4">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-olive hover:text-olive"
              >
                <LinkedInIcon /> Bhumica C
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-olive hover:text-olive"
              >
                <GithubIcon /> Bhumica-C
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-border bg-background p-8">
              <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
              ].map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="eyebrow mb-2 block">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required
                    className="w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-olive"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="eyebrow mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-olive"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-md bg-olive px-6 py-3 text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {status === "sent" && (
                <p className="text-sm text-olive" role="status">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive" role="alert">
                  {errorMessage}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">Bhumica C</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Aspiring Data Analyst · CSE – Data Science
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="link-underline">
            LinkedIn
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="link-underline">
            GitHub
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bhumica C. All rights reserved.
      </p>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Research />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
