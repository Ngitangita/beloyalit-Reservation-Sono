import React from "react";
import { FaVolumeUp, FaHeadphones, FaPhone } from "react-icons/fa";

const WelcomeBlitSono: React.FC = (): JSX.Element => {
  return (
    <section className="bgImage">
      <div
        className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
         text-white py-16 w-full flex flex-col pl-30"
      >
        <h1 className="text-5xl font-extrabold mb-4 flex gap-1">
          <FaVolumeUp className="text-[#18769C]" /> Bienvenue chez Blit Sono - <br />
          Là où chaque son compte !
        </h1>
        <p className="w-[500px] text-xl italic mb-6 text-start flex items-center justify-center border-l-4 border-[#18769C] pl-4">
          Blit Sono vous accompagne pour vos événements avec un service fiable
          et attentionné, en proposant des équipements son et lumière
          professionnels, un système de réservation simple et une équipe à
          l'écoute.
        </p>
        <div className="space-x-4">
          <a
            href="/catalogues"
            className="inline-flex items-center gap-2 bg-white text-[#18769C]
             font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            role="button"
          >
            <FaHeadphones /> Explorer notre catalogue
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#145e7a] text-white
             px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            role="button"
          >
            <FaPhone /> Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBlitSono;
