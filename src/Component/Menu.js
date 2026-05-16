import React, { useState, useEffect } from "react";
import "./Menu.css";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const menuItems = [
  { id: "Home", icon: <IoHomeOutline />, label: "Home" },
  { id: "About", icon: <CiUser />, label: "About" },
  { id: "Skills", icon: <IoDocumentTextOutline />, label: "Skills" },
  { id: "Project", icon: <AiOutlineFundProjectionScreen />, label: "Projects" },
  { id: "Contact", icon: <CiMail />, label: "Contact" },
];

function Menu() {
  const [active, setActive] = useState("Home");

  const handleClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, observerOptions);

    menuItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="MenuSidebar">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`menuItem ${active === item.id ? "active" : ""}`}
          onClick={() => handleClick(item.id)}
          title={item.label}
        >
          <div className="menuIcon">{item.icon}</div>
          <span className="menuLabel">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Menu;
