import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarCheck, FaHeadphones, FaPhone, FaThumbsUp } from "react-icons/fa";

interface PaiementData {
  id: number;               // correspond à paiements.id
  reservationId: number;    // correspond à reservation_id
  montant: number;          // correspond à montant
  moyenPaiement: string;    // correspond à moyen_paiement
  datePaiement: string;     // correspond à date_paiement
  user: {                   // infos client liées à la reservation
    prenom: string;
    nom: string;
  };
  evenement: {
    type: string;
    lieu: string;
    date: string;
  };
}

const paiementStatique: PaiementData = {
  id: 123,
  reservationId: 101,
  montant: 846.00,
  moyenPaiement: "Carte bancaire",
  datePaiement: "2025-09-05T15:45:00Z",
  user: {
    prenom: "Jean",
    nom: "Dupont",
  },
  evenement: {
    type: "Mariage",
    lieu: "Paris",
    date: "2025-09-14",
  },
};

export default function Paiement(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const p = paiementStatique;

  return (
    <div className="text-[#575756]">
      <title>Confirmation de paiement | Blit Sono</title>

      <section className="bgImageReservation">
        <div className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939] text-white py-10 w-full flex flex-col pl-30">
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px] items-center">
            <FaCalendarCheck className="text-7xl text-[#18769C]" />
            Confirmation de paiement
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Merci ! Votre paiement a bien été enregistré. Vous trouverez ci-dessous les détails de la transaction. Nous restons à votre disposition pour toute question.
          </p>
          <div className="space-x-4">
            <Link to="/catalogues" className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              <FaHeadphones /> Retour au catalogue
            </Link>
            <Link to="https://www.facebook.com/blit.sono" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition">
              <FaPhone /> Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-bold mb-4">Détails du Paiement</h1>
        <Link to="/client" className="text-[#18769C] hover:underline mb-6 block text-2xl">
          ← Retour à mes réservations
        </Link>

        <div className="flex justify-between mb-6">
          <div>
            <h2 className="font-semibold">Informations client</h2>
            <p>Client : {p.user.prenom} {p.user.nom}</p>
            <p>Réservation ID : {p.reservationId}</p>
          </div>
          <div>
            <h2 className="font-semibold">Transaction</h2>
            <p>Paiement N° : PAY-{new Date(p.datePaiement).getFullYear()}-{p.id}</p>
            <p>Montant : {p.montant.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
            <p>Moyen : {p.moyenPaiement}</p>
            <p>Date : {new Date(p.datePaiement).toLocaleDateString('fr-FR')} à {new Date(p.datePaiement).toLocaleTimeString('fr-FR')}</p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <button className="px-6 py-3 bg-[#18769C] hover:bg-[#0f5a70] text-white rounded-lg">
            Télécharger le reçu PDF
          </button>
        </div>
      </div>

      <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
        <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[500px]">
          <FaThumbsUp size={24} /> Paiement réussi !
        </h1>
        <p className="w-[500px] text-lg italic text-start flex items-center border-l-4 border-[#18769C] pl-4">
          Merci d'avoir choisi BlitSono. Votre événement ({p.evenement.type} à {p.evenement.lieu} le {new Date(p.evenement.date).toLocaleDateString('fr-FR')}) est désormais confirmé.
        </p>
      </div>
    </div>
  );
}
