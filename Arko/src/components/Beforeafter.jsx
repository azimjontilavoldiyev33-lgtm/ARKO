import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [containerW, setContainerW] = useState(1000);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  // Container kengligini kuzatish — ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Pozitsiya hisoblash + 0–100 cheklash
  const calcPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, x)));
  }, []);

  // Mouse
  const handleMouseDown = (e) => { isDragging.current = true; calcPos(e.clientX); };
  const handleMouseMove = (e) => { if (isDragging.current) calcPos(e.clientX); };
  const handleMouseUp   = () => { isDragging.current = false; };

  // Touch — preventDefault: scroll bloklanadi drag paytida
  const handleTouchStart = (e) => { e.preventDefault(); calcPos(e.changedTouches[0].clientX); };
  const handleTouchMove  = (e) => { e.preventDefault(); calcPos(e.changedTouches[0].clientX); };


  const { t } = useTranslation();

  return (
    <section className="bg-black py-16 md:py-24 px-4 text-center">

      {/* Sarlavha */}
      <h2 className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
        {t("beforeafter_title")}
      </h2>
      <p className="text-gray-400 text-sm sm:text-base mb-8 md:mb-12">
       {t("beforeafter_subtitle")}
      </p>

      {/* Slider container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="
          relative w-full max-w-4xl mx-auto
          overflow-hidden rounded-xl md:rounded-2xl
          border-2 border-[#D4AF37]
          cursor-col-resize select-none
          aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/9]
        "
        style={{ touchAction: "none" }}
      >
        {/* Orqa rasm: Real natija */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/kravat-real.jpg')" }}
        />

        {/* Ustki rasm: 3D Dizayn — clip wrapper */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          {/*
            Ichki div — DOIM containerning to'liq kengligi.
            Tashqi div faqat qirqadi → rasm siljimaydi.
          */}
          <div
            className="absolute top-0 left-0 h-full bg-cover bg-center"
            style={{
              width: containerW,
              backgroundImage: "url('/kravat-design.png')",
            }}
          />

          {/* 3D Dizayn labeli */}
          <span className="
            absolute top-3 left-3 sm:top-4 sm:left-4
            bg-black/70 text-white
            text-[10px] sm:text-xs font-semibold tracking-widest
            px-3 py-1 rounded
          ">
            {t("beforeafter_label_design")}
          </span>
        </div>

        {/* Real natija labeli */}
        <span className="
          absolute top-3 right-3 sm:top-4 sm:right-4
          bg-[#D4AF37]/85 text-black
          text-[10px] sm:text-xs font-bold tracking-widest
          px-3 py-1 rounded
        ">
          {t("beforeafter_label_real")}
        </span>

        {/* Slider chiziq */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] z-10"
          style={{
            left: `${sliderPos}%`,
            transform: "translateX(-50%)",
          }}
        >
          {/* Slider handle doirasi */}
          <div className="
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-9 h-9 sm:w-11 sm:h-11
            bg-[#D4AF37] rounded-full
            flex items-center justify-center
            text-black font-bold text-base sm:text-xl
            shadow-lg shadow-black/50
          ">
            ↔
          </div>
        </div>
      </div>

      {/* Mobil uchun eslatma */}
      <p className="text-gray-500 text-xs mt-4 sm:hidden">
        {t("beforeafter_hint_mobile")}
      </p>
      <p className="text-gray-500 text-xs mt-4 hidden sm:block">
        {t("beforeafter_hint_desktop")}
      </p>
    </section>
  );
};

export default BeforeAfter;