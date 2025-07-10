import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaPhone,
  FaHeadphones,
  FaCalendarAlt,
  FaThumbsUp,
} from "react-icons/fa";

type Reservation = {
  id: string;
  date: string;
  materiel: string[];
  lieu: string;
  statut: "En attente" | "Confirmée";
};

const mockData: Reservation[] = [
  {
    id: "1",
    date: "2025-08-14",
    materiel: [
      "Pack DJ + Éclairage",
      "Deejay",
      "Enceinte",
      "Projecteur",
      "Micros",
      "Câbles",
      "Table de mixage",
    ],
    lieu: "Paris",
    statut: "En attente",
  },
  {
    id: "2",
    date: "2025-09-05",
    materiel: ["Pack Sono + Micro"],
    lieu: "Lyon",
    statut: "Confirmée",
  },
];

export default function EspaceClient(): JSX.Element {
  const joinAndTruncate = (items: string[]) => {
    const joined = items.join(", ");
    const words = joined.split(" ");
    return words.length > 15 ? words.slice(0, 15).join(" ") + "…" : joined;
  };

  const getReservationIcon = (statut: string) => {
    if (statut === "Confirmée") return <FaCalendarCheck color="green" />;
    if (statut === "En attente") return <FaCalendarAlt color="#f59e0b" />;
    return <FaCalendarAlt />;
  };

  const hasReservations = mockData.length > 0;

  return (
    <div className="text-[#575756]">
      <section className="bgImageReservation">
        <div
          className="bg-gradient-to-r from-[#1E2939]/85 via-[#1E2939]/65 to-[#1E2939]
         text-white py-10 w-full flex flex-col pl-30"
        >
          <h1 className="text-3xl font-extrabold mb-4 flex gap-1 w-[800px] items-center">
            <FaCalendarCheck className="text-7xl text-[#18769C]" />
            Mes Réservations
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Avec BlitSono, réservez simplement le matériel qu'il vous faut en
            quelques clics ! Découvrez nos packs professionnels adaptés à tous
            types d'événements, du matériel audio et lumière fiable et de
            qualité - garantissant une installation rapide et un accompagnement
            expert. Votre événement mérite le meilleur, réservez avec confiance.
          </p>
          <div className="space-x-4">
            <Link
              to="/catalogues"
              className="inline-flex items-center gap-2 bg-white text-[#18769C] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              <FaHeadphones /> Explorer notre catalogue
            </Link>
            <Link
              to="#"
              className="inline-flex items-center gap-2 bg-[#145e7a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a63] transition"
            >
              <FaPhone /> Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <div className="p-6">
        {!hasReservations ? (
          <div className="text-center py-20">
            <FaCalendarAlt size={48} className="mx-auto text-[#18769C] mb-4" />
            <h2 className="text-2xl font-bold mb-2">Oh non !</h2>
            <p className="text-lg">
              Malheureusement, vous n'avez pas encore effectué de réservation.
              Qu'attendez-vous ? Parcourez notre catalogue et réservez votre
              matériel dès maintenant !
            </p>
            <Link
              to="/catalogues"
              className="mt-4 inline-block px-6 py-3 bg-[#18769C] text-white rounded hover:bg-[#0f5a70]"
            >
              Explorer le catalogue
            </Link>
          </div>
        ) : (
          <table className="w-full table-auto bg-white rounded shadow ">
            <thead className="bg-gray-100">
              <tr>
                {["Date", "Matériel", "Lieu", "Statut", "Actions"].map((h) => (
                  <th key={h} className="p-3 text-center text-xl">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockData.map((r) => (
                <tr key={r.id} className="even:bg-gray-50 text-center">
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">{joinAndTruncate(r.materiel)}</td>
                  <td className="p-3">{r.lieu}</td>
                  <td className="p-3 font-semibold flex items-center justify-center space-x-2">
                    {getReservationIcon(r.statut)}
                    <span>{r.statut}</span>
                  </td>
                  <td className="p-3 space-x-2">
                    <Link
                      to={`/devis/${r.id}`}
                      className="px-3 py-1 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                    >
                      Voir Devis
                    </Link>
                    <Link
                      to={`/facture/${r.id}`}
                      className="px-3 py-1 text-white rounded bg-[#18769C] hover:bg-[#0f5a70]"
                    >
                      Voir Facture
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {hasReservations && (
        <div className="text-[#18769C] py-10 w-full flex flex-col pr-30 items-end">
          <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-1 w-[500px]">
            <FaThumbsUp size={24} /> Merci d'avoir choisi BlitSono !
          </h1>
          <p className="w-[500px] text-lg italic mb-6 text-start flex items-center border-l-4 border-[#18769C] pl-4">
            Nous sommes ravis de vous accompagner dans la réussite de votre
            événement avec du matériel audio et lumière professionnel, fiable et
            de qualité. En réservant chez nous, vous bénéficiez d'une
            installation rapide, d'un service expert et d'une tranquillité
            d'esprit totale. À bientôt !
          </p>
        </div>
      )}
    </div>
  );
}
