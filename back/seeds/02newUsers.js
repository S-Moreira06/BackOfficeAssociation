/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM user;");
    await client.execute(`INSERT INTO user (firstname, lastname, email, password, address, zip, city, phone, role, verified)
    VALUES
        ('Jean', 'Dupont', 'jean.dupont@labelletable.com', '$2b$10$A1B2C3D4E5F6G7H8I9J0KLMNOPQRSTU', '10 Rue des Oliviers', '75001', 'Paris', '0601020304', 'restaurateur', true),
        ('Sophie', 'Martin', 'sophie.martin@legourmetparisien.fr', '$2b$10$B2C3D4E5F6G7H8I9J0KLMNOPQRSTU', '22 Avenue Montaigne', '75008', 'Paris', '0602030405', 'restaurateur', true),
        ('Paul', 'Bernard', 'paul.bernard@saveursdelyon.com', '$2b$10$C3D4E5F6G7H8I9J0KLMNOPQRSTU1V2', '5 Place Bellecour', '69002', 'Lyon', '0603040506', 'restaurateur', true),
        ('Isabelle', 'Lefevre', 'isabelle.lefevre@latablebordelaise.com', '$2b$10$D4E5F6G7H8I9J0KLMNOPQRSTU1V2W3', '10 Cours de l’Intendance', '33000', 'Bordeaux', '0604050607', 'restaurateur', true),
        ('Antoine', 'Moreau', 'antoine.moreau@ledeliceprovencal.fr', '$2b$10$E5F6G7H8I9J0KLMNOPQRSTU1V2W3X4', '8 Rue du Vieux Port', '13002', 'Marseille', '0605060708', 'restaurateur', true),
        ('Camille', 'Richard', 'camille.richard@lassiettegourmande.com', '$2b$10$F6G7H8I9J0KLMNOPQRSTU1V2W3X4Y5', '14 Rue du Marché', '67000', 'Strasbourg', '0606070809', 'restaurateur', true),
        ('Marcel', 'Dubois', 'marcel.dubois@chezmarcel.com', '$2b$10$G7H8I9J0KLMNOPQRSTU1V2W3X4Y5Z6', '7 Rue des Remparts', '31000', 'Toulouse', '0607080910', 'restaurateur', true),
        ('Emma', 'Fontaine', 'emma.fontaine@lepetitgourmet.fr', '$2b$10$H8I9J0KLMNOPQRSTU1V2W3X4Y5Z6A7', '25 Boulevard Saint-Michel', '75005', 'Paris', '0608091011', 'restaurateur', true),
        ('Lucas', 'Renault', 'lucas.renault@lesdelicesdenantes.com', '$2b$10$I9J0KLMNOPQRSTU1V2W3X4Y5Z6A7B8', '33 Rue des Lilas', '44000', 'Nantes', '0609101112', 'restaurateur', true),
        ('Nicolas', 'Caron', 'nicolas.caron@brasserieroyale.com', '$2b$10$J0KLMNOPQRSTU1V2W3X4Y5Z6A7B8C9', '12 Rue de la République', '75010', 'Paris', '0610111213', 'restaurateur', true),
        ('Alice', 'Lambert', 'alice.lambert@legoutduvoyage.com', '$2b$10$KLMNOPQRSTU1V2W3X4Y5Z6A7B8C9D0', '18 Rue du Globe', '69003', 'Lyon', '0611121314', 'restaurateur', true),
        ('Julien', 'Morel', 'julien.morel@lepicurien.com', '$2b$10$LMNOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1', '55 Avenue du Plaisir', '33000', 'Bordeaux', '0612131415', 'restaurateur', true),
        ('Céline', 'Bernard', 'celine.bernard@latabledesamis.com', '$2b$10$MNOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2', '2 Rue des Roses', '76000', 'Rouen', '0613141516', 'restaurateur', true),
        ('Sébastien', 'Lefevre', 'sebastien.lefevre@lefestin.com', '$2b$10$NOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3', '18 Place du Marché', '59000', 'Lille', '0614151617', 'restaurateur', true),
        ('Lucie', 'Moreau', 'lucie.moreau@bistrogourmand.com', '$2b$10$OPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4', '77 Rue de la Dégustation', '35000', 'Rennes', '0615161718', 'restaurateur', true),
        ('Philippe', 'Girard', 'philippe.girard@lessaveursdumonde.com', '$2b$10$PQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5', '9 Boulevard des Délices', '54000', 'Nancy', '0616171819', 'restaurateur', true),
        ('Céline', 'Dubois', 'celine.dubois@latelierdeschefs.com', '$2b$10$QRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6', '14 Rue de la Passion', '75014', 'Paris', '0617181920', 'restaurateur', true),
        ('Mathieu', 'Renault', 'mathieu.renault@lepalaisdessaveurs.com', '$2b$10$RSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7', '88 Avenue du Palais', '69008', 'Lyon', '0618192021', 'restaurateur', true),
        ('Élodie', 'Caron', 'elodie.caron@ungoutdailleurs.com', '$2b$10$STU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8', '10 Rue de l’Évasion', '13005', 'Marseille', '0620212223', 'restaurateur', true),
        ('Benoît', 'Richard', 'benoit.richard@tablesenfete.com', '$2b$10$TU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4I5J6K7L8M9', '31 Rue des Fêtes', '44000', 'Nantes', '0622232425', 'restaurateur', true),

        ('Antoine', 'Richard', 'antoine.richard@solidaritegourmande.com', '$2b$10$A1B2C3D4E5F6G7H8I9J0KLMNOPQRSTU', '14 Rue du Marché', '67000', 'Strasbourg', '0677889901', 'directeur association', true),
        ('Emma', 'Dubois', 'agent1@solidaritegourmande.com', '$2b$10$B2C3D4E5F6G7H8I9J0KLMNOPQRSTU1V2', '3 Rue de l’Espoir', '67000', 'Strasbourg', '0677889902', 'agent de reservation', true),

        ('Marie', 'Dupont', 'marie.dupont@saveurspartagees.org', '$2b$10$C3D4E5F6G7H8I9J0KLMNOPQRSTU1V2W3', '22 Avenue de la République', '75011', 'Paris', '0612345679', 'directeur association', true),
        ('Lucas', 'Bernard', 'agent2@saveurspartagees.org', '$2b$10$D4E5F6G7H8I9J0KLMNOPQRSTU1V2W3X4', '8 Rue des Fleurs', '75011', 'Paris', '0612345680', 'agent de reservation', true),

        ('Jean', 'Moulin', 'jean.moulin@lerepassolidaire.fr', '$2b$10$E5F6G7H8I9J0KLMNOPQRSTU1V2W3X4Y5', '5 Place Bellecour', '69002', 'Lyon', '0623456790', 'directeur association', true),
        ('Sophie', 'Lemoine', 'agent3@lerepassolidaire.fr', '$2b$10$F6G7H8I9J0KLMNOPQRSTU1V2W3X4Y5Z6', '9 Rue du Marché', '69002', 'Lyon', '0623456791', 'agent de reservation', true),

        ('Sophie', 'Martin', 'sophie.martin@cuisineducoeur.org', '$2b$10$G7H8I9J0KLMNOPQRSTU1V2W3X4Y5Z6A7', '10 Rue de la Paix', '75002', 'Paris', '0634567891', 'directeur association', true),
        ('Hugo', 'Dubois', 'agent4@cuisineducoeur.org', '$2b$10$H8I9J0KLMNOPQRSTU1V2W3X4Y5Z6A7B8', '6 Boulevard Saint-Germain', '75002', 'Paris', '0634567892', 'agent de reservation', true),

        ('Paul', 'Durand', 'paul.durand@lespetitsplats.com', '$2b$10$I9J0KLMNOPQRSTU1V2W3X4Y5Z6A7B8C9', '7 Rue des Lilas', '59000', 'Lille', '0645678902', 'directeur association', true),
        ('Alice', 'Moreau', 'agent5@lespetitsplats.com', '$2b$10$J0KLMNOPQRSTU1V2W3X4Y5Z6A7B8C9D0', '15 Rue du Moulin', '59000', 'Lille', '0645678903', 'agent de reservation', true),

        ('Emma', 'Lefevre', 'emma.lefevre@tableouverte.fr', '$2b$10$KLMNOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1', '25 Boulevard Saint-Michel', '75005', 'Paris', '0656789013', 'directeur association', true),
        ('Nicolas', 'Girard', 'agent6@tableouverte.fr', '$2b$10$LMNOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2', '4 Place de la Concorde', '75005', 'Paris', '0656789014', 'agent de reservation', true),

        ('Lucas', 'Moreau', 'lucas.moreau@partagesaveurs.net', '$2b$10$MNOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3', '33 Rue de l’Espoir', '44000', 'Nantes', '0667890124', 'directeur association', true),
        ('Isabelle', 'Renard', 'agent7@partagesaveurs.net', '$2b$10$NOPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H4', '12 Rue de la Marine', '44000', 'Nantes', '0667890125', 'agent de reservation', true),

        ('Isabelle', 'Laurent', 'isabelle.laurent@bonheurencuisine.org', '$2b$10$OPQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H5', '12 Rue du Bonheur', '31000', 'Toulouse', '0678901235', 'directeur association', true),
        ('Benoît', 'Dupont', 'agent8@bonheurencuisine.org', '$2b$10$PQRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H6I7', '6 Rue des Étoiles', '31000', 'Toulouse', '0678901236', 'agent de reservation', true),

        ('Nicolas', 'Bernard', 'nicolas.bernard@repasolidarite.fr', '$2b$10$QRSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H7I8', '8 Avenue des Champs', '13001', 'Marseille', '0689012346', 'directeur association', true),
        ('Julie', 'Fontaine', 'agent9@repasolidarite.fr', '$2b$10$RSTU1V2W3X4Y5Z6A7B8C9D0E1F2G3H8I9J0', '2 Rue des Palmiers', '13001', 'Marseille', '0689012347', 'agent de reservation', true),

        ('Camille', 'Robert', 'camille.robert@cuisineensemble.org', '$2b$10$STU1V2W3X4Y5Z6A7B8C9D0E1F2G3H9I0J1', '14 Rue du Partage', '67000', 'Strasbourg', '0690123457', 'directeur association', true),
        ('Damien', 'Marchal', 'agent10@cuisineensemble.org', '$2b$10$TU1V2W3X4Y5Z6A7B8C9D0E1F2G3H0I1J2K3', '18 Rue des Brasseurs', '67000', 'Strasbourg', '0690123458', 'agent de reservation', true),

        ('Julien', 'Lambert', 'julien.lambert@tousatable.com', '$2b$10$V2W3X4Y5Z6A7B8C9D0E1F2G3H1I2J3K4L5', '20 Rue du Miel', '69007', 'Lyon', '0601234568', 'directeur association', true),
('Claire', 'Deschamps', 'agent11@tousatable.com', '$2b$10$W3X4Y5Z6A7B8C9D0E1F2G3H1I2J3K4L6M7', '15 Rue de la Liberté', '69007', 'Lyon', '0601234569', 'agent de reservation', true),

('Alice', 'Fontaine', 'alice.fontaine@legoutdupartage.org', '$2b$10$X4Y5Z6A7B8C9D0E1F2G3H1I2J3K4L5M8N9', '55 Avenue de la Liberté', '33000', 'Bordeaux', '0612345679', 'directeur association', true),
('Paul', 'Charpentier', 'agent12@legoutdupartage.org', '$2b$10$Y5Z6A7B8C9D0E1F2G3H1I2J3K4L5M8N10', '8 Boulevard des Quais', '33000', 'Bordeaux', '0612345680', 'agent de reservation', true),

('Philippe', 'Dubois', 'philippe.dubois@donssaveurs.net', '$2b$10$Z6A7B8C9D0E1F2G3H1I2J3K4L5M8N9O1P2', '2 Rue des Roses', '76000', 'Rouen', '0623456790', 'directeur association', true),
('Marie', 'Lemoine', 'agent13@donssaveurs.net', '$2b$10$A7B8C9D0E1F2G3H1I2J3K4L5M8N9O2P3Q4', '5 Rue de la Mer', '76000', 'Rouen', '0623456791', 'agent de reservation', true),

('Sophie', 'Renault', 'sophie.renault@alabonnetable.fr', '$2b$10$B8C9D0E1F2G3H1I2J3K4L5M8N9O2P4Q5R6', '18 Place du Marché', '59000', 'Lille', '0634567893', 'directeur association', true),
('Marc', 'Girard', 'agent14@alabonnetable.fr', '$2b$10$C9D0E1F2G3H1I2J3K4L5M8N9O2P4Q5R7S8', '2 Rue des Martyrs', '59000', 'Lille', '0634567894', 'agent de reservation', true),

('Lucie', 'Morel', 'lucie.morel@cuisinepartagee.org', '$2b$10$D0E1F2G3H1I2J3K4L5M8N9O2P4Q5R6S9T0', '77 Rue de la Solidarité', '35000', 'Rennes', '0645678904', 'directeur association', true),
('Amandine', 'Perrot', 'agent15@cuisinepartagee.org', '$2b$10$E1F2G3H1I2J3K4L5M8N9O2P4Q5R6S9T0U1', '16 Rue des Champs', '35000', 'Rennes', '0645678905', 'agent de reservation', true),

('Marc', 'Lefebvre', 'marc.lefebvre@lestablesducoeur.org', '$2b$10$F2G3H1I2J3K4L5M8N9O2P4Q5R6S9T0U1V2', '9 Boulevard du Centre', '54000', 'Nancy', '0656789013', 'directeur association', true),
('Caroline', 'Blanc', 'agent16@lestablesducoeur.org', '$2b$10$G3H1I2J3K4L5M8N9O2P4Q5R6S9T0U1V3W4', '3 Rue des Alouettes', '54000', 'Nancy', '0656789014', 'agent de reservation', true),

('Céline', 'Girard', 'celine.girard@partageencuisine.com', '$2b$10$H1I2J3K4L5M8N9O2P4Q5R6S9T0U1V2W4X5', '14 Rue de la Fraternité', '75014', 'Paris', '0667890124', 'directeur association', true),
('Julien', 'Leclerc', 'agent17@partageencuisine.com', '$2b$10$I2J3K4L5M8N9O2P4Q5R6S9T0U1V2W4X6Y7', '12 Rue du Pont', '75014', 'Paris', '0667890125', 'agent de reservation', true),

('Mathieu', 'Caron', 'mathieu.caron@lacuisinesolidaire.org', '$2b$10$J3K4L5M8N9O2P4Q5R6S9T0U1V2W4X5Y7Z8', '88 Avenue des Amis', '69008', 'Lyon', '0678901235', 'directeur association', true),
('Claire', 'Lemoine', 'agent18@lacuisinesolidaire.org', '$2b$10$K4L5M8N9O2P4Q5R6S9T0U1V2W4X5Y7Z9A0', '7 Rue de l’Hôpital', '69008', 'Lyon', '0678901236', 'agent de reservation', true),

('Élodie', 'Dubreuil', 'elodie.dubreuil@unrepaspourtous.fr', '$2b$10$L5M8N9O2P4Q5R6S9T0U1V2W4X5Y7Z9A0B1', '10 Rue de la Joie', '13005', 'Marseille', '0689012346', 'directeur association', true),
('Vincent', 'Muller', 'agent19@unrepaspourtous.fr', '$2b$10$M8N9O2P4Q5R6S9T0U1V2W4X5Y7Z9A0B1C2', '13 Rue des Oliviers', '13005', 'Marseille', '0689012347', 'agent de reservation', true),

('Benoît', 'Richard', 'benoit.richard@tablessolidaires.org', '$2b$10$N9O2P4Q5R6S9T0U1V2W4X5Y7Z9A0B1C2D3', '31 Rue du Bon Cœur', '44000', 'Nantes', '0690123458', 'directeur association', true),
('Sophie', 'Benoit', 'agent20@tablessolidaires.org', '$2b$10$O2P4Q5R6S9T0U1V2W4X5Y7Z9A0B1C2D4E5', '22 Rue de la Forêt', '44000', 'Nantes', '0690123459', 'agent de reservation', true);

`
    );
}
