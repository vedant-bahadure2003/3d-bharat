import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import About from "./components/About";
import Features from "./components/Features";
import Measurement from "./components/measurenment/Measurement";
import Videos from "./components/videos/Videos";
import Create from "./components/Create";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

// Component to handle scrolling to hash sections
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return null;
};

// Home page content (without Navbar/Footer)
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Challenges />
      <Features />
      <Create />
      <Enquiry />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToHash />
        <div className="min-h-screen bg-stone-100 dark:bg-black text-gray-800 dark:text-white transition-colors duration-300">
          {/* Shared Navbar */}
          <Navbar />
          
          {/* Page Content */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/measurement" element={<Measurement />} />
              <Route path="/videos" element={<Videos />} />
            </Routes>
          </main>
          
          {/* Shared Footer */}
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
