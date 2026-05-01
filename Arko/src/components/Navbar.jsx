import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom'; // ✅ React Router ishlatildi

// ✅ Nav items bitta joyda — DRY prinsipi
const NAV_LINKS = [
  { key: 'nav_home',         href: '/'            },
  { key: 'nav_about',        href: '/About'        },
  { key: 'nav_catalog',      href: '/Catalog'      },
  { key: 'nav_configurator', href: '/Moodboard' },
  { key: 'nav_contact',      href: '/Contact'      },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location  = useLocation();          // ✅ active link uchun
  const [isOpen,     setIsOpen]     = useState(false);
  const [scrolled,   setScrolled]   = useState(false); // ✅ scroll effekti

  // ✅ Scroll hodisasini kuzatish
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ✅ Route o'zgarganda mobil menyuni yopish
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ✅ Menyu ochiq bo'lganda body scrollini bloklash
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'uz' ? 'ru' : 'uz');
  };

  const isActive = (href) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={[
        'fixed top-0 left-0 right-0 z-[100]',
        'border-b border-[#C5A059]/10',
        'transition-all duration-300',
        scrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-xl shadow-lg shadow-black/30'
          : 'bg-[#0D0D0D]/80 backdrop-blur-lg',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">

          {/* ───── LOGOTIP ───── */}
          <Link
            to="/"
            className="flex flex-col group select-none shrink-0"
            aria-label="Arko Mebel — bosh sahifa"
          >
            <span className="text-[#C5A059] text-xl sm:text-2xl font-serif font-bold tracking-tighter leading-none group-hover:opacity-80 transition-opacity duration-200">
              ARKO MEBEL
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 tracking-[3px] sm:tracking-[4px] uppercase pl-0.5">
              Interior
            </span>
          </Link>

          {/* ───── DESKTOP MENU (lg va undan katta) ───── */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                to={href}
                className={[
                  'relative text-[11px] uppercase tracking-[3px] transition-colors duration-200',
                  'after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-[#C5A059]',
                  'after:transition-all after:duration-300',
                  isActive(href)
                    ? 'text-[#C5A059] after:w-full'
                    : 'text-white hover:text-[#C5A059] after:w-0 hover:after:w-full',
                ].join(' ')}
              >
                {t(key)}
              </Link>
            ))}

            {/* TIL ALMASHTIRGICH */}
            <LanguageButton
              lang={i18n.language}
              onToggle={toggleLanguage}
              variant="full"
            />
          </div>

          {/* ───── TABLET MENU (md dan lg gacha) ───── */}
          <div className="hidden md:flex lg:hidden items-center gap-5">
            {NAV_LINKS.slice(0, 3).map(({ key, href }) => (
              <Link
                key={key}
                to={href}
                className={[
                  'text-[10px] uppercase tracking-[2px] transition-colors duration-200',
                  isActive(href) ? 'text-[#C5A059]' : 'text-white hover:text-[#C5A059]',
                ].join(' ')}
              >
                {t(key)}
              </Link>
            ))}
            <LanguageButton
              lang={i18n.language}
              onToggle={toggleLanguage}
              variant="full"
            />
            {/* Qolgan linklar uchun hamburger */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              aria-label={isOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              aria-expanded={isOpen}
              className="text-white hover:text-[#C5A059] transition-colors duration-200 p-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* ───── MOBILE BUTTONS (sm gacha) ───── */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageButton
              lang={i18n.language}
              onToggle={toggleLanguage}
              variant="compact"
            />
            <button
              onClick={() => setIsOpen((p) => !p)}
              aria-label={isOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              aria-expanded={isOpen}
              className="text-white hover:text-[#C5A059] transition-colors duration-200 p-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* ───── MOBILE / TABLET DROPDOWN ───── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/60 lg:hidden -z-10"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown panel */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={[
                'lg:hidden overflow-hidden',
                'bg-[#0D0D0D]/98 backdrop-blur-xl',
                'border-t border-[#C5A059]/10',
              ].join(' ')}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center gap-5 sm:gap-6">
                
                {/* Nav linklar */}
                {NAV_LINKS.map(({ key, href }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    className="w-full text-center"
                  >
                    <Link
                      to={href}
                      className={[
                        'inline-block py-1 text-sm sm:text-base uppercase tracking-[3px]',
                        'transition-colors duration-200',
                        isActive(href)
                          ? 'text-[#C5A059]'
                          : 'text-white hover:text-[#C5A059]',
                      ].join(' ')}
                    >
                      {t(key)}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="w-16 h-px bg-[#C5A059]/30" />

                {/* CTA tugma */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.2 }}
                  className="w-full sm:w-72"
                >
                  <Link
                    to="/contact"
                    className={[
                      'block w-full py-3 sm:py-3.5',
                      'text-center font-bold uppercase text-xs tracking-widest',
                      'bg-[#C5A059] text-black',
                      'hover:bg-[#b8934f] active:scale-[0.98]',
                      'transition-all duration-200',
                    ].join(' ')}
                  >
                    {t('contact_us', "Bog'lanish")}
                  </Link>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ─────────────────────────────────────────────
   Til almashtirgich — qayta ishlatiladigan komponent
───────────────────────────────────────────── */
const LanguageButton = ({ lang, onToggle, variant = 'full' }) => {
  const nextLang = lang === 'uz' ? 'RU' : 'UZ';

  if (variant === 'compact') {
    return (
      <button
        onClick={onToggle}
        aria-label="Tilni almashtirish"
        className="text-[#C5A059] text-xs font-bold uppercase hover:opacity-70 transition-opacity duration-200 px-1"
      >
        {nextLang}
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      aria-label="Tilni almashtirish"
      className={[
        'flex items-center gap-2 px-3 py-1.5 rounded-sm',
        'border border-[#C5A059]/30',
        'hover:bg-[#C5A059] hover:border-[#C5A059]',
        'group transition-all duration-300',
      ].join(' ')}
    >
      <Globe
        size={13}
        className="text-[#C5A059] group-hover:text-black group-hover:rotate-180 transition-all duration-500"
      />
      <span className="text-xs font-bold uppercase text-white group-hover:text-black transition-colors duration-300">
        {nextLang}
      </span>
    </button>
  );
};

export default Navbar;