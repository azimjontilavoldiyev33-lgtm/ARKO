import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PortalHero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Harflar 1 dan 30 gacha kengayadi
  const scale = useTransform(scrollYProgress, [0, 1], [1, 30]);

  // Rasm scroll 50-80% orasida paydo bo'ladi
  const imageOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.5, 1], [1.2, 1]);

  return (
    <div ref={containerRef} className="h-[700vh] md:h-[620vh] sm:h-[520vh] bg-[#050505] relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* HARFLAR PORTALI — responsive o'lchamlar */}
        <motion.div style={{ scale }} className="z-20 pointer-events-none">
          <h1
            className="
              text-[#D4AF37] font-light italic
              tracking-[8px] sm:tracking-[12px] md:tracking-[14px] lg:tracking-[20px]
              text-[clamp(3rem,18vw,140px)] sm:text-[clamp(4rem,16vw,180px)] md:text-[clamp(5rem,14vw,220px)] lg:text-[clamp(5.5rem,12vw,250px)]
              max-w-[90vw] text-center
            "
          >
            ARKO
          </h1>
        </motion.div>

        {/* ICHIDAN CHIQADIGAN MEBEL RASMI */}
        <motion.div
          style={{ opacity: imageOpacity, scale: imageScale }}
          className="absolute inset-0 z-10"
        >
          <img
            src="/ofisnoy-stol.jpg"
            className="w-full h-full object-cover object-center"
            alt="Arko Interior"
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </motion.div>

      </div>
    </div>
  );
};

// ✅ TO'G'RI: komponentni chaqirmay eksport qilamiz
export default PortalHero;