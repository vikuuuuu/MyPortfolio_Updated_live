import React from "react";
import "./SectionHeader.css";

/**
 * Numbered section header used across About / Skills / Experience /
 * Education / Certifications / Projects / Contact so every section reads
 * as part of the same numbered sequence the Hero starts ("01 —").
 *
 * `index`   e.g. "02"
 * `tag`     small label shown next to the index (e.g. "About Me")
 * `title`   the big heading text
 * `subtitle` optional supporting line under the title
 * `align`   "center" (default) | "left"
 */
function SectionHeader({ index, tag, title, subtitle, align = "center" }) {
  return (
    <div className={`section-header section-header-${align}`}>
      <div className="section-header-eyebrow">
        <span className="section-header-index">{index}</span>
        <span className="section-header-line" />
        <span className="section-header-tag">{tag}</span>
      </div>
      <h2 className="section-header-title">{title}</h2>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
