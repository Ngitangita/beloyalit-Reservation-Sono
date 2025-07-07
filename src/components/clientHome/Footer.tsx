import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer: React.FC = () => (
  <footer className="bg-[#1E2939] text-white py-8 -z-50">
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Vos questions</h3>
        <ul className="space-y-2 text-sm">
          {["Questions les + fréquentes", "Gamme et Stock", "Paiements", "Expédition & Livraison"].map((item, i) => (
            <li key={i}><a href="#" className="hover:text-[#18769C]">{item}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Produits</h3>
        <ul className="space-y-2 text-sm">
          {["Accueil", "Sonorisation", "Deejay", "Éclairage", "Home studio", "Instruments de musique", "HiFi & vidéo", "Câblerie", "Structure", "Flight case"].map((item, i) => (
            <li key={i}><a href="#" className="hover:text-[#18769C]">{item}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
        <p className="text-xl font-bold mb-2">+261(0) 38 97 165 55</p>
        <p className="text-sm mb-2">7j/7 de 24h/24</p>
        <a href="#" className="inline-block mt-2 px-4 py-2 bg-[#18769C]/70 text-black font-medium rounded hover:bg-[#18769C]">
          Contactez nous
        </a>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
        <div className="flex space-x-4 mb-4">
          {[FaFacebookF, FaInstagram].map((Icon, idx) => (
            <a key={idx} href="#" className="p-3 bg-[#18769C]/70 rounded-full hover:bg-[#18769C] hover:text-black transition">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2">Alerte bons plans !</h3>
        <Link to="/sign-up" className="inline-block mt-2 px-4 py-2 bg-[#18769C]/70 text-black font-medium rounded hover:bg-[#18769C]">
          Je m'inscris
        </Link>
      </div>
      
    </div>
  </footer>
);

export default Footer;
