import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Menu from "./Component/Menu";
import Home from "./Component/Home";

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {isHomePage ? <Menu /> : null}
      <div className={`AppContent ${isHomePage ? "homeLayout" : "fullLayout"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
    
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
