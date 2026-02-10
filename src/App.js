import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Component/Menu";
import Home from "./Component/Home";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <div className="AppContent">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
