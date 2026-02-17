import React, { useEffect, useMemo, useState } from "react";
import "./ViewCounter.css";

const LOCAL_STORAGE_KEY = "portfolio_viewcounter_fallback";
const FIREBASE_DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;
const FIREBASE_DB_TOKEN = process.env.REACT_APP_FIREBASE_DB_TOKEN;
const FIREBASE_PATH = "analytics/viewcounter";

const emptyMetrics = {
  visitors: 0,
  pageViews: 0,
  bounceRate: 0,
};

const defaultTable = [
  { label: "Pages", value: "No data found for selected period." },
  { label: "Routes", value: "No data found for selected period." },
  { label: "Hostnames", value: "No data found for selected period." },
  { label: "Referrers", value: "No data found for selected period." },
  { label: "UTM Parameters", value: "No data found for selected period." },
  { label: "Countries", value: "No data found for selected period." },
  { label: "Devices", value: "No data found for selected period." },
  { label: "Browsers", value: "No data found for selected period." },
  { label: "Operating Systems", value: "No data found for selected period." },
];

function getFirebaseUrl() {
  if (!FIREBASE_DB_URL) return null;
  const cleanedBase = FIREBASE_DB_URL.replace(/\/$/, "");
  const tokenQuery = FIREBASE_DB_TOKEN
    ? `?auth=${encodeURIComponent(FIREBASE_DB_TOKEN)}`
    : "";
  return `${cleanedBase}/${FIREBASE_PATH}.json${tokenQuery}`;
}

async function loadFromFirebase(firebaseUrl) {
  const response = await fetch(firebaseUrl);
  if (!response.ok) throw new Error("Unable to load Firebase data");
  return response.json();
}

async function saveToFirebase(firebaseUrl, payload) {
  const response = await fetch(firebaseUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Unable to save Firebase data");
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return { ...emptyMetrics, updatedAt: null, store: "local" };

  try {
    return { ...emptyMetrics, ...JSON.parse(raw), store: "local" };
  } catch {
    return { ...emptyMetrics, updatedAt: null, store: "local" };
  }
}

function saveToLocalStorage(payload) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
}

function ViewCounter() {
  const [metrics, setMetrics] = useState({ ...emptyMetrics, updatedAt: null });
  const [loading, setLoading] = useState(true);
  const [storeMode, setStoreMode] = useState("firebase");

  useEffect(() => {
    const updateMetrics = async () => {
      setLoading(true);
      const now = new Date().toISOString();
      const firebaseUrl = getFirebaseUrl();

      if (firebaseUrl) {
        try {
          const current = (await loadFromFirebase(firebaseUrl)) || {};
          const next = {
            visitors: Number(current.visitors || 0) + 1,
            pageViews: Number(current.pageViews || 0) + 1,
            bounceRate: Number(current.bounceRate || 0),
            updatedAt: now,
          };
          await saveToFirebase(firebaseUrl, next);
          setMetrics(next);
          setStoreMode("firebase");
          setLoading(false);
          return;
        } catch {
          // fallback to local storage
        }
      }

      const localCurrent = loadFromLocalStorage();
      const localNext = {
        visitors: Number(localCurrent.visitors || 0) + 1,
        pageViews: Number(localCurrent.pageViews || 0) + 1,
        bounceRate: Number(localCurrent.bounceRate || 0),
        updatedAt: now,
      };
      saveToLocalStorage(localNext);
      setMetrics(localNext);
      setStoreMode("local");
      setLoading(false);
    };

    updateMetrics();
  }, []);

  const lastUpdated = useMemo(() => {
    if (!metrics.updatedAt) return "-";
    return new Date(metrics.updatedAt).toLocaleString();
  }, [metrics.updatedAt]);

  return (
    <main className="viewCounterPage">
      <section className="analyticsInstallCard">
        <h1>Web Analytics Dashboard (/viewcounter)</h1>
        <p>Generating</p>
        <p>running: npm install @vercel/analytics...</p>
        <p>~5 min</p>
        <pre>
          <code>npm i @vercel/analytics</code>
        </pre>
        <p>
          import <code>{"{ Analytics }"}</code> from
          <code> @vercel/analytics/react</code>
        </p>
        <p className="dataSource">
          Data source: <strong>{storeMode === "firebase" ? "Firebase" : "Local fallback"}</strong>
        </p>
      </section>

      <section className="statsGrid" aria-label="Top metrics">
        <article className="statCard">
          <p>Visitors</p>
          <h2>{loading ? "..." : metrics.visitors}</h2>
        </article>
        <article className="statCard">
          <p>Page Views</p>
          <h2>{loading ? "..." : metrics.pageViews}</h2>
        </article>
        <article className="statCard">
          <p>Bounce Rate</p>
          <h2>{loading ? "..." : metrics.bounceRate}%</h2>
        </article>
      </section>

      <section className="analyticsTableCard">
        <h3>Pages</h3>
        <h3>Routes</h3>
        <h3>Hostnames</h3>
        <h3>Visitors</h3>
        <p className="noData">No data found for selected period.</p>
      </section>

      <section className="analyticsTableCard">
        <h3>Referrers</h3>
        <h3>UTM Parameters</h3>
        <h3>Visitors</h3>
        <p className="noData">No data found for selected period.</p>
      </section>

      <section className="analyticsListCard">
        {defaultTable.slice(5).map((item) => (
          <div key={item.label} className="listRow">
            <span>{item.label}</span>
            <span>Visitors</span>
          </div>
        ))}
      </section>

      <section className="footerMeta">
        <p>Last Updated: {lastUpdated}</p>
      </section>
    </main>
  );
}

export default ViewCounter;
