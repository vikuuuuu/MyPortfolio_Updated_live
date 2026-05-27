import React, { useState, useEffect } from "react";
import "./Menu.css";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

const menuItems = [
  { id: "Home",       icon: <IoHomeOutline />,                   label: "Home"     },
  { id: "About",      icon: <CiUser />,                          label: "About"    },
  { id: "Skills",     icon: <IoDocumentTextOutline />,            label: "Skills"   },
  { id: "Project",    icon: <AiOutlineFundProjectionScreen />,    label: "Projects" },
  { id: "Contact",    icon: <CiMail />,                          label: "Contact"  },
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    menuItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      menuItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <nav className="MenuSidebar" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        {/* Brand */}
        <div className="nav-brand">Vikash.</div>

        {/* Links */}
        <div className="nav-links">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menuItem${active === item.id ? " active" : ""}`}
              onClick={() => handleClick(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleClick(item.id)}
              aria-label={item.label}
            >
              <span className="menuIcon">{item.icon}</span>
              <span className="menuLabel">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
