import React from "react";
import "./TechMarquee.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaFigma,
  FaNodeJs,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb } from "react-icons/si";

const TECH_ITEMS = [
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "React", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Firebase", icon: <SiFirebase /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Git", icon: <FaGitAlt /> },
  { name: "Figma", icon: <FaFigma /> },
];

/**
 * Infinite horizontal marquee of the tools/stack Vikash works with.
 * The list is duplicated once so the CSS translateX(-50%) loop is seamless.
 * Pauses on hover/focus for accessibility & readability.
 */
function TechMarquee() {
  const loopItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="tech-marquee" role="marquee" aria-label="Live tech stack">
      <div className="tech-marquee-fade tech-marquee-fade-left" />
      <div className="tech-marquee-fade tech-marquee-fade-right" />
      <div className="tech-marquee-track">
        {loopItems.map((tech, i) => (
          <div className="tech-marquee-item" key={`${tech.name}-${i}`}>
            <span className="tech-marquee-icon">{tech.icon}</span>
            <span className="tech-marquee-label">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;
