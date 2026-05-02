import { useEffect, useRef } from "react";

const GOLD = "#b8922a";

const items = [
  {
    id: 1, img: "stinavoy-shpon.jpg", title: "Premium Velvet",
    // Desktop joylashuv (%)
    pos: { top: "12%", left: "4%" },
    size: { w: "18%", h: "42%" },
    speedX: 0.4, speedY: 0.6, amp: 18, phase: 0,
  },
  {
    id: 2, img: "ofisnoy-stol.jpg", title: "24K Gold Finish",
    pos: { top: "5%", right: "3%" },
    size: { w: "14%", h: "28%" },
    speedX: 0.3, speedY: 0.5, amp: 22, phase: 1.2,
  },
  {
    id: 3, img: "kuxnya.jpg", title: "Italian Marble",
    pos: { bottom: "8%", left: "4%" },
    size: { w: "18%", h: "28%" },
    speedX: 0.5, speedY: 0.35, amp: 14, phase: 2.4,
  },
  {
    id: 4, img: "kravat-real.jpg", title: "Perfect Stitch",
    pos: { bottom: "6%", right: "8%" },
    size: { w: "19%", h: "26%" },
    speedX: 0.45, speedY: 0.55, amp: 20, phase: 0.7,
  },
  {
    id: 5, img: "reseption.jpg", title: "",
    pos: { top: "22%", left: "28%" },
    size: { w: "34%", h: "38%" },
    speedX: 0.25, speedY: 0.3, amp: 10, phase: 3.5,
  },
  {
    id: 6, img: "pod-tv-2.jpg", title: "",
    pos: { bottom: "4%", left: "25%" },
    size: { w: "28%", h: "26%" },
    speedX: 0.35, speedY: 0.4, amp: 12, phase: 1.8,
  },
  {
    id: 7, img: "tumba-shpon.jpg", title: "",
    pos: { top: "35%", left: "65%" },
    size: { w: "22%", h: "38%" },
    speedX: 0.3, speedY: 0.45, amp: 14, phase: 2.1,
  },
];

// Tablet uchun faqat 5 ta, mobile uchun 4 ta karta
const TABLET_IDS = [1, 2, 3, 4, 5];
const MOBILE_IDS  = [1, 2, 3, 4];

const Moodboard = () => {
  const wrapRef   = useRef(null);
  const cardRefs  = useRef([]);
  const animRef   = useRef(null);
  const timeRef   = useRef(0);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 640;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e) => {
      if (isMobileRef.current) return;
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseRef.current.x - 4 + "px";
        cursorRef.current.style.top  = mouseRef.current.y - 4 + "px";
      }
    };

    wrap.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      timeRef.current += 0.008;
      const t  = timeRef.current;
      const cx = wrap.offsetWidth  / 2;
      const cy = wrap.offsetHeight / 2;
      const mx = (mouseRef.current.x - cx) / (cx || 1);
      const my = (mouseRef.current.y - cy) / (cy || 1);

      items.forEach((item, i) => {
        const el = cardRefs.current[i];
        if (!el || isMobileRef.current) return;
        const floatX    = Math.sin(t * item.speedX * 1.3 + item.phase) * item.amp * 0.6;
        const floatY    = Math.sin(t * item.speedY + item.phase) * item.amp;
        const parallaxX = mx * 18 * item.speedX;
        const parallaxY = my * 18 * item.speedY;
        const rotate    = Math.sin(t * 0.4 + item.phase) * 1.2;
        el.style.transform = `translate(${floatX + parallaxX}px,${floatY + parallaxY}px) rotate(${rotate}deg)`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      wrap.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        .mb-wrap {
          position: relative;
          height: 100vh;
          min-height: 600px;
          background: #050505;
          overflow: hidden;
          cursor: none;
        }

        .mb-cursor {
          position: absolute;
          width: 8px; height: 8px;
          background: ${GOLD};
          border-radius: 50%;
          pointer-events: none;
          z-index: 999;
          mix-blend-mode: difference;
        }

        /* ── KARTALAR: % o'lcham + pozitsiya ── */
        .mb-card {
          position: absolute;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          background: #111;
          will-change: transform;
          transition: border-color 0.4s ease;
          cursor: crosshair;
        }
        .mb-card:hover { border-color: rgba(184,146,42,0.35); z-index: 20; }

        .mb-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: grayscale(55%) brightness(0.55);
          transition: filter 1.2s ease, transform 1.2s ease;
          display: block;
          pointer-events: none;
        }
        .mb-card:hover img { filter: grayscale(0%) brightness(0.95); transform: scale(1.1); }

        .mb-label {
          position: absolute;
          bottom: 10px; left: 10px;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .mb-card:hover .mb-label { opacity: 1; }
        .mb-label p {
          color: ${GOLD};
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 300;
          margin: 0;
        }

        /* ── CENTER TEXT ── */
        .mb-center-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          pointer-events: none;
          text-align: center;
        }
        .mb-tag {
          color: ${GOLD};
          font-size: 9px;
          letter-spacing: 10px;
          text-transform: uppercase;
          margin-bottom: 14px;
          opacity: 0.5;
        }
        .mb-title {
          font-family: 'Cormorant Garamond', serif;
          color: white;
          font-size: clamp(28px, 5vw, 68px);
          font-weight: 300;
          font-style: italic;
          letter-spacing: -1px;
          line-height: 1.1;
        }
        .mb-title span { color: ${GOLD}; font-style: normal; font-weight: 400; }

        .mb-bg-text {
          position: absolute;
          bottom: -10px; left: 20px;
          color: rgba(255,255,255,0.025);
          font-size: 14vw;
          font-weight: 900;
          text-transform: uppercase;
          user-select: none;
          line-height: 1;
          letter-spacing: -5px;
          pointer-events: none;
          z-index: 1;
        }

        /* ── TABLET (641–1024px): kamroq karta, kattaroq font ── */
        @media (max-width: 1024px) {
          .mb-card-6, .mb-card-7 { display: none; }
          .mb-bg-text { font-size: 18vw; }
        }

        /* ── MOBILE (<= 640px): grid tartib ── */
        @media (max-width: 640px) {
          .mb-wrap {
            height: auto;
            min-height: unset;
            padding: 48px 16px 56px;
            cursor: auto;
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .mb-cursor { display: none; }

          /* Barcha kartalarni olib, grid ichiga joylaymiz */
          .mb-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 32px;
          }

          .mb-card {
            position: relative !important;
            width: 100% !important;
            height: 44vw !important;
            top: auto !important; bottom: auto !important;
            left: auto !important; right: auto !important;
            transform: none !important;
          }
          /* 1-karta keng: grid col-span */
          .mb-card-5 {
            grid-column: 1 / -1;
            height: 52vw !important;
          }
          .mb-card-6, .mb-card-7 { display: none; }

          .mb-card img { min-height: unset; }

          .mb-center-text {
            position: relative;
            padding: 0 8px 8px;
          }
          .mb-bg-text { display: none; }
          .mb-tag { font-size: 10px; letter-spacing: 6px; }
          .mb-title { font-size: clamp(26px, 9vw, 42px); }
        }
      `}</style>

      {/* Custom cursor — desktop only */}
      <div className="mb-cursor" ref={cursorRef} />

      <section ref={wrapRef} className="mb-wrap">

        {/* MOBILE: grid wrapper */}
        <div className="mb-grid">
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`mb-card mb-card-${item.id}`}
              style={{
                // Desktop: % joylashuv
                width:  item.size.w,
                height: item.size.h,
                ...item.pos,
              }}
            >
              <img src={item.img} alt={item.title} />
              {item.title && (
                <div className="mb-label"><p>{item.title}</p></div>
              )}
            </div>
          ))}
        </div>

        {/* Center branding */}
        <div className="mb-center-text">
          <div>
            <p className="mb-tag">Aesthetic Philosophy</p>
            <h2 className="mb-title">
              The Art of <span>Selection</span>
            </h2>
          </div>
        </div>

        <div className="mb-bg-text">TEXTURE</div>
      </section>
    </>
  );
};

export default Moodboard;