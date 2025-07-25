import React from "react";
import { FaVolumeUp, FaHeadphones, FaPhone } from "react-icons/fa";

const WelcomeBlitSono: React.FC = (): JSX.Element => {
  return (
    <section className="bgImage">
      <div
        className="
      bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
      text-white  px-2 py-8 sm:px-4 sm:py-12 sm:pl-3
      w-full flex flex-col items-center
    "
      >
        <h1 className="text-3xl font-extrabold mb-4 text-center flex flex-row sm:flex-row 
          gap-1 borde">
          <FaVolumeUp className="text-[#18769C]" /> Bienvenue chez Blit Sono
          <br className="block sm:hidden" /> Là où chaque son compte !
        </h1>
        <p
          className="
      w-full max-w-lg sm:max-w-xl lg:max-w-2xl
      text-base sm:text-lg lg:text-xl italic mb-6
      text-center sm:text-start
      border-l-4 border-[#18769C] pl-4
    "
        >
          Blit Sono vous accompagne pour vos événements avec un service fiable
          et attentionné, en proposant des équipements son et lumière
          professionnels, un système de réservation simple et une équipe à
          l'écoute.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/catalogues"
            className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            role="button"
          >
            <FaHeadphones /> Explorer notre catalogue
          </a>
          <a
            href="https://www.facebook.com/blit.sono"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            role="button"
          >
            <FaPhone /> Nous contacter sur MP
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBlitSono;
