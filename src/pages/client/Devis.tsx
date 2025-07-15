import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarCheck, FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";

interface Ligne {
  materiel: string;
  quantite: number;
  prixUnitaire: string;
  duree: string;
  sousTotal: string;
  image_url: string;
}

const lignes: Ligne[] = [
  {
    materiel: "Pack DJ + Éclairage",
    quantite: 2,
    prixUnitaire: "180€/jour",
    duree: "2 jours",
    sousTotal: "360€",
    image_url: "/pack-evenementiel.jpeg",
  },
   {
    designation: "Deejay",
    quantite: 2,
    prixUnitaire: "180€/jour",
    duree: "2 jours",
    sousTotal: "360€",
    image_url: "/deejay.jpg",
  },
];

export default function Devis(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="text-[#575756]">
      <title>Vos devis personnalisés | Blit Sono</title>
      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
                        text-white py-10 w-full flex flex-col pl-30">
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px] items-center">
            <FaCalendarCheck className="text-7xl text-[#18769C]" />
            Détails de votre devis
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Avec BlitSono, découvrez en détail le matériel que vous avez sélectionné ! Profitez d'un aperçu complet, prix transparent, et qualité professionnelle — parce que votre événement mérite l’excellence.
          </p>
          <div className="space-x-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <Link
              to="https://www.facebook.com/blit.sono"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Contactez-nous sur MP
            </Link>
          </div>
        </div>
      </section>

      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-bold mb-4">Votre Devis</h1>
        <Link to="/client" className="text-[#18769C] hover:underline mb-6 block text-2xl">
          ← Retour à mes réservations
        </Link>

        <div className="flex justify-between mb-6">
          <div>
            <h2 className="font-semibold">Informations Générales</h2>
            <p>Numéro de devis : DV{id}</p>
            <p>Date : 14 août 2025</p>
            <p>Client : Jean Dupont</p>
            <p>Email : jean.dupont@example.com</p>
          </div>
          <div>
            <h2 className="font-semibold">Informations sur l'événement</h2>
            <p>Date : 14 août 2025</p>
            <p>Heure : 18h - 2h</p>
            <p>Lieu : Paris</p>
            <p>Événement : DJ + Éclairage</p>
            <p>Paiement : Complet</p>
          </div>
        </div>

        <table className="w-full table-auto mb-6">
          <thead className="bg-gray-100">
            <tr>
              {["Matériel", "Quantité", "Prix unitaire", "Durée", "Sous-total"].map((h) => (
                <th key={h} className="p-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map((L, i) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="p-2 flex items-center space-x-3">
                  <img
                    src={L.image_url}
                    alt={L.materiel}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{L.materiel}</span>
                </td>
                <td className="p-2">{L.quantite}</td>
                <td className="p-2">{L.prixUnitaire}</td>
                <td className="p-2">{L.duree}</td>
                <td className="p-2">{L.sousTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mb-8">
          <ul className="list-disc ml-6">
            <li>Total matériel : 360 Ar</li>
            <li>Frais de livraison : 30 Ar</li>
            <li>Majoration nuit : 36 Ar</li>
            <li>Réductions : -20 Ar</li>
            <li className="font-bold text-[#18769C]">Total TTC : 406 Ar</li>
          </ul>
          <div className="space-y-2">
            <button className="w-full cursor-pointer px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Valider le devis
            </button>
            <button className="w-full cursor-pointer px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Refuser le devis
            </button>
            <button className="w-full cursor-pointer px-4 py-2 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded">
              Télécharger le devis PDF
            </button>
          </div>
        </div>
      </div>
       <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
          <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[500px]">
            <FaThumbsUp size={24} /> Merci d'avoir choisi BlitSono !
          </h1>
          <p className="w-[500px] text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Nous sommes ravis de contribuer au succès de votre événement avec du
            matériel professionnel, fiable et de haute qualité. Vous bénéficiez d'une
            installation rapide, d'un service expert et d'une tranquillité d'esprit.
            À très bientôt !
          </p>
        </div>
    </div>
  );
}
