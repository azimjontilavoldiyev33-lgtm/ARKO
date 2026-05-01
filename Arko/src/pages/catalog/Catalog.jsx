import { useState } from "react";
import { useTranslation } from "react-i18next";

const products = [
  { id: 1,  cat: "yotoq",   nameKey: "prod_1_name",  descKey: "prod_1_desc",  categoryKey: "cat_cat_yotoq",   img: "../public/kravat-real.jpg"    },
  { id: 2,  cat: "mehmon",  nameKey: "prod_2_name",  descKey: "prod_2_desc",  categoryKey: "cat_cat_mehmon",  img: "../public/stinavoy-shpon.jpg" },
  { id: 3,  cat: "oshxona", nameKey: "prod_3_name",  descKey: "prod_3_desc",  categoryKey: "cat_cat_oshxona", img: "../public/kuxnya.jpg"          },
  { id: 4,  cat: "yotoq",   nameKey: "prod_4_name",  descKey: "prod_4_desc",  categoryKey: "cat_cat_yotoq",   img: "../public/detski.jpg"          },
  { id: 5,  cat: "mehmon",  nameKey: "prod_5_name",  descKey: "prod_5_desc",  categoryKey: "cat_cat_mehmon",  img: "../public/javon.jpg"           },
  { id: 6,  cat: "mehmon",  nameKey: "prod_6_name",  descKey: "prod_6_desc",  categoryKey: "cat_cat_mehmon",  img: "../public/kamod-shpon.jpg"     },
  { id: 7,  cat: "ofis",    nameKey: "prod_7_name",  descKey: "prod_7_desc",  categoryKey: "cat_cat_ofis",    img: "../public/reseption.jpg"       },
  { id: 8,  cat: "ofis",    nameKey: "prod_8_name",  descKey: "prod_8_desc",  categoryKey: "cat_cat_ofis",    img: "../public/ofisnoy-stol.jpg"    },
  { id: 9,  cat: "mehmon",  nameKey: "prod_9_name",  descKey: "prod_9_desc",  categoryKey: "cat_cat_mehmon",  img: "../public/pod-tv.jpg"          },
  { id: 10, cat: "mehmon",  nameKey: "prod_10_name", descKey: "prod_10_desc", categoryKey: "cat_cat_mehmon",  img: "../public/Gardirob.jpg"        },
  { id: 11, cat: "yotoq",   nameKey: "prod_11_name", descKey: "prod_11_desc", categoryKey: "cat_cat_yotoq",   img: "../public/trimo.jpg"           },
  { id: 12, cat: "yotoq",   nameKey: "prod_12_name", descKey: "prod_12_desc", categoryKey: "cat_cat_yotoq",   img: "../public/kravat.jpg"          },
];

const filterKeys = [
  { key: "all",     labelKey: "filter_all"     },
  { key: "yotoq",   labelKey: "filter_yotoq"   },
  { key: "mehmon",  labelKey: "filter_mehmon"  },
  { key: "oshxona", labelKey: "filter_oshxona" },
  { key: "ofis",    labelKey: "filter_ofis"    },
];

function ProductCard({ p, featured }) {
  const { t } = useTranslation();
  const isImperiya = p.id === 1;

  return (
    <div
      className={`group relative overflow-hidden bg-[#0c0b09] border border-[#1e1a10] transition-all duration-500 hover:border-[#c8a84b]/40 cursor-pointer flex flex-col 
      ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      {/* image */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br from-[#111008] to-[#0a0906] overflow-hidden flex-shrink-0 ${
          featured ? "aspect-[16/9]" : "aspect-[4/3]"
        } ${isImperiya ? "h-[1000px]" : ""}`}
      >
        <img
          src={p.img}
          alt={t(p.nameKey)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            featured ? "opacity-90" : "opacity-80"
          } group-hover:opacity-100`}
        />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(200,168,75,0.07)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent group-hover:w-full transition-all duration-700" />
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#c8a84b]/20 group-hover:border-[#c8a84b]/70 transition-colors duration-500" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#c8a84b]/20 group-hover:border-[#c8a84b]/70 transition-colors duration-500" />

        <div className="absolute inset-x-0 bottom-0 flex justify-end p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <span className="bg-[#0a0906]/90 border border-[#c8a84b]/70 text-[#c8a84b] text-[9px] tracking-[2.5px] uppercase px-4 py-2 hover:bg-[#c8a84b] hover:text-[#080705] transition-colors duration-300">
            {t("cat_card_inquire_btn")}
          </span>
        </div>
      </div>

      {/* info */}
      <div
        className={`border-t border-[#1e1a10] group-hover:border-[#c8a84b]/20 transition-colors duration-500 ${
          featured ? "sm:p-7" : ""
        }`}
      >
        <p className="text-[9px] tracking-[3px] text-[#5a4820] uppercase mb-2 font-light">
          {t(p.categoryKey)}
        </p>
        <h3
          className={`font-light text-[#d4bc7a] group-hover:text-[#e8d090] transition-colors duration-300 leading-snug mb-2 ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t(p.nameKey)}
        </h3>
        <p className="text-[11px] text-[#4a3c1c] leading-relaxed font-light tracking-wide">
          {t(p.descKey)}
        </p>
      </div>
    </div>
  );
}

export default function ArkoCatalog() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuOpen, setMenuOpen]         = useState(false);

  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.cat === activeFilter);

  return (
    <div
      className="min-h-screen bg-[#080705] text-[#e8d5a0]"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-10 lg:px-16 py-4 bg-[#080705]/90 backdrop-blur-sm border-b border-[#1e1a10]">
        <div>
          <p className="text-[8px] tracking-[5px] text-[#c8a84b]/50 uppercase mb-0.5">
            {t("cat_nav_brand_subtitle")}
          </p>
          <span
            className="text-xl sm:text-2xl font-light text-[#e8d090] tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("cat_nav_brand_name")}
          </span>
        </div>

        {/* desktop filters */}
        <div className="hidden md:flex gap-1">
          {filterKeys.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`text-[9px] tracking-[2px] uppercase px-4 py-2 border transition-all duration-300 ${
                activeFilter === f.key
                  ? "bg-[#c8a84b] border-[#c8a84b] text-[#080705]"
                  : "border-[#2a2010] text-[#7a6030] hover:border-[#c8a84b]/50 hover:text-[#c8a84b]"
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>

        {/* mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t("cat_nav_menu_aria")}
        >
          <span className={`block w-5 h-[1px] bg-[#c8a84b] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-[1px] bg-[#c8a84b] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1px] bg-[#c8a84b] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {/* mobile drawer */}
      <div className={`fixed top-[57px] inset-x-0 z-40 bg-[#080705] border-b border-[#1e1a10] transition-all duration-500 overflow-hidden md:hidden ${menuOpen ? "max-h-48 py-4" : "max-h-0"}`}>
        <div className="flex flex-wrap gap-2 px-4">
          {filterKeys.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setMenuOpen(false); }}
              className={`text-[9px] tracking-[2px] uppercase px-4 py-2 border transition-all duration-300 ${
                activeFilter === f.key
                  ? "bg-[#c8a84b] border-[#c8a84b] text-[#080705]"
                  : "border-[#2a2010] text-[#7a6030]"
              }`}
            >
              {t(f.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="pt-32 pb-10 px-4 sm:px-10 lg:px-16 border-b border-[#1e1a10]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[9px] tracking-[4px] text-[#c8a84b]/40 uppercase mb-3">
              {t("cat_hero_eyebrow")}
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#e8d090] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t("cat_hero_title_line1")}
              <br />
              <span className="italic text-[#c8a84b]">{t("cat_hero_title_line2")}</span>
            </h2>
          </div>
          <p
            className="text-6xl sm:text-7xl font-light text-[#1e1a0e] leading-none select-none"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {String(filtered.length).padStart(2, "0")}
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <main className="px-4 sm:px-10 lg:px-16 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              featured={i === 0 && activeFilter === "all"}
            />
          ))}
        </div>
      </main>

      {/* ── CTA ── */}
      <section className="mx-4 sm:mx-10 lg:mx-16 mb-16 border border-[#1e1a10] p-6 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(200,168,75,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#c8a84b]/30" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#c8a84b]/30" />
        <div className="relative">
          <p className="text-[9px] tracking-[3px] text-[#4a3a18] uppercase mb-2">
            {t("cat_cta_eyebrow")}
          </p>
          <h3
            className="text-2xl sm:text-3xl font-light text-[#d4bc7a] leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {t("cat_cta_title_line1")}
            <br />
            <span className="italic text-[#c8a84b]">{t("cat_cta_title_line2")}</span>
          </h3>
        </div>
        <button className="relative shrink-0 border border-[#c8a84b]/60 text-[#c8a84b] text-[9px] tracking-[3px] uppercase px-8 py-4 hover:bg-[#c8a84b] hover:text-[#080705] transition-all duration-300">
          <a href="/Contact">{t("cat_cta_btn")}</a>
        </button>
      </section>

      {/* ── BOTTOM ── */}
      <div className="px-4 sm:px-10 lg:px-16 py-6 border-t border-[#1a1508] flex items-center justify-between">
        <span
          className="text-[#2e2510] text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t("cat_footer_brand")}
        </span>
        <span className="text-[#2e2510] text-[9px] tracking-widest uppercase">
          {t("cat_footer_copy")}
        </span>
      </div>
    </div>
  );
}