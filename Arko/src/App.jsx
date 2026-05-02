
import { Routes, Route } from 'react-router-dom'  // ← qo'shildi
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import About from './pages/about/About'

import Contact from './pages/contact/Contact'
import Catalog from './pages/catalog/Catalog'

import Moodboard from './pages/3D-configurator/Moodboard';
import NotFound from './components/notfound/NotFound';

function App() {

   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayt to'liq yuklangach loadingni o'chiramiz
    window.onload = () => {
      setTimeout(() => setIsLoading(false), 500); // Biroz yumshoq o'tish uchun
    };

    // Agarda rasm yoki 3D model uzoq yuklansa, timeout qo'yamiz (3 sekund)
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
            <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
      animate={{ 
        scale: isLoading ? 1.1 : 1, 
        opacity: isLoading ? 0 : 1 
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      >
      <Navbar />

      <Routes>
        <Route path="/"            element={<Home />}         />
        <Route path="/about"       element={<About />}        />
        <Route path="/catalog"     element={<Catalog/>}      />
        <Route path="/moodboard" element={<Moodboard />} />
        <Route path="/contact"     element={<Contact />}      />
        <Route path="*"     element={<NotFound />}      />
      </Routes>

      <Footer />

      </motion.div>
    </div>    
  )
}

export default App