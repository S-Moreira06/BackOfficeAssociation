/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM organization;");
    await client.execute(`INSERT INTO organization (name, address, zip, city, siret, category, contact, email, phone, max_meal, description, image, menu)
VALUES
    ('La Belle Table', '10 Rue des Oliviers', '75001', 'Paris', '12345678901234', 'restaurant', 'Jean Dupont', 'contact@labelletable.com', '0102030405', 100, 'Restaurant gastronomique', 'image1.jpg', 'menu1.pdf'),
    ('Le Gourmet Parisien', '22 Avenue Montaigne', '75008', 'Paris', '12345678901235', 'restaurant', 'Sophie Martin', 'contact@legourmetparisien.fr', '0103040506', 120, 'Cuisine raffinée', 'image2.jpg', 'menu2.pdf'),
    ('Saveurs de Lyon', '5 Place Bellecour', '69002', 'Lyon', '12345678901236', 'restaurant', 'Paul Bernard', 'contact@saveursdelyon.com', '0105060708', 90, 'Spécialités lyonnaises', 'image3.jpg', 'menu3.pdf'),
    ('La Table Bordelaise', '10 Cours de l’Intendance', '33000', 'Bordeaux', '12345678901237', 'restaurant', 'Isabelle Lefevre', 'contact@latablebordelaise.com', '0107080910', 110, 'Cuisine du terroir', 'image4.jpg', 'menu4.pdf'),
    ('Le Délice Provençal', '8 Rue du Vieux Port', '13002', 'Marseille', '12345678901238', 'restaurant', 'Antoine Moreau', 'contact@ledeliceprovencal.fr', '0108091011', 85, 'Saveurs du Sud', 'image5.jpg', 'menu5.pdf'),
    ('L’Assiette Gourmande', '14 Rue du Marché', '67000', 'Strasbourg', '12345678901239', 'restaurant', 'Camille Richard', 'contact@lassiettegourmande.com', '0110111213', 130, 'Gastronomie locale', 'image6.jpg', 'menu6.pdf'),
    ('Chez Marcel', '7 Rue des Remparts', '31000', 'Toulouse', '12345678901240', 'restaurant', 'Marcel Dubois', 'contact@chezmarcel.com', '0112131415', 95, 'Bistrot français', 'image7.jpg', 'menu7.pdf'),
    ('Le Petit Gourmet', '25 Boulevard Saint-Michel', '75005', 'Paris', '12345678901241', 'restaurant', 'Emma Fontaine', 'contact@lepetitgourmet.fr', '0114151617', 100, 'Cuisine traditionnelle', 'image8.jpg', 'menu8.pdf'),
    ('Les Délices de Nantes', '33 Rue des Lilas', '44000', 'Nantes', '12345678901242', 'restaurant', 'Lucas Renault', 'contact@lesdelicesdenantes.com', '0116171819', 105, 'Saveurs de la mer', 'image9.jpg', 'menu9.pdf'),
    ('La Brasserie Royale', '12 Rue de la République', '75010', 'Paris', '12345678901243', 'restaurant', 'Nicolas Caron', 'contact@brasserieroyale.com', '0118192021', 140, 'Brasserie haut de gamme', 'image10.jpg', 'menu10.pdf'),
    ('Le Goût du Voyage', '18 Rue du Globe', '69003', 'Lyon', '12345678901244', 'restaurant', 'Alice Lambert', 'contact@legoutduvoyage.com', '0120212223', 110, 'Cuisine du monde', 'image11.jpg', 'menu11.pdf'),
    ('L’Épicurien', '55 Avenue du Plaisir', '33000', 'Bordeaux', '12345678901245', 'restaurant', 'Julien Morel', 'contact@lepicurien.com', '0122232425', 150, 'Dégustation et vin', 'image12.jpg', 'menu12.pdf'),
    ('La Table des Amis', '2 Rue des Roses', '76000', 'Rouen', '12345678901246', 'restaurant', 'Céline Bernard', 'contact@latabledesamis.com', '0124252627', 95, 'Ambiance conviviale', 'image13.jpg', 'menu13.pdf'),
    ('Le Festin', '18 Place du Marché', '59000', 'Lille', '12345678901247', 'restaurant', 'Sébastien Lefevre', 'contact@lefestin.com', '0126272829', 120, 'Expérience culinaire', 'image14.jpg', 'menu14.pdf'),
    ('Bistro Gourmand', '77 Rue de la Dégustation', '35000', 'Rennes', '12345678901248', 'restaurant', 'Lucie Moreau', 'contact@bistrogourmand.com', '0128293031', 80, 'Cuisine bistro', 'image15.jpg', 'menu15.pdf'),
    ('Les Saveurs du Monde', '9 Boulevard des Délices', '54000', 'Nancy', '12345678901249', 'restaurant', 'Philippe Girard', 'contact@lessaveursdumonde.com', '0130313233', 135, 'Fusion et innovation', 'image16.jpg', 'menu16.pdf'),
    ('L’Atelier des Chefs', '14 Rue de la Passion', '75014', 'Paris', '12345678901250', 'restaurant', 'Céline Dubois', 'contact@latelierdeschefs.com', '0132333435', 145, 'Atelier culinaire', 'image17.jpg', 'menu17.pdf'),
    ('Le Palais des Saveurs', '88 Avenue du Palais', '69008', 'Lyon', '12345678901251', 'restaurant', 'Mathieu Renault', 'contact@lepalaisdessaveurs.com', '0134353637', 160, 'Haut standing', 'image18.jpg', 'menu18.pdf'),
    ('Un Goût d’Ailleurs', '10 Rue de l’Évasion', '13005', 'Marseille', '12345678901252', 'restaurant', 'Élodie Caron', 'contact@ungoutdailleurs.com', '0136373839', 125, 'Cuisine exotique', 'image19.jpg', 'menu19.pdf'),
    ('Tables en Fête', '31 Rue des Fêtes', '44000', 'Nantes', '12345678901253', 'restaurant', 'Benoît Richard', 'contact@tablesenfete.com', '0138394041', 115, 'Gastronomie festive', 'image20.jpg', 'menu20.pdf'),
    
    ('Solidarité Gourmande', '14 Rue du Marché', '67000', 'Strasbourg', '90123456789012', 'association', 'Antoine Richard', 'contact@solidaritegourmande.com', '0677889900', 250, 'Aide aux sans-abris', 'image9.jpg', 'menu9.pdf'),
    ('Saveurs Partagées', '22 Avenue de la République', '75011', 'Paris', '90123456789013', 'association', 'Marie Dupont', 'contact@saveurspartagees.org', '0612345678', 300, 'Distribution alimentaire', 'image10.jpg', 'menu10.pdf'),
    ('Le Repas Solidaire', '5 Place Bellecour', '69002', 'Lyon', '90123456789014', 'association', 'Jean Moulin', 'contact@lerepassolidaire.fr', '0623456789', 200, 'Repas pour les démunis', 'image11.jpg', 'menu11.pdf'),
    ('Cuisine du Cœur', '10 Rue de la Paix', '75002', 'Paris', '90123456789015', 'association', 'Sophie Martin', 'contact@cuisineducoeur.org', '0634567890', 150, 'Soutien aux familles', 'image12.jpg', 'menu12.pdf'),
    ('Les Petits Plats', '7 Rue des Lilas', '59000', 'Lille', '90123456789016', 'association', 'Paul Durand', 'contact@lespetitsplats.com', '0645678901', 180, 'Cantine solidaire', 'image13.jpg', 'menu13.pdf'),
    ('Table Ouverte', '25 Boulevard Saint-Michel', '75005', 'Paris', '90123456789017', 'association', 'Emma Lefevre', 'contact@tableouverte.fr', '0656789012', 220, 'Aide alimentaire', 'image14.jpg', 'menu14.pdf'),
    ('Partage & Saveurs', '33 Rue de l’Espoir', '44000', 'Nantes', '90123456789018', 'association', 'Lucas Moreau', 'contact@partagesaveurs.net', '0667890123', 275, 'Solidarité alimentaire', 'image15.jpg', 'menu15.pdf'),
    ('Bonheur en Cuisine', '12 Rue du Bonheur', '31000', 'Toulouse', '90123456789019', 'association', 'Isabelle Laurent', 'contact@bonheurencuisine.org', '0678901234', 190, 'Ateliers cuisine', 'image16.jpg', 'menu16.pdf'),
    ('Repas & Solidarité', '8 Avenue des Champs', '13001', 'Marseille', '90123456789020', 'association', 'Nicolas Bernard', 'contact@repasolidarite.fr', '0689012345', 210, 'Aide aux sans-abris', 'image17.jpg', 'menu17.pdf'),
    ('Cuisine Ensemble', '14 Rue du Partage', '67000', 'Strasbourg', '90123456789021', 'association', 'Camille Robert', 'contact@cuisineensemble.org', '0690123456', 260, 'Cuisine participative', 'image18.jpg', 'menu18.pdf'),
    ('Tous à Table', '20 Rue du Miel', '69007', 'Lyon', '90123456789022', 'association', 'Julien Lambert', 'contact@tousatable.com', '0601234567', 300, 'Dîner solidaire', 'image19.jpg', 'menu19.pdf'),
    ('Le Goût du Partage', '55 Avenue de la Liberté', '33000', 'Bordeaux', '90123456789023', 'association', 'Alice Fontaine', 'contact@legoutdupartage.org', '0612345678', 225, 'Aide alimentaire', 'image20.jpg', 'menu20.pdf'),
    ('Dons & Saveurs', '2 Rue des Roses', '76000', 'Rouen', '90123456789024', 'association', 'Philippe Dubois', 'contact@donssaveurs.net', '0623456789', 240, 'Cantine pour tous', 'image21.jpg', 'menu21.pdf'),
    ('À la Bonne Table', '18 Place du Marché', '59000', 'Lille', '90123456789025', 'association', 'Sophie Renault', 'contact@alabonnetable.fr', '0634567890', 195, 'Distribution de repas', 'image22.jpg', 'menu22.pdf'),
    ('Cuisine Partagée', '77 Rue de la Solidarité', '35000', 'Rennes', '90123456789026', 'association', 'Lucie Morel', 'contact@cuisinepartagee.org', '0645678901', 280, 'Soutien aux démunis', 'image23.jpg', 'menu23.pdf'),
    ('Les Tables du Cœur', '9 Boulevard du Centre', '54000', 'Nancy', '90123456789027', 'association', 'Marc Lefebvre', 'contact@lestablesducoeur.org', '0656789012', 215, 'Aide alimentaire', 'image24.jpg', 'menu24.pdf'),
    ('Partage en Cuisine', '14 Rue de la Fraternité', '75014', 'Paris', '90123456789028', 'association', 'Céline Girard', 'contact@partageencuisine.com', '0667890123', 270, 'Cuisine solidaire', 'image25.jpg', 'menu25.pdf'),
    ('La Cuisine Solidaire', '88 Avenue des Amis', '69008', 'Lyon', '90123456789029', 'association', 'Mathieu Caron', 'contact@lacuisinesolidaire.org', '0678901234', 200, 'Aide aux sans-abris', 'image26.jpg', 'menu26.pdf'),
    ('Un Repas pour Tous', '10 Rue de la Joie', '13005', 'Marseille', '90123456789030', 'association', 'Élodie Dubreuil', 'contact@unrepaspourtous.fr', '0689012345', 230, 'Repas gratuits', 'image27.jpg', 'menu27.pdf'),
    ('Tables Solidaires', '31 Rue du Bon Cœur', '44000', 'Nantes', '90123456789031', 'association', 'Benoît Richard', 'contact@tablessolidaires.org', '0690123456', 255, 'Aide alimentaire', 'image28.jpg', 'menu28.pdf');

    `)
}