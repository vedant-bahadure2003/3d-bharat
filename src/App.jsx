import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Create from "./components/Create";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Create />
        <Enquiry />
      </main>
      <Footer />
    </div>
  );
}

export default App;
