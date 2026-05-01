import { useState } from "react"; // useState qo'shildi
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Send } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTranslation } from "react-i18next";

// Leaflet fix... (o'zgarishsiz qoladi)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const COORDS = [41.247847, 69.317932];

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false); // Yuklanish holati

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Formadan ma'lumotlarni yig'ish
    const formData = new FormData(e.target);
    const name = formData.get("user_name");
    const phone = formData.get("user_phone");
    const message = formData.get("user_message");

    // Telegram Bot ma'lumotlari
    const token = "8629482765:AAFnoOezuCtXYKoudnP-70TV9CktzoVOyRc"; // O'zingni tokeningni qo'y
    const chatId = "-1003595220841"; // O'zingni guruh ID-ngni qo'y

    const text = `
🏛 **ARKO MEBEL - YANGI MUROJAAT**
──────────────────
👤 **Mijoz:** ${name}
📞 **Telefon:** ${phone}
💬 **Xabar:** ${message}
──────────────────
📅 Sana: ${new Date().toLocaleString()}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
  }),
});
      

      if (response.ok) {
        alert(t("contact_success_alert") || "Xabar yuborildi!");
        e.target.reset();
      } else {
        alert("Xatolik yuz berdi. Bot sozlamalarini tekshiring.");
      }
    } catch (error) {
      alert("Internet aloqasi bilan muammo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#080705] min-h-screen text-[#e8d5a0] pt-28 pb-20" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet" />
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* ── HEADER ── (o'zgarishsiz) */}
        <header className="mb-12 sm:mb-16 border-b border-[#1e1a10] pb-10">
          <p className="text-[9px] tracking-[4px] text-[#c8a84b]/50 uppercase mb-3">{t("contact_eyebrow")}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#e8d090] leading-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {t("contact_title_prefix")}{" "}<span className="italic text-[#c8a84b]">{t("contact_title_highlight")}</span>
          </h1>
          <p className="text-[#4a3c1c] text-sm sm:text-base font-light max-w-xl leading-relaxed">{t("contact_subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ── KONTAKTLAR (o'zgarishsiz) ── */}
          <div className="flex flex-col gap-4">
            <ContactCard icon={<Phone size={20} />} label={t("contact_phone_label")}>
              <p className="text-lg text-[#d4bc7a] font-light">{t("contact_phone_value")}</p>
              <p className="text-[11px] text-[#4a3a18] tracking-wide mt-1">{t("contact_phone_note")}</p>
            </ContactCard>
            <ContactCard icon={<Mail size={20} />} label={t("contact_email_label")}>
              <p className="text-lg text-[#d4bc7a] font-light">{t("contact_email_value")}</p>
              <p className="text-[11px] text-[#4a3a18] tracking-wide mt-1">{t("contact_email_note")}</p>
            </ContactCard>
            <ContactCard icon={<MapPin size={20} />} label={t("contact_address_label")}>
              <p className="text-lg text-[#d4bc7a] font-light">{t("contact_address_value")}</p>
              <p className="text-[11px] text-[#4a3a18] tracking-wide mt-1">{t("contact_address_note")}</p>
            </ContactCard>
            <div className="mt-2 border border-[#1e1a10] overflow-hidden" style={{ height: "220px" }}>
              <MapContainer center={COORDS} zoom={15} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <Marker position={COORDS}><Popup><span style={{ fontSize: "12px" }}>{t("contact_map_popup")}</span></Popup></Marker>
              </MapContainer>
            </div>
          </div>

          {/* ── FORMA (name atributlari qo'shildi) ── */}
          <motion.form 
            onSubmit={handleSubmit} 
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} 
            className="bg-[#0c0b09] border border-[#1e1a10] p-6 sm:p-10 flex flex-col gap-5"
          >
            <Field label={t("contact_field_name_label")}>
              <input name="user_name" type="text" required placeholder={t("contact_field_name_placeholder")} className="w-full bg-[#080705] border border-[#1e1a10] text-[#d4bc7a] placeholder-[#2e2510] px-4 py-3 text-sm outline-none focus:border-[#c8a84b]/60 transition-colors duration-300" />
            </Field>
            <Field label={t("contact_field_phone_label")}>
              <input name="user_phone" type="tel" required placeholder={t("contact_field_phone_placeholder")} className="w-full bg-[#080705] border border-[#1e1a10] text-[#d4bc7a] placeholder-[#2e2510] px-4 py-3 text-sm outline-none focus:border-[#c8a84b]/60 transition-colors duration-300" />
            </Field>
            <Field label={t("contact_field_message_label")}>
              <textarea name="user_message" rows={4} placeholder={t("contact_field_message_placeholder")} className="w-full bg-[#080705] border border-[#1e1a10] text-[#d4bc7a] placeholder-[#2e2510] px-4 py-3 text-sm outline-none focus:border-[#c8a84b]/60 transition-colors duration-300 resize-none" />
            </Field>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full border border-[#c8a84b]/60 text-[#c8a84b] py-4 text-[10px] tracking-[3px] uppercase flex items-center justify-center gap-3 hover:bg-[#c8a84b] hover:text-[#080705] transition-all duration-300 group mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Yuborilmoqda..." : t("contact_submit_btn")}
              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

// Reusable pieces (o'zgarishsiz qoladi)
function ContactCard({ icon, label, children }) { return ( <div className="flex items-start gap-5 p-5 sm:p-6 border border-[#1e1a10] bg-[#0c0b09] hover:border-[#c8a84b]/30 transition-colors duration-400 group"><div className="shrink-0 w-10 h-10 flex items-center justify-center border border-[#2a2010] text-[#c8a84b] group-hover:border-[#c8a84b]/50 transition-colors duration-300">{icon}</div><div><p className="text-[9px] tracking-[3px] text-[#5a4820] uppercase mb-2">{label}</p>{children}</div></div> ); }
function Field({ label, children }) { return ( <div className="flex flex-col gap-2"><label className="text-[9px] tracking-[3px] text-[#5a4820] uppercase">{label}</label>{children}</div> ); }

export default Contact;
