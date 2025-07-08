
import React, { useState, useEffect } from "react";

const ScrollTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="cursor-pointer fixed bottom-4 right-4 p-3 bg-[#18769C] text-white rounded-full shadow-lg hover:bg-[#0f5a70] transition-colors"
      aria-label="Retour en haut"
    >
      ↑
    </button>
  );
};

export default ScrollTopButton;
