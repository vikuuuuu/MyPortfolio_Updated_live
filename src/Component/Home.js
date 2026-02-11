import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import ProfileImage from "./img/image vector.png";
import ProfilePic from "./img/image1.jpeg";
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
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import APWebsite from "./img/ap website.png";
import APDashboard from "./img/AP Dashboard.jpeg";
import OnlineExam from "./img/onlineExam.png";
import MyPort from "./img/portfolio image.png";
import Calculator from "./img/Calculator image.png";

import AOS from "aos";
import "aos/dist/aos.css";

import emailjs from "@emailjs/browser";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false, dots: true },
      },
      {
        breakpoint: 860,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  return (
    <div className="carousel-container" data-aos="fade-down">
      <Slider {...settings}>
        <div className="project-slide">
          <img src={OnlineExam} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">Online Exam Dashboard</h1>
          <p className="visit-website">
            Visit :- <a href="https://quizmasterr-eta.vercel.app/">Quiz Master</a>
          </p>
          <p className="project-details">
            Real-time online exam dashboard with smooth UX and responsive flows.
          </p>
        </div>

        <div className="project-slide">
          <img src={APWebsite} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">ApnaBackup Website</h1>
          <p className="visit-website">
            Visit :- <a href="https://apnabackup.com">ApnaBackup Website</a>
          </p>
          <p className="project-details">
            Business website for backup and recovery services with product-first communication.
          </p>
        </div>

        <div className="project-slide">
          <img src={APDashboard} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">ApnaBackup Dashboard</h1>
          <p className="visit-website">Visit :- Not Available</p>
          <p className="project-details">
            Secure and scalable admin/dashboard workflows for backup operations.
          </p>
        </div>

        <div className="project-slide">
          <img src={MyPort} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">My Portfolio</h1>
          <p className="visit-website">Visit :- <a href="/">Personal Portfolio</a></p>
          <p className="project-details">
            Personal portfolio crafted to showcase projects, skills and hands-on experience.
          </p>
        </div>

        <div className="project-slide">
          <img src={Calculator} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">Calculator Project</h1>
          <p className="visit-website">
            Visit :- <a href="https://calculator-vikuu.vercel.app/">Calculator Project</a>
          </p>
          <p className="project-details">
            Calculator and age-calculator project using HTML, CSS and JavaScript logic.
          </p>
        </div>
      </Slider>
    </div>
  );
};

function Home() {
  const typingTimeoutRef = useRef(null);
  const erasingTimeoutRef = useRef(null);
  const currentTextIndexRef = useRef(0);
  const currentCharIndexRef = useRef(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    const textElement = document.getElementById("Typing");
    if (!textElement) return undefined;

    const texts = ["Front-end Developer 💻", "Graphic Designer 🎨"];
    const typingSpeed = 100;
    const delayBetweenTexts = 1000;

    function type() {
      const currentTextIndex = currentTextIndexRef.current;
      const currentCharIndex = currentCharIndexRef.current;

      if (currentCharIndex < texts[currentTextIndex].length) {
        textElement.textContent += texts[currentTextIndex].charAt(currentCharIndex);
        currentCharIndexRef.current += 1;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        erasingTimeoutRef.current = setTimeout(erase, delayBetweenTexts);
      }
    }

    function erase() {
      const currentTextIndex = currentTextIndexRef.current;
      const currentCharIndex = currentCharIndexRef.current;

      if (currentCharIndex > 0) {
        textElement.textContent = texts[currentTextIndex].substring(0, currentCharIndex - 1);
        currentCharIndexRef.current -= 1;
        erasingTimeoutRef.current = setTimeout(erase, typingSpeed);
      } else {
        currentTextIndexRef.current = (currentTextIndex + 1) % texts.length;
        currentCharIndexRef.current = 0;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      }
    }

    type();

    return () => {
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(erasingTimeoutRef.current);
    };
  }, []);

  const handleDownload = () => {
    const fileUrl = "/Vikash Sharma Resume II.pdf";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Vikash Sharma Resume II.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_xhb4lql",
        "template_tt7dd2k",
        {
          from_name: formData.name,
          from_email: formData.email,
          from_subject: formData.subject,
          message: formData.message,
        },
        "_ejeQU96yZXmYtUdm"
      );

      await emailjs.send(
        "service_xhb4lql",
        "template_thvj6b4",
        {
          to_email: formData.email,
          to_name: formData.name,
          to_subject: formData.subject,
          original_message: formData.message,
        },
        "_ejeQU96yZXmYtUdm"
      );

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main">
      <section className="Home" id="Home">
        <img src={ProfileImage} alt="Background profile" className="Profile" />
        <div className="ProfileContainer">
          <div className="ProfileName1">Vikash Sharma</div>
          <div className="ProfileName2">
            I&apos;m <span id="Typing" className="Typing"></span>
          </div>
          <p className="HeroTagline">
            Crafting bold, high-converting interfaces with delightful motion, clean code, and modern UX patterns.
          </p>
          <div className="HeroActions">
            <a className="PrimaryAction" href="#Contact">Let&apos;s Collaborate</a>
            <a className="SecondaryAction" href="#Project">View Projects</a>
          </div>
          <div className="ProfileIcon">
            <a href="https://www.linkedin.com/in/vikash-sharma-48b27a263/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} className="twitter" />
            </a>
            <a href="https://github.com/vikuuuuu" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faGithub} className="twitter" />
            </a>
            <a href="https://x.com/vikashsrma" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faXTwitter} className="twitter" />
            </a>
            <a href="https://wa.me/919571404881?text=Hello%2C%20Vikash%20Sharma" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} className="twitter" />
            </a>
            <a href="https://aratt.ai/user/@vikusrma" target="_blank" rel="noreferrer">
              <img className="socialIconImage" src="https://img.icons8.com/color/48/arattai.png" alt="arattai" />
            </a>
          </div>
        </div>
      </section>

      <section className="About" id="About" data-aos="fade-up">
        <h1 className="AboutTitle">About</h1>
        <div className="AboutContainer">
          <div className="AboutContainer-Box">
            <div className="Aboutbox1">
              <img src={ProfilePic} alt="Vikash Sharma" />
            </div>
            <div className="Aboutbox2">
              <p className="AboutDetails">
                Front-end developer focused on responsive UI, accessible UX and production-ready React implementations.
              </p>
              <button className="Resumebtn" onClick={handleDownload} type="button">
                Download Resume <MdOutlineFileDownload className="downloadbtn" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="Experience" id="Experience" data-aos="fade-up">
        <h1 className="ExperienceTitle">Experience</h1>
        <div className="ExperienceContainer">
          <p className="ExperienceRole">React Front-end Developer</p>
          <p className="ExperienceCompany">ApnaBackup</p>
          <p className="ExperienceDuration">2024 - Present</p>
        </div>
      </section>

      <section className="Education" id="Education" data-aos="fade-up">
        <h1 className="EducationTitle">Education</h1>
        <div className="EducationContainer">
          <div className="EducationCard">
            <h3 className="Degree">B.Tech, Computer Science</h3>
            <p className="University">Rajasthan Technical University</p>
            <p className="Year">2021 - 2025</p>
            <h4 className="CourseworkTitle">Coursework</h4>
            <div className="CourseworkList">
              <div className="CourseCard"><FaCloud className="CourseIcon" /><h4>Cloud</h4><p>Deployment and cloud fundamentals.</p></div>
              <div className="CourseCard"><FaShieldAlt className="CourseIcon" /><h4>Security</h4><p>Application and data security basics.</p></div>
              <div className="CourseCard"><FaServer className="CourseIcon" /><h4>Backend</h4><p>Service and API design concepts.</p></div>
              <div className="CourseCard"><FaNetworkWired className="CourseIcon" /><h4>Networking</h4><p>Computer network and protocols.</p></div>
              <div className="CourseCard"><FaProjectDiagram className="CourseIcon" /><h4>System Design</h4><p>Scalable system architecture practices.</p></div>
              <div className="CourseCard"><FaPython className="CourseIcon" /><h4>Python</h4><p>Programming and problem solving.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="Skills" id="Skills" data-aos="fade-up">
        <h1 className="SkillsTitle">Skills</h1>
        <div className="SkillsContainer">
          {[
            ["HTML / CSS", 90],
            ["JavaScript", 85],
            ["React", 88],
            ["UI/UX", 80],
          ].map(([label, value]) => (
            <div className="SkillItem" key={label}>
              <div className="SkillLabel"><span>{label}</span><span>{value}%</span></div>
              <div className="SkillBar"><div className="SkillProgress" style={{ width: `${value}%` }}></div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="Project" id="Project" data-aos="fade-up">
        <h1 className="ProjectTitle">Projects</h1>
        <Carousel />
      </section>

      <section className="contact-section" id="Contact" data-aos="fade-up">
        <div className="contact-container">
          <h2 className="contact-title">Contact</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-block">
                <div className="icon-circle"><FaMapMarkerAlt /></div>
                <div><h4>Location</h4><p>Jaipur, Rajasthan, India</p></div>
              </div>
              <div className="info-block">
                <div className="icon-circle"><FaPhoneAlt /></div>
                <div><h4>Phone</h4><p>+91 9571404881</p></div>
              </div>
              <div className="info-block">
                <div className="icon-circle"><CiMail /></div>
                <div><h4>Email</h4><p>vikashsharma.dev@gmail.com</p></div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              </div>
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
              <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Vikash Sharma. All rights reserved.</footer>
    </main>
  );
}

export default Home;
