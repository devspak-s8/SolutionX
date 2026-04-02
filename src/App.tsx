/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Services from "./components/Services";
import Process from "./components/Process";
import ArchitecturalLayers from "./components/ArchitecturalLayers";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackgroundEffect from "./components/BackgroundEffect";
import AIChat from "./components/AIChat";
import ServiceDetail from "./components/ServiceDetail";
import ScriptMarketplace from "./components/ScriptMarketplace";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [subRoute, setSubRoute] = useState<string | null>(null);

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const [main, sub] = hash.split("/");
      
      if (main) setCurrentPage(main);
      else setCurrentPage("home");

      if (sub) setSubRoute(sub);
      else setSubRoute(null);

      // Scroll to top on route change
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderContent = () => {
    if (currentPage === "scripts") {
      return (
        <ScriptMarketplace 
          onBack={() => window.location.hash = "#projects"} 
        />
      );
    }

    if (currentPage === "services" && subRoute) {
      return (
        <ServiceDetail 
          slug={subRoute} 
          onBack={() => window.location.hash = "#services"} 
        />
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <TechStack />
            <Services />
            <Process />
            <ArchitecturalLayers />
            <Projects />
            <Testimonials />
            <About />
            <Pricing />
            <Contact />
          </motion.div>
        );
      case "services":
        return (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Hero />
            <TechStack />
            <Services />
            <Process />
            <ArchitecturalLayers />
            <Contact />
          </motion.div>
        );
      case "pricing":
        return (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Pricing />
            <Contact />
          </motion.div>
        );
      case "projects":
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Projects />
            <Contact />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Services />
            <Projects />
            <Testimonials />
            <About />
            <Contact />
          </motion.div>
        );
    }
  };

  const isScriptMarketplace = currentPage === "scripts";

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <BackgroundEffect />
      {!isScriptMarketplace && <Navbar currentPage={currentPage} />}
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {!isScriptMarketplace && <Footer />}
      <AIChat />
    </div>
  );
}
