import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCartStore } from "~/stores/useCartStore";

export default function Basket() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [dayNight, setDayNight] = useState<"jour" | "nuit">("jour");
  const [paymentType, setPaymentType] = useState<"complet" | "partiel">("complet");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated] = useState(false);

  const validate = () => {
    const errs: Record<string,string> = {};
    if (!eventDate) errs.eventDate = "Veuillez choisir une date.";
    if (!eventTime) errs.eventTime = "Veuillez sélectionner une heure.";
    if (!location.trim()) errs.location = "Veuillez indiquer un lieu.";
    if (!duration || duration < 1) errs.duration = "Durée invalide.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!isAuthenticated) {
      alert("Veuillez vous connecter ou créer un compte avant d'envoyer la demande.");
      return;
    }
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    const payload = { items, eventDate, eventTime, location, duration, dayNight, paymentType };
    console.log("Payload:", payload);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Demande envoyée !");
    }, 1000);
  };

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-[#18769C]">Votre panier</h1>
      {items.length === 0 ? (
        <>
          <div className="bg-white border border-[#18769C] rounded-lg p-8 text-center">
            <p>Votre panier est vide.</p>
            <img
              src="/shopping.jpeg"
              alt="Panier vide"
              className="w-48 mx-auto transform -rotate-180 hover:rotate-0 transition"
            />
          </div>

          <div className="w-full flex flex-col md:flex-row gap-12 justify-center">
            {[
              {
                title: "Vous aviez ajouté des articles à votre panier ?",
                text: "Connectez-vous pour les retrouver et finaliser votre commande.",
                buttonText: "Je me connecte",
                link: "/sign-in",
                action: "sign-in",
              },
              {
                title: "Vous n’avez pas encore de compte ?",
                subtitle: "Inscrivez-vous !",
                text: "Sauvegardez votre panier et recevez nos promos.",
                buttonText: "Je crée mon compte",
                link: "/sign-up",
                action: "sign-up",
              },
            ].map(({ title, subtitle, text, buttonText, link, action }) => (
              <div
                key={action}
                className="flex-1 flex flex-col items-center text-center gap-4"
              >
                <h2 className="font-semibold text-lg">{title}</h2>
                {subtitle && (
                  <h3 className="font-semibold text-md">{subtitle}</h3>
                )}
                <p className="max-w-md text-start">{text}</p>
                <Link to={link}>
                  <button
                    onClick={() => handleClick(action)}
                    className="w-64 p-3 rounded bg-gradient-to-r from-[#18769C]/20 to-[#18769C] text-white hover:from-[#18769C] hover:to-[#18769C]/20 transition"
                  >
                      {buttonText}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 flex flex-col gap-6">
            <div className="flex flex-row gap-4 flex-wrap items-center">
            <div>
              <label>Date de l'événement</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full border p-2 rounded border-[#18769C]/50 outline-[#18769C]"
              />
              {errors.eventDate && (
                <p className="text-red-500 text-sm">{errors.eventDate}</p>
              )}
            </div>
            <div>
              <label>Heure de début</label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="w-full border p-2 rounded border-[#18769C]/50 outline-[#18769C]"
              />
              {errors.eventTime && (
                <p className="text-red-500 text-sm">{errors.eventTime}</p>
              )}
            </div>
            <div>
              <label>Lieu</label>
              <input
                type="text"
                value={location}
                placeholder="Indiquez le lieu de l'événement"
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border p-2 rounded
                border-[#18769C]/50 outline-[#18769C]"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>
            <div>
              <label>Durée (heures)</label>
              <input
                type="number"
                placeholder="Durée en heures"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min={1}
                className="w-full border p-2 rounded
              border-[#18769C]/50 outline-[#18769C]" />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>
            <div>
              <p>Jour ou nuit ?</p>
              <label>
                <input
                  type="radio"
                  name="dayNight"
                  checked={dayNight === "jour"}
                  className="border-[#18769C]/50 outline-[#18769C]"
                  onChange={() => setDayNight("jour")}
                />{" "}
                Jour
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="dayNight"
                  checked={dayNight === "nuit"}
                  className="border-[#18769C]/50 outline-[#18769C]"
                  onChange={() => setDayNight("nuit")}
                />{" "}
                Nuit
              </label>
            </div>
            <div>
              <p>Paiement :</p>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentType === "complet"}
                  className="border-[#18769C]/50 outline-[#18769C]"
                  onChange={() => setPaymentType("complet")}
                />{" "}
                Complet
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentType === "partiel"}
                  className="border-[#18769C]/50 outline-[#18769C]"
                  onChange={() => setPaymentType("partiel")}
                />{" "}
                Partiel
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-4 border-b border-[#18769C]/50">
                <div className="flex items-center space-x-4">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">Prix : {item.price} Ar</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">–</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, +1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <span>{(item.price * item.quantity).toFixed(2)} Ar</span>
                <button type="button" onClick={() => remove(item.id)} className="p-1 text-red-600 hover:text-red-800">
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
            <div className="text-right font-bold text-xl">Total : {total} Ar</div>
          </div>
          <button type="submit" disabled={isSubmitting} className="p-2 rounded hover:bg-gradient-to-l hover:from-[#18769C] hover:to-[#18769C]/20 bg-gradient-to-r from-[#18769C] to-[#18769C]/20 text-xl text-white">
            {isSubmitting ? "Envoi…" : "Envoyer la demande"}
          </button>
        </form>
      )}
    </div>
  );
}
