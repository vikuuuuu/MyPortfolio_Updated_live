import React from "react";
import { FaCertificate } from "react-icons/fa";
import "./Certifications.css";

/**
 * Card grid for certifications / achievements.
 * `url` is optional per-entry — the "Verify" button only renders when a
 * real live URL is provided, so entries without one just show as a plain
 * card with no dead/fake link.
 *
 * EDIT ME: swap in your real certificates — this is placeholder content.
 */
const certificationsData = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2024",
    description: "Flexbox, CSS Grid, and mobile-first responsive layout techniques.",
    url: "https://www.freecodecamp.org/",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2024",
    description: "ES6+, functional programming concepts, and core data structures.",
    url: "https://www.freecodecamp.org/",
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "Coursework — B.Voc, BSDU Jaipur",
    date: "2023",
    description: "Cloud infrastructure, virtualization, and deployment models across AWS and Azure.",
    // No `url` on purpose — renders without a Verify button.
  },
];

function CertificationCard({ cert }) {
  return (
    <div className="cert-card" data-aos="fade-up">
      <div className="cert-icon"><FaCertificate /></div>
      <div className="cert-body">
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
        <p className="cert-date">{cert.date}</p>
        {cert.description && <p className="cert-desc">{cert.description}</p>}
      </div>
      {/* Conditional: only render the Verify button when a live URL exists */}
      {cert.url && (
        <a
          href={cert.url}
          target="_blank"
          rel="noreferrer"
          className="cert-verify-btn"
        >
          Verify Link ↗
        </a>
      )}
    </div>
  );
}

function Certifications() {
  return (
    <div className="certifications-grid">
      {certificationsData.map((cert, i) => (
        <CertificationCard cert={cert} key={`${cert.title}-${i}`} />
      ))}
    </div>
  );
}

export default Certifications;
