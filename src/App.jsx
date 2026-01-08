import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import About from "./components/About";
import Features from "./components/Features";
import Create from "./components/Create";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-stone-100 dark:bg-black text-gray-800 dark:text-white transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Challenges />
          <Features />
          <Create />
          <Enquiry />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
