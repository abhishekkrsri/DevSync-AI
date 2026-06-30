import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Dashboard from "../components/Dashboard";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Dashboard />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;