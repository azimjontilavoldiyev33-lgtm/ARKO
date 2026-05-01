import { useEffect, useRef } from "react";

const GOLD = "#b8922a";

const items = [
  {
    id: 1,
    img: "stinavoy-shpon.jpg",
    title: "Premium Velvet",
    style: { width: 255, height: 410, top: 108, left: 48 },
    speedX: 0.4,
    speedY: 0.6,
    amp: 18,
    phase: 0,
  },
  {
    id: 2,
    img: "ofisnoy-stol.jpg",
    title: "24K Gold Finish",
    style: { width: 195, height: 255, top: 55, right: 35 },
    speedX: 0.3,
    speedY: 0.5,
    amp: 22,
    phase: 1.2,
  },
  {
    id: 3,
    img: "kuxnya.jpg",
    title: "Italian Marble",
    style: { width: 250, height: 250, bottom: 80, left: 45 },
    speedX: 0.5,
    speedY: 0.35,
    amp: 14,
    phase: 2.4,
  },
  {
    id: 4,
    img: "kravat-real.jpg",
    title: "Perfect Stitch",
    style: { width: 270, height: 250, bottom: 50, right: 90 },
    speedX: 0.45,
    speedY: 0.55,
    amp: 20,
    phase: 0.7,
  },
  {
    id: 5,
    img: "reseption.jpg",
    title: "",
    style: {width: 470 , height: 370, top: 200 , right: 500},
    speedX: 0.85,
    speedY: 0.75,
    amp: 16,
    phase: 3.5,
  },
    {
    id: 6,
    img: "pod-tv-2.jpg",
    title: "",
    style: { width: 400, height: 300, top: 900, left: 500 },
    speedX: 0.85,
    speedY: 0.75,
    amp: 16,
    phase: 3.5,
  },
  {
    id: 7,
    img: "tumba-shpon.jpg",
    title: "",
    style: { width: 300, height: 200, top: 700, right: 200 },
    speedX: 0.85,
    speedY: 0.75,
    amp: 16,
    phase: 3.5,
  },
];

const Moodboard = () => {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const toPx = (value) => (typeof value === "number" ? `${value}px` : value);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const handleMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseRef.current.x - 4 + "px";
        cursorRef.current.style.top = mouseRef.current.y - 4 + "px";
      }
    };

    wrap.addEventListener("mousemove", handleMouseMove);

    const cx = wrap.offsetWidth / 2;
    const cy = wrap.offsetHeight / 2;

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const mx = (mouseRef.current.x - cx) / cx;
      const my = (mouseRef.current.y - cy) / cy;

      items.forEach((item, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const floatX = Math.sin(t * item.speedX * 1.3 + item.phase) * item.amp * 0.6;
        const floatY = Math.sin(t * item.speedY + item.phase) * item.amp;
        const parallaxX = mx * 18 * item.speedX;
        const parallaxY = my * 18 * item.speedY;
        const rotate = Math.sin(t * 0.4 + item.phase) * 1.2;
        el.style.transform = `translate(${floatX + parallaxX}px, ${floatY + parallaxY}px) rotate(${rotate}deg)`;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      wrap.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        .mb-wrap {
          position: relative;
          height: 150vh;
          background: #050505;
          overflow: hidden;
          padding: 80px 40px;
          cursor: none;
        }

        .mb-cursor {
          position: absolute;
          width: 8px;
          height: 8px;
          background: ${GOLD};
          border-radius: 50%;
          pointer-events: none;
          z-index: 999;
          mix-blend-mode: difference;
          transition: transform 0.08s ease;
        }

        .mb-card {
          position: absolute;
          width: var(--card-width);
          height: var(--card-height);
          top: var(--card-top);
          bottom: var(--card-bottom);
          left: var(--card-left);
          right: var(--card-right);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          background: #111;
          will-change: transform;
          transition: border-color 0.4s ease, z-index 0s;
          cursor: crosshair;
        }

        .mb-card:hover {
          border-color: rgba(184,146,42,0.35);
          z-index: 20;
        }

        .mb-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(55%) brightness(0.55);
          transition: filter 1.2s ease, transform 1.2s ease;
          display: block;
          pointer-events: none;
        }

        .mb-card:hover img {
          filter: grayscale(0%) brightness(0.95);
          transform: scale(1.1);
        }

        .mb-label {
          position: absolute;
          bottom: 10px;
          left: 10px;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .mb-card:hover .mb-label {
          opacity: 1;
        }

        .mb-label p {
          color: ${GOLD};
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 300;
          margin: 0;
        }

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
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 300;
          font-style: italic;
          letter-spacing: -1px;
          line-height: 1.1;
        }

        .mb-title span {
          color: ${GOLD};
          font-style: normal;
          font-weight: 400;
        }

        .mb-bg-text {
          position: absolute;
          bottom: -10px;
          left: 20px;
          color: rgba(255,255,255,0.03);
          font-size: 15vw;
          font-weight: 900;
          text-transform: uppercase;
          user-select: none;
          line-height: 1;
          letter-spacing: -5px;
          pointer-events: none;
          z-index: 1;
        }

        /* Laptop */
        @media (max-width: 1200px) {
          .mb-wrap {
            padding: 60px 32px;
            height: 130vh;
          }
          .mb-bg-text {
            left: 12px;
            font-size: 18vw;
          }
        }

        /* Tablet */
        @media (max-width: 900px) {
          .mb-wrap {
            padding: 50px 24px;
            height: 120vh;
          }
          .mb-card {
            width: min(46vw, 240px);
            height: auto;
          }
          .mb-card img {
            min-height: 220px;
          }
          .mb-bg-text {
            font-size: 24vw;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .mb-wrap {
            position: relative;
            height: auto;
            padding: 40px 16px 60px;
            cursor: auto;
          }
          .mb-cursor {
            display: none;
          }
          .mb-card {
            position: relative;
            width: min(90vw, 280px);
            height: 260px;
            top: auto;
            bottom: auto;
            left: auto;
            right: auto;
            margin: 0 auto 24px;
            transform: none !important;
          }
          .mb-card img {
            min-height: 260px;
          }
          .mb-center-text {
            position: relative;
            padding-top: 20px;
          }
          .mb-bg-text {
            display: none;
          }
          .mb-title {
            font-size: clamp(28px, 10vw, 46px);
          }
          .mb-tag {
            font-size: 10px;
            letter-spacing: 8px;
          }
        }
      `}</style>

      <div className="mb-cursor" ref={cursorRef} />

      <section ref={wrapRef} className="mb-wrap">
        {/* Floating cards */}
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`mb-card mb-card-${item.id}`}
            style={{
              "--card-width": toPx(item.style.width),
              "--card-height": toPx(item.style.height),
              "--card-top": toPx(item.style.top ?? "auto"),
              "--card-bottom": toPx(item.style.bottom ?? "auto"),
              "--card-left": toPx(item.style.left ?? "auto"),
              "--card-right": toPx(item.style.right ?? "auto"),
            }}
          >
            <img src={item.img} alt={item.title} />
            <div className="mb-label">
              <p>{item.title}</p>
            </div>
          </div>
        ))}

        {/* Center text */}
        <div className="mb-center-text">
          <div>
            <p className="mb-tag">Aesthetic Philosophy</p>
            <h2 className="mb-title">
              The Art of <span>Selection</span>
            </h2>
          </div>
        </div>

        {/* Background watermark */}
        <div className="mb-bg-text">TEXTURE</div>
      </section>
    </>
  );
};

export default Moodboard;