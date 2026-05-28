import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import ProfileImage from "./img/image vector.png";
import ProfilePic from "./img/ProfileImg.jpg";
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
  FaShieldAlt,
  FaServer,
  FaNetworkWired,
  FaProjectDiagram,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { BsSun, BsMoon } from "react-icons/bs";

import APWebsite from "./img/ap website.png";
import APDashboard from "./img/AP Dashboard.jpeg";
import OnlineExam from "./img/onlineExam.png";
import MyPort from "./img/portfolio image.png";


import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

// ─── Flip Card Projects ───────────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    emoji: "🖥️",
    image: null,
    title: "MyDashboard",
    desc: "All-in-one productivity dashboard with 10+ built-in tools.",
    tag: "React.js",
    tagClass: "react",
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
    url: "https://quizmasterr-eta.vercel.app/",
    features: ["Real-time quiz engine", "Score & timer system", "Result analytics", "Responsive UI"],
  },
   {
    id: 5,
    image: MyPort,
    title: "My Portfolio",
    desc: "Personal portfolio showcasing skills, projects & experience.",
    tag: "React.js",
    tagClass: "react",
    url: "/",
    features: ["Dark / Light mode", "AOS animations", "Typing effect", "EmailJS contact"],
  },
 
];

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

  const technicalSkills = [
    { name: "HTML",          icon: <FaHtml5 />,       color: "#E34F26" },
    { name: "CSS",           icon: <FaCss3Alt />,      color: "#1572B6" },
    { name: "JavaScript",    icon: <FaJs />,           color: "#F7DF1E" },
    { name: "React.js",      icon: <FaReact />,        color: "#61DAFB" },
    { name: "Next.js",       icon: <SiNextdotjs />,    color: "#888888" },
    { name: "Tailwind CSS",  icon: <SiTailwindcss />,  color: "#06B6D4" },
    { name: "Cloud Computing",icon: <FaCloud />,       color: "#4285F4" },
  ];

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

        {/* ── HOME ── */}
        <section className="Home" id="Home">
          <div className="ProfileContainer" data-aos="fade-right">
            <div className="ProfileName1">Vikash Sharma</div>
            <div className="ProfileName2">
              I'm <span id="Typing" className="Typing" />
            </div>
            <p className="HeroTagline">
              Crafting bold, high-converting interfaces with delightful motion,
              clean code, and modern UX patterns.
            </p>
            <div className="HeroActions">
              <a className="PrimaryAction" href="#Contact">Let's Collaborate</a>
              <a className="SecondaryAction" href="#Project">View Projects</a>
            </div>
            <div className="ProfileIcon">
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
          <div className="ProfileImageContainer" data-aos="fade-left">
            <img className="Profile" src={ProfileImage} alt="Vikash Sharma" />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="About" id="About" data-aos="fade-up">
          <div className="AboutContainer-Box">
            <div className="Aboutbox1" data-aos="zoom-in">
              <img src={ProfilePic} alt="Vikash Sharma" />
            </div>
            <div className="Aboutbox2" data-aos="fade-left">
              <h1 className="AboutTitle">About Me</h1>
              <p className="AboutDetails">
                I'm a frontend web developer and graphic designer who blends
                code and creativity to build engaging, user-friendly websites. I
                use tools like React.js and Next.js to turn ideas into smooth,
                eye-catching digital experiences.
              </p>
              <button className="Resumebtn" onClick={handleDownload}>
                Resume <MdOutlineFileDownload className="downloadbtn" />
              </button>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="Skills" id="Skills" data-aos="fade-up">
          <h1 className="SkillsTitle" data-aos="fade-down">Technical Skills</h1>
          <div className="SkillsContainer">
            {technicalSkills.map((skill, i) => (
              <div
                className="SkillIconCard"
                data-aos="flip-up"
                data-aos-delay={i * 80}
                key={skill.name}
              >
                <div className="SkillIconWrapper" style={{ "--skill-color": skill.color }}>
                  {skill.icon}
                </div>
                <h3 className="SkillName">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="Experience" id="Experience" data-aos="fade-up">
          <h1 className="ExperienceTitle" data-aos="fade-down">Experience</h1>
          <div className="ExperienceContainer">
            <article className="ExperienceCard" data-aos="fade-up" data-aos-delay="100">
              <div className="experience-number">01</div>
              <h3 className="ExperienceRole">Digital Marketing</h3>
              <p className="ExperienceCompany">The Raptor Marketing</p>
              <p className="ExperienceDuration">Jan 2023 – June 2023</p>
            </article>
            <article className="ExperienceCard" data-aos="fade-up" data-aos-delay="200">
              <div className="experience-number">02</div>
              <h3 className="ExperienceRole">Web Developer</h3>
              <p className="ExperienceCompany">3Handshake Innovation Pvt. Ltd.</p>
              <p className="ExperienceDuration">Jan 2024 – Aug 2024</p>
            </article>
            <article className="ExperienceCard" data-aos="fade-up" data-aos-delay="300">
              <div className="experience-number">03</div>
              <h3 className="ExperienceRole">Web Developer</h3>
              <p className="ExperienceCompany">NullCyberX</p>
              <p className="ExperienceDuration">Jan 2025 – Aug 2025</p>
            </article>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="Education" id="Education" data-aos="fade-up">
          <h1 className="EducationTitle" data-aos="fade-down">Education</h1>
          <div className="EducationContainer">

            {/* MCA — NEW */}
            <div className="EducationCard" data-aos="fade-up" data-aos-delay="100">
              <span className="edu-badge pursuing">🎓 Currently Pursuing</span>
              <h2 className="Degree">Master of Computer Applications (MCA)</h2>
              <h3 className="University">Rajasthan Technical University, Kota</h3>
              <p className="Year">2025 – 2027</p>
              <h4 className="CourseworkTitle">Key Subjects</h4>
              <div className="CourseworkList">
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="100">
                  <div className="CourseIconBox"><FaReact className="CourseIcon" /></div>
                  <h4>Advanced Java</h4>
                  <p>Object-oriented programming, multithreading, collections framework and enterprise-level application development.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="150">
                  <div className="CourseIconBox"><FaServer className="CourseIcon" /></div>
                  <h4>DBMS &amp; SQL</h4>
                  <p>Relational database design, normalization, query optimization and transaction management.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="200">
                  <div className="CourseIconBox"><FaProjectDiagram className="CourseIcon" /></div>
                  <h4>Data Structures &amp; Algorithms</h4>
                  <p>Trees, graphs, sorting algorithms, dynamic programming and problem-solving techniques.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="250">
                  <div className="CourseIconBox"><FaNetworkWired className="CourseIcon" /></div>
                  <h4>Computer Networks</h4>
                  <p>OSI model, TCP/IP, routing protocols, network security and wireless communication.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="300">
                  <div className="CourseIconBox"><FaShieldAlt className="CourseIcon" /></div>
                  <h4>Information Security</h4>
                  <p>Cryptography, ethical hacking principles, threat analysis and secure system design.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="350">
                  <div className="CourseIconBox"><FaCloud className="CourseIcon" /></div>
                  <h4>Software Engineering</h4>
                  <p>SDLC models, Agile methodology, design patterns, testing and project management.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="400">
                  <div className="CourseIconBox"><FaPython className="CourseIcon" /></div>
                  <h4>Machine Learning</h4>
                  <p>Supervised/unsupervised learning, regression, classification and neural network fundamentals.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="450">
                  <div className="CourseIconBox"><FaCloud className="CourseIcon" /></div>
                  <h4>Cloud Computing</h4>
                  <p>Cloud architectures, AWS services, virtualization, containers and serverless deployment.</p>
                </div>
              </div>
            </div>

            {/* B.Voc */}
            <div className="EducationCard" data-aos="fade-up" data-aos-delay="200">
              <span className="edu-badge completed">✅ Completed</span>
              <h2 className="Degree">Bachelor of Vocational (B.Voc)</h2>
              <h3 className="University">Bhartiya Skill Development University, Jaipur</h3>
              <p className="Year">2022 – 2025</p>
              <h4 className="CourseworkTitle">Relevant Coursework</h4>
              <div className="CourseworkList">
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="100">
                  <div className="CourseIconBox"><FaCloud className="CourseIcon" /></div>
                  <h4>Cloud Computing</h4>
                  <p>Cloud infrastructure, virtualization, and deployment models using AWS and Azure.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="200">
                  <div className="CourseIconBox"><FaShieldAlt className="CourseIcon" /></div>
                  <h4>Cyber Security</h4>
                  <p>Network security, firewalls, threat analysis, and ethical hacking practices.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="300">
                  <div className="CourseIconBox"><FaServer className="CourseIcon" /></div>
                  <h4>Windows Server Administration</h4>
                  <p>Active Directory, user permissions, and network roles configuration.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="400">
                  <div className="CourseIconBox"><FaNetworkWired className="CourseIcon" /></div>
                  <h4>Computer Networking</h4>
                  <p>OSI model, IP addressing, routing, switching, and basic troubleshooting.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="500">
                  <div className="CourseIconBox"><FaProjectDiagram className="CourseIcon" /></div>
                  <h4>Network Designing</h4>
                  <p>Scalable and secure network infrastructure design using simulation tools.</p>
                </div>
                <div className="CourseCard" data-aos="fade-up" data-aos-delay="600">
                  <div className="CourseIconBox"><FaPython className="CourseIcon" /></div>
                  <h4>Python Programming</h4>
                  <p>Functions, data structures, and automation scripts with Python.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="Project" id="Project" data-aos="fade-up">
          <h1 className="ProjectTitle" data-aos="fade-down">Projects</h1>
          <p className="project-subtitle" data-aos="fade-up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg>
            Click any card to reveal features &amp; links
          </p>
          <div className="projects-flip-grid" data-aos="fade-up" data-aos-delay="100">
            {projectsData.map((project) => (
              <FlipCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="contact-section" id="Contact" data-aos="fade-up">
          <div className="contact-container">
            <h2 className="contact-title">Contact</h2>
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
                    <p>developer.vikash.msg@gmail.com</p>
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
