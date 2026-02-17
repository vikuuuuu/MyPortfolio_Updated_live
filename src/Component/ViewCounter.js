import React, { useEffect, useMemo, useState } from "react";
import "./ViewCounter.css";

const STORAGE_KEY = "portfolio_total_visits";

function ViewCounter() {
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const storedVisits = Number(localStorage.getItem(STORAGE_KEY) || 0);
    const nextVisits = storedVisits + 1;
    localStorage.setItem(STORAGE_KEY, String(nextVisits));
    setTotalVisits(nextVisits);
  }, []);

  const lastUpdated = useMemo(() => new Date().toLocaleString(), []);

  return (
    <main className="viewCounterPage">
      <section className="viewCounterCard">
        <p className="viewCounterLabel">Total Visits</p>
        <h1 className="viewCounterValue">{totalVisits.toLocaleString()}</h1>
        <p className="viewCounterHint">
          This counter tracks visits for this browser using local storage.
        </p>
      </section>

      <section className="viewCounterCard">
        <h2>Vercel Web Analytics Setup</h2>
        <p>
          Install <code>@vercel/analytics</code> in your existing project:
        </p>
        <pre>
          <code>npm i @vercel/analytics</code>
        </pre>
        <p>
          Then import and use <code>{"<Analytics />"}</code> in your main app
          file.
        </p>
        <pre>
          <code>{'import { Analytics } from "@vercel/analytics/react"'}</code>
        </pre>
        <p className="viewCounterMeta">Last updated: {lastUpdated}</p>
      </section>
    </main>
  );
}

export default ViewCounter;
