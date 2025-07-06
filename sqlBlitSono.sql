-- Table : catégories 
CREATE TABLE catégories ( 
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(100) NOT NULL 
    ); 

-- Table : matériels 
CREATE TABLE matériels ( 
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(150) NOT NULL, 
    description TEXT, 
    catégorie_id INT NOT NULL, 
    prix_location NUMERIC(10,2) NOT NULL, 
    stock INT DEFAULT 0, 
    image_url VARCHAR(255), 
    FOREIGN KEY (catégorie_id) REFERENCES catégories(id) 
    ); 

-- Table : packs 
CREATE TABLE packs ( 
    id SERIAL PRIMARY KEY, 
    nom VARCHAR(150) NOT NULL, 
    description TEXT, 
    prix_total NUMERIC(10,2) NOT NULL 
    ); 

-- Table : pack_materiels 
CREATE TABLE pack_materiels (
    id SERIAL PRIMARY KEY, 
    pack_id INT NOT NULL, 
    materiel_id INT NOT NULL, 
    quantite INT NOT NULL DEFAULT 1, 
    FOREIGN KEY (pack_id) REFERENCES packs(id) ON DELETE CASCADE, 
    FOREIGN KEY (materiel_id) REFERENCES materiels(id) ON DELETE CASCADE 
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

-- Table : admins 
CREATE TABLE admins ( 
    ID SERIAL PRIMARY KEY, 
    nom VARCHAR(100) NOT NULL, 
    prenom VARCHAR(100) NOT NULL, 
    email VARCHAR(150) UNIQUE NOT NULL, 
    mot_de_passe VARCHAR(255) NOT NULL, 
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ); 

-- Type d'énumération pour le statut de réservation DO 
$$ BEGIN IF NOT EXISTS 
    (SELECT 1 FROM pg_type WHERE typname = 'statut_reservation') 
    THEN CREATE TYPE statut_reservation AS ENUM('en_attente', 'validee', 'confirmee', 'annulee'); 
    END IF; END$$; 

-- Table : réservations 
CREATE TABLE réservations ( 
    id SERIAL PRIMARY KEY, 
    client_id INT NOT NULL, 
    date_evenement DATE NOT NULL,
    heure_evenement TIME NOT NULL, 
    duree_heure INT NOT NULL, 
    lieu VARCHAR(255), s
    tatut statut_reservation DEFAULT 'en_attente', 
    prix_estime NUMERIC(10,2), 
    prix_final NUMERIC(10,2), 
    calendar_event_id VARCHAR(255), 
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (client_id) REFERENCES clients(id) 
    ); 

-- Table : reservation_materiels 
CREATE TABLE reservation_materiels ( 
    id CLÉ PRIMAIRE SÉRIE, 
    reservation_id INT NON NULL, 
    materiel_id INT NON NULL, 
    quantite INT NON NULL, 
    CLÉ ÉTRANGÈRE (reservation_id) RÉFÉRENCES reservations(id) SUR SUPPRESSION CASCADE, 
    CLÉ ÉTRANGÈRE (materiel_id) RÉFÉRENCES materiels(id) SUR SUPPRESSION CASCADE 
    ); 

-- Table : reservation_packs 
CREATE TABLE reservation_packs ( 
    id CLÉ PRIMAIRE SÉRIE, 
    reservation_id INT NON NULL, 
    pack_id INT NON NULL, 
    quantite INT NON NULL, 
    CLÉ ÉTRANGÈRE (reservation_id) RÉFÉRENCES reservations(id) SUR SUPPRESSION CASCADE, 
    CLÉ ÉTRANGÈRE (pack_id) RÉFÉRENCES packs(id) SUR SUPPRESSION CASCADE 
    ); 

-- Table : paiements 
CREATE TABLE paiements ( 
    id SERIAL PRIMARY KEY,
    reservation_id INT NOT NULL, 
    montant NUMERIC(10,2) NOT NULL, 
    moyen_paiement VARCHAR(50), 
    date_paiement TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) 
    ); 

-- Table: devis 
CREATE TABLE devis (
    id SERIAL PRIMARY KEY, 
    reservation_id INT NOT NULL, 
    total_ht NUMERIC, tva NUMERIC, 
    total_ttc NUMERIC, 
    date_emission TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) 
    ); 

-- Table : facts 
CREATE TABLE factures ( 
    id SERIAL PRIMARY KEY, 
    reservation_id INT NOT NULL, 
    montant_total NUMERIC, 
    date_facturation TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) 
    ); 

-- na manao colonne roa pack_id ou material_id nullable soit id rayon de référence am pack na materiel