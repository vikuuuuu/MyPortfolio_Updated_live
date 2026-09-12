import React, { useEffect, useState, useRef, useMemo } from "react";
import "./Home.css";
import ProfileImage from "./Component/img/image vector.png";
import ProfilePic from "./Component/img/ProfileImg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faWhatsapp,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { MdOutlineFileDownload } from "react-icons/md";
import {
  FaCloud,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaAws,
  FaGitAlt,
  FaGithub as FaGithubIcon,
  FaFigma,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiFirebase,
  SiVisualstudiocode,
} from "react-icons/si";
import { CiMail } from "react-icons/ci";
import { BsSun, BsMoon } from "react-icons/bs";

import mydashpic from "./Component/img/mydashpic.png";
import OnlineExam from "./Component/img/onlineExam.png";
import MyPort from "./Component/img/portfolio image.png";

import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

import TechMarquee from "./Component/TechMarquee";
import ProjectFilter from "./Component/ProjectFilter";
import SectionHeader from "./Component/SectionHeader";
import Timeline from "./Component/Timeline";
import Certifications from "./Component/Certifications";

// ─── Flip Card Projects ───────────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    image: mydashpic,
    title: "MyDashboard",
    desc: "All-in-one productivity dashboard with 10+ built-in tools.",
    tag: "React.js",
    tagClass: "react",
    category: "Full-stack",
    url: "https://mydashboard-vikuu.vercel.app/dashboard",
    isDashboard: true,
    features: [
      "Notes", "My Financials", "Image → PDF",
      "All-in-One Image", "PDF Tool", "Video → Image",
      "Web Chat", "My Video Editor", "All File Studio", "Study Tool",
    ],
  },
  {
    id: 2,
    image: OnlineExam,
    title: "Online Exam Dashboard",
    desc: "Real-time exam platform with intuitive UX and score tracking.",
    tag: "React.js",
    tagClass: "react",
    category: "React",
    url: "https://quizmasterr-eta.vercel.app/",
    features: ["Real-time quiz engine", "Score & timer system", "Result analytics", "Responsive UI"],
  },
  {
    id: 3,
    image: MyPort,
    title: "My Portfolio",
    desc: "Personal portfolio showcasing skills, projects & experience.",
    tag: "React.js",
    tagClass: "react",
    category: "Design",
    url: "/",
    features: ["Dark / Light mode", "AOS animations", "Typing effect", "EmailJS contact"],
  },
];

// ── FlipCard ──────────────────────────────────────────────────────────
// BUG FIX: this card used to carry its own `data-aos="zoom-in"` attribute.
// AOS applies its own `transform`/`opacity` styles directly to whatever
// element `data-aos` is on. Because `.flip-card` is also the element that
// establishes the 3D flip context (`perspective`) for its child
// `.flip-card-inner` (which uses `transform-style: preserve-3d` +
// `rotateY`), having AOS *also* write a transform onto `.flip-card`
// flattened that 3D context in some browsers — the card would go blank
// instead of flipping. Fix: AOS now lives one level up, on the grid
// wrapper only (`.projects-flip-grid`), so `.flip-card` itself never gets
// a competing transform.
function FlipCard({ project }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (e) => {
    if (e.target.tagName === "A") return;
    setFlipped((f) => !f);
  };

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-label={`${project.title} — click to flip`}
    >
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front">
          <div className="card-img-area">
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <div className="card-img-placeholder">{project.emoji}</div>
            )}
            <span className={`card-tag-badge ${project.tagClass}`}>
              {project.tag}
            </span>
          </div>
          <div className="card-body-front">
            <div className="card-name">{project.title}</div>
            <p className="card-desc-short">{project.desc}</p>
          </div>
          <div className="flip-hint-bar">
            <span>
              <span className="flip-dot" />
              Click to see details
            </span>
            <span>↕</span>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back">
          <div className="back-card-title">{project.title}</div>

          {project.isDashboard ? (
            <div className="dash-features-grid">
              {project.features.map((f) => (
                <div className="dash-feat-item" key={f}>{f}</div>
              ))}
            </div>
          ) : (
            <ul className="back-features-list">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}

          <div className="back-cta-row">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="back-view-btn"
                onClick={(e) => e.stopPropagation()}
              >
                View Project ↗
              </a>
            ) : (
              <span className="back-view-btn disabled">🚧 In Progress</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Home Component ──────────────────────────────────────────────
function Home() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Typing effect
  const typingTimeoutRef = useRef(null);
  const erasingTimeoutRef = useRef(null);
  const currentTextIndexRef = useRef(0);
  const currentCharIndexRef = useRef(0);

  useEffect(() => {
    const textElement = document.getElementById("Typing");
    if (!textElement) return;
    const texts = ["Front-end Developer 💻", "Graphic Designer 🎨"];
    const typingSpeed = 100;
    const delayBetweenTexts = 1000;

    function type() {
      const idx = currentTextIndexRef.current;
      const charIdx = currentCharIndexRef.current;
      if (charIdx < texts[idx].length) {
        textElement.textContent += texts[idx].charAt(charIdx);
        currentCharIndexRef.current += 1;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        erasingTimeoutRef.current = setTimeout(erase, delayBetweenTexts);
      }
    }

    function erase() {
      const idx = currentTextIndexRef.current;
      const charIdx = currentCharIndexRef.current;
      if (charIdx > 0) {
        textElement.textContent = texts[idx].substring(0, charIdx - 1);
        currentCharIndexRef.current -= 1;
        erasingTimeoutRef.current = setTimeout(erase, typingSpeed);
      } else {
        currentTextIndexRef.current = (idx + 1) % texts.length;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      }
    }

    type();
    return () => {
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(erasingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Vikash Sharma Resume II.pdf";
    link.download = "Vikash Sharma Resume II.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailjs.send(
        "service_xhb4lql", "template_tt7dd2k",
        { from_name: formData.name, from_email: formData.email, from_subject: formData.subject, message: formData.message },
        "_ejeQU96yZXmYtUdm"
      );
      await emailjs.send(
        "service_xhb4lql", "template_thvj6b4",
        { to_email: formData.email, to_name: formData.name, to_subject: formData.subject, original_message: formData.message },
        "_ejeQU96yZXmYtUdm"
      );
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── Hero stat pills ──
  const heroStats = [
    { label: "Projects Shipped", value: "10+" },
    { label: "Companies Worked With", value: "3" },
    { label: "Core Technologies", value: "7+" },
    { label: "Currently", value: "MCA" },
  ];

  // ── About: quick facts ──
  const aboutFacts = [
    { label: "Location", value: "Jaipur, Rajasthan" },
    { label: "Focus", value: "Frontend & Cloud Deployment" },
    { label: "Education", value: "Pursuing MCA" },
    { label: "Availability", value: "Open to freelance" },
  ];

  // ── Skills: categorized (replaces the old flat grid) ──
  const skillCategories = [
    {
      title: "Web Development",
      icon: <FaReact />,
      skills: [
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#888888" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
      ],
    },
    {
      title: "Cloud & Deployment",
      icon: <FaCloud />,
      skills: [
        { name: "Cloud Computing", icon: <FaCloud />, color: "#4285F4" },
        { name: "AWS", icon: <FaAws />, color: "#FF9900" },
        { name: "Vercel", icon: <SiVercel />, color: "#999999" },
        { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
      ],
    },
    {
      title: "Tools & Workflow",
      icon: <FaGitAlt />,
      skills: [
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        { name: "GitHub", icon: <FaGithubIcon />, color: "#888888" },
        { name: "Figma", icon: <FaFigma />, color: "#F24E1E" },
        { name: "VS Code", icon: <SiVisualstudiocode />, color: "#007ACC" },
      ],
    },
  ];

  // ── Experience & Education: fed into the shared Timeline component ──
  const experienceItems = [
    {
      title: "Web Developer",
      subtitle: "NullCyberX",
      meta: "Jan 2025 – Aug 2025",
      badge: "Most Recent",
    },
    {
      title: "Web Developer",
      subtitle: "3Handshake Innovation Pvt. Ltd.",
      meta: "Jan 2024 – Aug 2024",
    },
    {
      title: "Digital Marketing",
      subtitle: "The Raptor Marketing",
      meta: "Jan 2023 – June 2023",
    },
  ];

  const educationItems = [
    {
      title: "Master of Computer Applications (MCA)",
      subtitle: "Rajasthan Technical University, Kota",
      meta: "2025 – 2027",
      badge: "🎓 Currently Pursuing",
    },
    {
      title: "Bachelor of Vocational (B.Voc)",
      subtitle: "Bhartiya Skill Development University, Jaipur",
      meta: "2022 – 2025",
      badge: "✅ Completed",
      badgeClass: "completed",
    },
  ];

  // ── Project filtering ──
  const categories = useMemo(
    () => [...new Set(projectsData.map((p) => p.category))],
    []
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projectsData
        : projectsData.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "light" ? <BsMoon /> : <BsSun />}
      </button>

      {/* Background */}
      <div className="background-animation" aria-hidden="true">
        <div className="floating-shapes">
          <span /><span /><span /><span /><span />
        </div>
      </div>

      <main className="main">

        {/* ── 01 · HOME / HERO ── */}
        <section className="Home" id="Home">
          <div className="hero-glow" aria-hidden="true" />

          <div className="ProfileContainer">
            <div className="hero-eyebrow" style={{ animationDelay: "0.05s" }}>
              <span className="hero-eyebrow-index">01</span>
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Frontend Developer &amp; Designer</span>
            </div>

            <h1 className="ProfileName1" style={{ animationDelay: "0.15s" }}>
              Vikash <em>Sharma</em>
            </h1>

            <div className="ProfileName2" style={{ animationDelay: "0.3s" }}>
              I'm <span id="Typing" className="Typing" />
            </div>

            <p className="HeroTagline" style={{ animationDelay: "0.45s" }}>
              Crafting bold, high-converting interfaces with delightful motion,
              clean code, and modern UX patterns.
            </p>

            <div className="HeroActions" style={{ animationDelay: "0.6s" }}>
              <a className="PrimaryAction" href="#Contact">Let's Collaborate</a>
              <a className="SecondaryAction" href="#Project">View Projects</a>
            </div>

            <div className="hero-stats" style={{ animationDelay: "0.75s" }}>
              {heroStats.map((stat) => (
                <div className="hero-stat-pill" key={stat.label}>
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="ProfileIcon" style={{ animationDelay: "0.9s" }}>
              <a href="https://www.linkedin.com/in/vikash-sharma-48b27a263/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://github.com/vikuuuuu" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://x.com/vikashsrma" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="https://wa.me/919571404881?text=Hello%2C%20Vikash%20Sharma" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href="https://aratt.ai/user/@vikusrma" target="_blank" rel="noreferrer">
                <img className="socialIconImage" src="https://img.icons8.com/color/48/arattai.png" alt="arattai" />
              </a>
            </div>
          </div>

          <div className="ProfileImageContainer">
            <div className="hero-img-ring" aria-hidden="true" />
            <img className="Profile" src={ProfileImage} alt="Vikash Sharma" />
          </div>
        </section>

        {/* ── LIVE TECH STACK MARQUEE ── */}
        <TechMarquee />

        {/* ── 02 · ABOUT ── */}
        <section className="About" id="About" data-aos="fade-up">
          <SectionHeader index="02" tag="Get to know me" title="About Me" />
          <div className="AboutContainer-Box">
            <div className="Aboutbox1" data-aos="zoom-in">
              <img src={ProfilePic} alt="Vikash Sharma" />
              <span className="about-badge">Open to freelance</span>
            </div>
            <div className="Aboutbox2" data-aos="fade-left">
              <p className="AboutDetails">
                I'm a frontend developer and graphic designer based in Jaipur,
                blending clean engineering with a designer's eye for detail.
                My day-to-day toolkit centers on React and Next.js, and I
                regularly ship and deploy production apps using Firebase,
                Vercel, and AWS. Alongside freelance and agency work, I'm
                currently pursuing my Master's in Computer Applications —
                deepening my foundations in cloud computing, security, and
                software engineering while continuing to build real,
                production-ready web apps.
              </p>

              <div className="about-facts-grid">
                {aboutFacts.map((fact) => (
                  <div className="about-fact" key={fact.label}>
                    <span className="about-fact-label">{fact.label}</span>
                    <span className="about-fact-value">{fact.value}</span>
                  </div>
                ))}
              </div>

              <button className="Resumebtn" onClick={handleDownload}>
                Resume <MdOutlineFileDownload className="downloadbtn" />
              </button>
            </div>
          </div>
        </section>

        {/* ── 03 · SKILLS (categorized) ── */}
        <section className="Skills" id="Skills" data-aos="fade-up">
          <SectionHeader index="03" tag="What I work with" title="Technical Skills" />
          <div className="skills-category-grid">
            {skillCategories.map((cat, ci) => (
              <div
                className="skills-category-card"
                key={cat.title}
                data-aos="fade-up"
                data-aos-delay={ci * 120}
              >
                <div className="skills-category-header">
                  <span className="skills-category-icon">{cat.icon}</span>
                  <h3>{cat.title}</h3>
                </div>
                <div className="skills-chip-grid">
                  {cat.skills.map((skill) => (
                    <div
                      className="skill-chip"
                      key={skill.name}
                      style={{ "--skill-color": skill.color }}
                    >
                      <span className="skill-chip-icon">{skill.icon}</span>
                      <span className="skill-chip-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 · EXPERIENCE (timeline) ── */}
        <section className="Experience" id="Experience" data-aos="fade-up">
          <SectionHeader index="04" tag="Where I've worked" title="Experience" />
          <Timeline items={experienceItems} />
        </section>

        {/* ── 05 · EDUCATION (timeline) ── */}
        <section className="Education" id="Education" data-aos="fade-up">
          <SectionHeader index="05" tag="Academic background" title="Education" />
          <Timeline items={educationItems} />
        </section>

        {/* ── 06 · CERTIFICATIONS ── */}
        <section className="Certifications" id="Certifications" data-aos="fade-up">
          <SectionHeader
            index="06"
            tag="Recognition"
            title="Certifications & Achievements"
          />
          <Certifications />
        </section>

        {/* ── 07 · PROJECTS ── */}
        <section className="Project" id="Project" data-aos="fade-up">
          <SectionHeader
            index="07"
            tag="Selected work"
            title="Projects"
            subtitle="Click any card to reveal features & links"
          />

          <ProjectFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />

          {/* AOS lives here, on the grid wrapper — NOT on individual
              .flip-card elements — so it never fights the 3D flip
              transform (see the FlipCard bug-fix note above). */}
          <div className="projects-flip-grid" data-aos="fade-up" data-aos-delay="100">
            {filteredProjects.map((project) => (
              <FlipCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── 08 · CONTACT ── */}
        <section className="contact-section" id="Contact" data-aos="fade-up">
          <div className="contact-container">
            <SectionHeader index="08" tag="Get in touch" title="Contact" />
            <div className="contact-grid">
              <div className="contact-info" data-aos="fade-right">
                <div className="info-block">
                  <div className="icon-circle"><FaMapMarkerAlt /></div>
                  <div>
                    <h4>Address</h4>
                    <p>Jaipur, Rajasthan 302026</p>
                  </div>
                </div>
                <div className="info-block">
                  <div className="icon-circle"><FaPhoneAlt /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 95714 04881</p>
                  </div>
                </div>
                <div className="info-block">
                  <div className="icon-circle"><CiMail /></div>
                  <div>
                    <h4>Email Us</h4>
                    <p>vikashsharmajaipur@zohomail.in</p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
                <div className="form-row">
                  <input type="text" name="name" placeholder="Your Name"
                    value={formData.name} onChange={handleChange} required />
                  <input type="email" name="email" placeholder="Your Email"
                    value={formData.email} onChange={handleChange} required />
                </div>
                <input type="text" name="subject" placeholder="Subject"
                  value={formData.subject} onChange={handleChange} required />
                <textarea name="message" rows="7" placeholder="Message"
                  value={formData.message} onChange={handleChange} required />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">© 2025 Vikash Sharma — All rights reserved</footer>

      </main>
    </>
  );
}

export default Home;
