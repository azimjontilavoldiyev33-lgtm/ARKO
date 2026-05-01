import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PortalHero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 30]);
  const imageOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.5, 1], [1.2, 1]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505]"
      style={{ height: "clamp(520vh, 700vh, 700vh)" }}
      // ↑ CSS clamp o'rniga Tailwind breakpoint ishlatamiz:
    >
    {/* Yoki shunchaki: */}
    {/*  className="h-[520vh] sm:h-[620vh] md:h-[700vh] bg-[#050505] relative" */}
      <div className="sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden">

        <motion.div style={{ scale }} className="z-20 pointer-events-none">
          <h1
            className="
              text-[#D4AF37] font-light italic text-center whitespace-nowrap
              tracking-[6px] sm:tracking-[10px] md:tracking-[14px] lg:tracking-[20px]
              text-[clamp(2.5rem,12vw,180px)]
            "
          >
            ARKO
          </h1>
        </motion.div>

        <motion.div
          style={{ opacity: imageOpacity, scale: imageScale }}
          className="absolute inset-0 z-10"
        >
          <img
            src="/ofisnoy-stol.jpg"
            className="w-full h-full object-cover object-center"
            alt="Arko Interior"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        </motion.div>

      </div>
    </div>
  );
};

export default PortalHero;