import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Placement bo'yicha tooltip pozitsiyasi
const tooltipStyle = {
  "top":       "bottom-8 left-1/2 -translate-x-1/2",
  "top-left":  "bottom-8 right-0",
  "top-right": "bottom-8 left-0",
};

const Masterpiece = () => { 
  const { t } = useTranslation();

  const hotspots = [
  {
    id: 1,
    top: "70%",
    left: "60%",
    title: t("hotspot_1_title"),
    desc: t("hotspot_1_desc"),
    // Tooltip yo'nalishi: qaysi tomonga ochiladi
    placement: "top",
  },
  {
    id: 2,
    top: "40%",
    left: "90%",
    title: t("hotspot_2_title"),
    desc: t("hotspot_2_desc"),
    placement: "top-left", // O'ng tomonda — chapga ochiladi
  },
  {
    id: 3,
    top: "56%",
    left: "45%",
    title: t("hotspot_3_title"),
    desc: t("hotspot_3_desc"),
    placement: "top-right", // Chap tomonda — o'ngga ochiladi
  },
];

  const [activeSpot, setActiveSpot] = useState(null);

  // Mobil uchun toggle, desktop uchun hover
  const handleClick = useCallback((id) => {
    setActiveSpot((prev) => (prev === id ? null : id));
  }, []);

  return (
    // 100dvh — mobil brauzerlarda address bar hisobga olinadi
    <section className="relative w-full h-[100dvh] bg-black overflow-hidden">

      {/* Fon rasmi */}
      <img
        src="./kuxnya.jpg"
        alt="Premium oshxona dizayni"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Qoʻyimcha gradient overlay — kontrast yaxshilash */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Sarlavha */}
      <div className="absolute top-[8%] left-[5%] z-10 max-w-[90%]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[#D4AF37] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          {t("masterpiece_title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white text-base md:text-xl mt-2"
        >
         {t("masterpiece_subtitle")}
        </motion.p>
      </div>

      {/* Hotspots */}
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute z-20"
          style={{ top: spot.top, left: spot.left }}
        >
          {/* Tap/click maydoni kattaroq — 44px minimum (a11y standart) */}
          <div
            className="relative flex items-center justify-center w-11 h-11 cursor-pointer -translate-x-1/2 -translate-y-1/2"
            onClick={() => handleClick(spot.id)}
            onMouseEnter={() => setActiveSpot(spot.id)}
            onMouseLeave={() => setActiveSpot(null)}
          >
            {/* Tashqi pulsing halqa */}
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute w-5 h-5 rounded-full bg-[#D4AF37]"
            />
            {/* Ichki nuqta */}
            <motion.div
              whileHover={{ scale: 1.3 }}
              className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#D4AF37] border-2 border-white shadow-lg shadow-[#D4AF37]/40 z-10"
            />

            {/* Tooltip */}
            <AnimatePresence>
              {activeSpot === spot.id && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    absolute z-30 w-44 md:w-52
                    bg-black/90 backdrop-blur-sm
                    border border-[#D4AF37]/70
                    rounded-xl px-4 py-3
                    text-white text-center
                    shadow-xl shadow-black/60
                    pointer-events-none
                    ${tooltipStyle[spot.placement]}
                  `}
                >
                  <h4 className="text-[#D4AF37] text-sm md:text-base font-semibold mb-1">
                    {spot.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-300 leading-snug">
                    {spot.desc}
                  </p>
                  {/* Kichik arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/90 border-r border-b border-[#D4AF37]/70 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}

      {/* Pastki tugma */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="absolute bottom-[8%] w-full flex justify-center px-4 z-10"
      >
        <motion.button
          whileHover={{ backgroundColor: "#D4AF37", color: "#000", scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="
            w-full max-w-xs sm:max-w-sm md:w-auto
            px-8 md:px-12 py-4
            border-2 border-[#D4AF37] text-[#D4AF37]
            bg-transparent font-bold
            text-xs md:text-sm
            tracking-[2px] md:tracking-[3px]
            rounded-sm cursor-pointer
            transition-colors duration-200
          "
        >
          <Link to="/Contact">{t("masterpiece_cta")}</Link>
        </motion.button>
      </motion.div>

      {/* Mobil uchun yopish eslatmasi */}
      <p className="absolute bottom-[3%] w-full text-center text-gray-500 text-xs md:hidden z-10">
        {t("masterpiece.mobile_hint")}
      </p>
    </section>
  );
};

export default Masterpiece;