CREATE DATABASE IF NOT EXISTS associations_missions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE associations_missions;

CREATE TABLE IF NOT EXISTS Utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('Bénévoles', 'Associations'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Missions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    FOREIGN KEY(utilisateur_id) REFERENCES Utilisateurs(id),
    titre VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('A venir', 'En cours', 'Fini'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Candidatures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    FOREIGN KEY(utilisateur_id) REFERENCES Utilisateurs(id),
    mission_id INT NOT NULL,
    FOREIGN KEY(mission_id) REFERENCES Missions(id),
    status ENUM('En attente', 'Acceptée', 'Refusée') DEFAULT 'En attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO Utilisateurs (nom, email, password, role) VALUES
('Association Ecolo', 'ecolo@example.com', '123456', 'Associations'),
('Association Solidaire', 'solidaire@example.com', '56987', 'Associations'),
('Jean Dupont', 'jean.dupont@example.com', 'blabla', 'Bénévoles'),
('Marie Dubois', 'marie.dubois@example.com', 'piou45', 'Bénévoles');


INSERT INTO Missions (utilisateur_id, titre, description, status) VALUES
(1, 'Nettoyage de forêt', 'Aide au nettoyage d''une forêt locale. Matériel fourni.', 'A venir'),
(2, 'Distribution de repas', 'Distribution de repas chauds aux personnes sans-abri.', 'En cours'),
(1, 'Plantation d''arbres', 'Mission de reboisement pour un parc urbain.', 'A venir');


INSERT INTO Candidatures (utilisateur_id, mission_id, status) VALUES
(3, 1, 'En attente'),
(4, 2, 'Acceptée'),
(4, 1, 'Refusée');