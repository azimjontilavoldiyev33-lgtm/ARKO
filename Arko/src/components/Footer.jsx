import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ─── Inline SVG Iconlar ───────────────────────────────────────────────────────
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
  </svg>
);
const IconTelegram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconYoutube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ─── Statik ma'lumotlar (t() siz) ────────────────────────────────────────────
const partners = [
  { name: "Blum",    logo: "/ardo-tex.jpg"    },
  { name: "Egger",   logo: "/colibri-art.jpg"   },
  { name: "Hettich", logo: "/higold.jpg" },
];

const socialLinks = [
  { Icon: IconInstagram, link: "https://www.instagram.com/arko_mebel_interior/", name: "Instagram" },
  { Icon: IconTelegram,  link: "https://t.me/mebelinterioruz",                   name: "Telegram"  },
  { Icon: IconFacebook,  link: "https://www.facebook.com/arko.mebel.interior/",  name: "Facebook"  },
  { Icon: IconYoutube,   link: "/",                                               name: "YouTube"   },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation();

  // ✅ t() komponent ichida — navLinks
  const navLinks = [
    t("footer_nav_0"),
    t("footer_nav_1"),
    t("footer_nav_2"),
    t("footer_nav_3"),
    t("footer_nav_4"),
  ];

  return (
    <footer className="bg-[#050505] text-white">

      {/* ── Hamkorlar ── */}
      <div className="
        flex flex-wrap justify-center items-center
        gap-8 sm:gap-12 md:gap-16
        px-6 py-10 md:py-14
        border-b border-white/5
      ">
        {partners.map((p) => (
          <motion.img
            key={p.name}
            src={p.logo}
            alt={p.name}
            initial={{ filter: "grayscale(100%)", opacity: 0.5 }}
            whileHover={{ filter: "grayscale(0%)", opacity: 1, scale: 1.06 }}
            transition={{ duration: 0.3 }}
            className="h-7 sm:h-8 md:h-9 cursor-pointer"
          />
        ))}
      </div>

      {/* ── Asosiy grid ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">

        {/* Brend & Ijtimoiy tarmoqlar */}
        <div>
          <h2 className="text-[#D4AF37] text-2xl sm:text-3xl font-bold tracking-[3px] mb-4">
            {t("footer_brand")}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {t("footer_desc")}
          </p>

          {/* Social ikonlar */}
          <div className="flex flex-wrap gap-3 mt-8">
            {socialLinks.map(({ Icon, link, name }) => (
              <motion.a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="
                  flex items-center justify-center
                  w-11 h-11 rounded-full
                  border border-[#D4AF37]/40
                  text-[#D4AF37]
                  hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]
                  transition-colors duration-300
                "
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigatsiya */}
        <div>
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide">
            {t("footer_nav_title")}
          </h4>
          <ul className="space-y-3">
            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="
                    text-gray-500 text-sm
                    hover:text-[#D4AF37]
                    transition-colors duration-300
                    no-underline
                  "
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontaktlar */}
        <div>
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide">
            {t("footer_contact_title")}
          </h4>
          <div className="flex flex-col gap-5">
            <a
              href="https://maps.app.goo.gl/4QM293BH9ZnSFDS7A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-gray-500 text-sm hover:text-[#D4AF37] transition-colors duration-300 no-underline"
            >
              <IconMapPin />
              <span>{t("footer_address")}</span>
            </a>
            <a
              href="tel:+998901234567"
              className="flex items-center gap-3 text-gray-500 text-sm hover:text-[#D4AF37] transition-colors duration-300 no-underline"
            >
              <IconPhone />
              {t("footer_phone")}
            </a>
            <a
              href="mailto:info@arkomebel.uz"
              className="flex items-center gap-3 text-gray-500 text-sm hover:text-[#D4AF37] transition-colors duration-300 no-underline"
            >
              <IconMail />
              {t("footer_email")}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center px-5 py-6 border-t border-white/5 text-gray-600 text-xs tracking-widest">
        © {new Date().getFullYear()} {t("footer_copyright")}
        <span className="relative left-[550px]">{t("footer_developer")}</span>
      </div>
    </footer>
  );
};

export default Footer;