import React, { useEffect, useState, useRef } from "react";
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
} from "react-icons/fa";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
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
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
  AOS.init({
    duration: 2000, // animation duration in ms
    once: true,     // whether animation should happen only once - while scrolling down
  });
}, []);


  return (
    <div className="carousel-container" data-aos="fade-down">
      <Slider {...settings}>
        <div className="project-slide">
          <img src={OnlineExam} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">Online Exam Dashboard</h1>
          <p className="visit-website">
            Visit :-{" "}
            <a href="https://quizmasterr-eta.vercel.app/">Quiz Master</a>
          </p>
          <p className="project-details">
            I am Developing an online Examination Dashboard using React js,
            aiming for an intuitive user experience and real-time updates. The
            Project is still in progress and not yet completed.
          </p>
        </div>
        <div className="project-slide">
          <img src={APWebsite} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">ApnaBackup Website</h1>
          <p className="visit-website">
            Visit :- <a href="https://apnabackup.com">ApnaBackup Website</a>
          </p>
          <p className="project-details">
            I am Creating a project in React JS for a Software Website named
            ApnaBackup. This Project aims to provide a comprehensive solution
            for data backup and recovery.
          </p>
        </div>
        <div className="project-slide">
          <img src={APDashboard} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">ApnaBackup Dashboard</h1>
          <p className="visit-website">Visit :- Not Available</p>
          <p className="project-details">
            ApnaBackup Website is a business-oriented backup Software that
            offers real-time data protection and secure cloud storage. The
            Project is still in progress and not yet completed.
          </p>
        </div>

        <div className="project-slide">
          <img src={MyPort} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">My Portfolio</h1>
          <p className="visit-website">
            Visit :- <a href="/">Personal Portfolio</a>
          </p>
          <p className="project-details">
            I Create a project in React Js for my Personal Portfolio. This
            project will showcase my skills, project and experience in front-end
            Development.
          </p>
        </div>
        <div className="project-slide">
          <img src={Calculator} alt="ProjectImage" className="project-image" />
          <h1 className="project-heading-name">Calculator Project</h1>
          <p className="visit-website">
            Visit :-{" "}
            <a href="https://calculator-vikuu.vercel.app/">
              Calculator Project
            </a>
          </p>
          <p className="project-details">
            I built a project with a calculator and age calculator using HTML,
            CSS, and JavaScript, where JavaScript functions manage button
            interactions, calculations, and result displays.
          </p>
        </div>
      </Slider>
    </div>
  );
};

function Home() {
  // Start the typing Codee
  const typingTimeoutRef = useRef(null);
  const erasingTimeoutRef = useRef(null);
  const currentTextIndexRef = useRef(0);
  const currentCharIndexRef = useRef(0);

  useEffect(() => {
    const textElement = document.getElementById("Typing");
    const texts = ["Front-end Developer 💻", "Graphic Designer 🎨"];
    const typingSpeed = 100;
    const delayBetweenTexts = 1000;

    function type() {
      const currentTextIndex = currentTextIndexRef.current;
      const currentCharIndex = currentCharIndexRef.current;

      if (currentCharIndex < texts[currentTextIndex].length) {
        textElement.textContent +=
          texts[currentTextIndex].charAt(currentCharIndex);
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
        textElement.textContent = texts[currentTextIndex].substring(
          0,
          currentCharIndex - 1
        );
        currentCharIndexRef.current -= 1;
        erasingTimeoutRef.current = setTimeout(erase, typingSpeed);
      } else {
        currentTextIndexRef.current = (currentTextIndex + 1) % texts.length;
        currentCharIndexRef.current = 0;
        typingTimeoutRef.current = setTimeout(type, typingSpeed);
      }
    }

    type();

    // Cleanup function to clear timeouts if the component unmounts
    return () => {
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(erasingTimeoutRef.current);
    };
  }, []);

  const handleDownload = () => {
    // Replace this with the actual file URL or path
    const fileUrl = "/Vikash Sharma Resume II.pdf";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Vikash Sharma Resume II.pdf"; // Name the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Send email to website owner
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

    // Send thank you email to sender
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


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <main className="main">
        <section className="Home" id="Home">
          <div className="ProfileContainer">
            <div className="ProfileName1">Vikash Sharma</div>
            <div className="ProfileName2">
              I'm <span id="Typing" className="Typing"></span>
            </div>
            <p className="HeroTagline">
              Crafting bold, high-converting interfaces with delightful motion,
              clean code, and modern UX patterns.
            </p>
            <div className="HeroActions">
              <a className="PrimaryAction" href="#Contact">
                Let&apos;s Collaborate
              </a>
              <a className="SecondaryAction" href="#Project">
                View Projects
              </a>
            </div>
            <div className="ProfileIcon">
              <a
                href="https://www.linkedin.com/in/vikash-sharma-48b27a263/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FontAwesomeIcon icon={faLinkedinIn} className="twitter" />{" "}
              </a>{" "}
              <a
                href="https://github.com/vikuuuuu"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FontAwesomeIcon icon={faGithub} className="twitter" />
              </a>
              <a
                href="https://x.com/vikashsrma"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FontAwesomeIcon icon={faXTwitter} className="twitter" />{" "}
              </a>
              <a
                href="https://wa.me/919571404881?text=Hello%2C%20Vikash%20Sharma"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                <FontAwesomeIcon icon={faWhatsapp} className="twitter" />{" "}
              </a>
                  <a
                href="https://aratt.ai/user/@vikusrma"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                  <img
                    className="socialIconImage"
                    src="https://img.icons8.com/color/48/arattai.png"
                    alt="arattai"
                  />
                      </a>

          </div>
        </section>

        <section className="Experience" id="Experience" data-aos="fade-up">
          <h1 className="ExperienceTitle" data-aos="fade-down">
            Experience
          </h1>
          <div className="ExperienceContainer">
          </div>
        </section>

        <section className="Education" id="Education" data-aos="fade-up">

