-- Type pour statut réservation
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'statut_reservation') THEN
        CREATE TYPE statut_reservation AS ENUM ('en_attente', 'validee', 'confirmee', 'annulee');
    END IF;
END$$;

-- Table : catégories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Table : matériels
CREATE TABLE materiels (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    categorie_id INT NOT NULL REFERENCES categories(id),
    prix_location NUMERIC(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255)
);

-- Table : packs
CREATE TABLE packs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    prix_total NUMERIC(10,2) NOT NULL
);

-- Table : composition d'un pack
CREATE TABLE pack_materiels (
    id SERIAL PRIMARY KEY,
    pack_id INT NOT NULL REFERENCES packs(id) ON DELETE CASCADE,
    materiel_id INT NOT NULL REFERENCES materiels(id) ON DELETE CASCADE,
    quantite INT NOT NULL DEFAULT 1
);

-- Table : clients
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : administrateurs
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : réservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    client_id INT NOT NULL REFERENCES clients(id),
    date_evenement DATE NOT NULL,
    heure_evenement TIME NOT NULL,
    duree_heure INT NOT NULL,
    lieu VARCHAR(255),
    statut statut_reservation DEFAULT 'en_attente',
    prix_estime NUMERIC(10,2),
    prix_final NUMERIC(10,2),
    calendar_event_id VARCHAR(255),
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : éléments réservés (matériel ou pack)
CREATE TABLE reservation_items (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    item_type VARCHAR(20) NOT NULL CHECK (item_type IN ('materiel', 'pack')),
    item_id INT NOT NULL,
    quantite INT NOT NULL,

    -- Clés étrangères dynamiques via triggers/validation applicative
    CONSTRAINT fk_materiel FOREIGN KEY (item_id) REFERENCES materiels(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fk_pack FOREIGN KEY (item_id) REFERENCES packs(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);


-- Nouvelle : historique des mouvements de stock
CREATE TABLE stock_transactions (
  id SERIAL PRIMARY KEY,
  materiel_id INT NOT NULL REFERENCES materiels(id),
  reservation_item_id INT,
  type VARCHAR(10) NOT NULL CHECK(type IN ('in','out','adjust')),
  quantite INT NOT NULL,
  date_trx TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table : paiements
CREATE TABLE paiements (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    montant NUMERIC(10,2) NOT NULL,
    moyen_paiement VARCHAR(50),
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : devis
CREATE TABLE devis (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    total_ht NUMERIC(10,2),
    tva NUMERIC(10,2),
    total_ttc NUMERIC(10,2),
    date_emission TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : factures
CREATE TABLE factures (
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    montant_total NUMERIC(10,2),
    date_facturation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
