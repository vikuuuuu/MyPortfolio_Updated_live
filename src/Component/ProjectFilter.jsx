import React from "react";
import "./ProjectFilter.css";

/**
 * Pill-style filter bar for the Projects grid.
 * `categories` = array of unique category strings (plus "All" is added automatically).
 * `active` = currently selected category.
 * `onChange` = callback(category) fired when user picks a pill.
 */
function ProjectFilter({ categories, active, onChange }) {
  const allCategories = ["All", ...categories];

  return (
    <div className="project-filter-bar" role="tablist" aria-label="Filter projects by category">
      {allCategories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`project-filter-pill${active === cat ? " active" : ""}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default ProjectFilter;
