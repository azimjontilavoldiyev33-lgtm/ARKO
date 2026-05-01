import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        scale: 1.5, 
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 1, ease: "easeInOut" } 
      }}
      className="fixed inset-0 z-[999] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      {/* Markaziy animatsiya: 2 ta oltin kvadrat bir-birining ichida aylanadi */}
      <div className="relative flex items-center justify-center">
        
        {/* Tashqi kvadrat */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 border border-[#c8a84b]/20"
        />
        
        {/* Ichki kvadrat */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 border border-[#c8a84b]/40"
        />

        {/* Markazdagi Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center z-10"
        >
          <h1 className="text-4xl font-light tracking-[15px] text-[#e8d090] italic ml-[15px]">
            ARKO
          </h1>
          <motion.div 
             animate={{ opacity: [0.2, 1, 0.2] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="h-[1px] bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mt-4 w-40 mx-auto"
          />
        </motion.div>
      </div>

      {/* Fon dagi xira oltin nur */}
      <div className="absolute w-[500px] h-[500px] bg-[#c8a84b]/5 blur-[120px] rounded-full" />
    </motion.div>
  );
};

export default LoadingScreen;
