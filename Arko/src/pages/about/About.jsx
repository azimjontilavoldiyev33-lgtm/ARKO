// About.jsx

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Leaf, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import videoBg from "../../assets/arko-ish-jarayoni.mp4";

// ── Icon mapping — t() siz, faqat ikonlar ──
const VALUE_ICONS = [Zap, ShieldCheck, CheckCircle2, Leaf];

// ── Animation variants ────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ══════════════════════════════════════════════════════
//  1. VIDEO SECTION
// ══════════════════════════════════════════════════════
const VideoSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full overflow-hidden bg-black">
      <video autoPlay muted loop playsInline aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-40">
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[#D4AF37] font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[4px] sm:tracking-[6px] uppercase"
        >
          {t("video_title")}
        </motion.h2>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 sm:mt-5 w-12 sm:w-16 h-px bg-[#D4AF37]/60 origin-center" />
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white/80 max-w-xs sm:max-w-md lg:max-w-xl mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed">
          {t("video_subtitle")}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.55 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          aria-label={t("video_play_aria")}
          className="mt-8 sm:mt-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/25 flex items-center justify-center cursor-pointer transition-colors duration-300 group"
        >
          <Play size={26} className="text-[#D4AF37] fill-[#D4AF37] translate-x-0.5 group-hover:scale-110 transition-transform duration-200" />
        </motion.button>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
//  2. HISTORY SECTION
// ══════════════════════════════════════════════════════
const HistorySection = () => {
  const { t } = useTranslation();

  // ✅ t() komponent ichida
  const historyEvents = [0, 1, 2, 3].map((i) => ({
    year:  t(`history_${i}_year`),
    title: t(`history_${i}_title`),
    desc:  t(`history_${i}_desc`),
  }));

  return (
    <section className="bg-[#050505] px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20">
          <h2 className="text-[#D4AF37] font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-widest uppercase">
            {t("history_title")}
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[#D4AF37]/40" />
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#1a1a1a]" />
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-0">
            {historyEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`relative flex w-full lg:py-6 ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}>
                  <div className={`relative w-full lg:w-[calc(50%-32px)] bg-[#0a0a0a] border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-300 rounded-2xl p-6 sm:p-7 pl-8 sm:pl-9 lg:pl-6 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
                    <div className={`hidden lg:block absolute top-8 ${isLeft ? "-right-[42px]" : "-left-[42px]"} w-5 h-5 rounded-full bg-[#D4AF37] z-10 ring-4 ring-[#050505]`} />
                    <div className="lg:hidden absolute left-3 top-6 bottom-6 w-px bg-[#D4AF37]/40 rounded-full" />
                    <span className="text-[#D4AF37] font-serif text-3xl sm:text-4xl font-bold tracking-wider">{event.year}</span>
                    <h4 className="text-white font-semibold text-base sm:text-lg mt-2 mb-2 tracking-wide">{event.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
//  3. VALUES SECTION
// ══════════════════════════════════════════════════════
const ValuesSection = () => {
  const { t } = useTranslation();

  // ✅ t() komponent ichida
  const VALUES = VALUE_ICONS.map((Icon, i) => ({
    icon:  Icon,
    title: t(`value_${i}_title`),
    desc:  t(`value_${i}_desc`),
  }));

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-[#D4AF37] font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-widest uppercase">
            {t("values_title")}
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[#D4AF37]/40" />
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} transition={{ duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-6 sm:p-7 lg:p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] hover:border-[#D4AF37]/30 hover:bg-[#0d0d0d] transition-colors duration-300">
              <div className="mb-5 w-11 h-11 flex items-center justify-center rounded-xl bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                <Icon size={22} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3 tracking-wide">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
//  4. MANUFACTURING SECTION
// ══════════════════════════════════════════════════════
const ManufacturingSection = () => {
  const { t } = useTranslation();

  // ✅ t() komponent ichida
  const PROCESS_ITEMS = [0, 1, 2].map((i) => t(`process_${i}`));

  return (
    <section className="bg-[#080808] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-14 lg:gap-16 xl:gap-20">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            variants={stagger} className="flex-1 w-full">
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-[#D4AF37] font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-widest uppercase mb-6 sm:mb-8">
              {t("manufacturing_title")}
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm sm:text-base leading-loose mb-8">
              {t("manufacturing_desc")}
            </motion.p>
            <motion.ul variants={stagger} className="space-y-3 sm:space-y-4">
              {PROCESS_ITEMS.map((item) => (
                <motion.li key={item} variants={fadeUp} transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 text-gray-400 text-sm sm:text-base">
                  <span className="shrink-0 w-5 h-5 rounded-full border border-[#D4AF37]/50 flex items-center justify-center">
                    <span className="text-[#D4AF37] text-xs">✓</span>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 w-full">
            <img src="../public/jarayon-photo.jpg" alt={t("manufacturing_img_alt")}
              className="w-full rounded-2xl border border-[#D4AF37]/20 object-cover aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] hover:border-[#D4AF37]/50 transition-colors duration-300" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════
const About = () => (
  <div className="bg-[#050505] text-white">
    <VideoSection />
    <HistorySection />
    <ValuesSection />
    <ManufacturingSection />
  </div>
);

export default About;