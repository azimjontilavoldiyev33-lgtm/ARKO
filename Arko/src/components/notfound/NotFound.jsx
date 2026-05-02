import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#050505",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "4rem 2rem",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    }}>
      {/* Icon */}
      <motion.svg
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        width="72" height="72" viewBox="0 0 72 72" fill="none"
      >
        <circle cx="36" cy="36" r="35.5" stroke="#b8922a" strokeWidth="0.5" strokeOpacity="0.4"/>
        <path d="M36 22v18M36 44v4" stroke="#b8922a" strokeWidth="1.5" strokeLinecap="round"/>
      </motion.svg>

      {/* 404 */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: "clamp(64px, 14vw, 96px)",
          fontWeight: 200,
          color: "#fff",
          letterSpacing: "-4px",
          lineHeight: 1,
          margin: "2rem 0 0",
        }}
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{ fontSize: 17, fontWeight: 400, color: "#86868b", marginTop: 12 }}
      >
        Bu sahifa mavjud emas
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{
          fontSize: 14, fontWeight: 300, color: "#48484a",
          marginTop: 8, maxWidth: 320, lineHeight: 1.6,
        }}
      >
        Siz izlagan sahifa o'chirilgan, ko'chirilgan yoki hech qachon mavjud bo'lmagan.
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, transparent, #b8922a55, transparent)",
          margin: "2rem auto",
        }}
      />

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        style={{ display: "flex", alignItems: "center", gap: 4 }}
      >
        <Link to="/" style={{
          padding: "10px 24px",
          background: "#b8922a",
          color: "#050505",
          fontSize: 13,
          fontWeight: 500,
          borderRadius: 980,
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}>
          Bosh sahifaga
        </Link>
        <button onClick={() => navigate(-1)} style={{
          padding: "10px 24px",
          background: "transparent",
          color: "#b8922a",
          fontSize: 13,
          fontWeight: 400,
          borderRadius: 980,
          border: "none",
          cursor: "pointer",
        }}>
          Orqaga
        </button>
      </motion.div>
    </div>
  );
}

export default NotFound;