import React from "react";
import "./Timeline.css";

/**
 * Vertical timeline with a single continuous line running through every
 * entry (left-aligned, LinkedIn-style) — used for both Experience and
 * Education so the two sections share one visual language.
 *
 * items: [{
 *   title, subtitle, meta, badge?, description?
 * }]
 */
function Timeline({ items }) {
  return (
    <div className="timeline">
      <span className="timeline-line" aria-hidden="true" />
      {items.map((item, i) => (
        <div
          className="timeline-item"
          key={`${item.title}-${i}`}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >
          <span className="timeline-dot" aria-hidden="true" />
          <div className="timeline-content">
            {item.badge && (
              <span className={`timeline-badge ${item.badgeClass || ""}`}>
                {item.badge}
              </span>
            )}
            <h3 className="timeline-title">{item.title}</h3>
            {item.subtitle && (
              <p className="timeline-subtitle">{item.subtitle}</p>
            )}
            {item.meta && <p className="timeline-meta">{item.meta}</p>}
            {item.description && (
              <p className="timeline-desc">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
