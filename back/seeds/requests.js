/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM request;");
    await client.execute(`INSERT INTO request (name, address, zip, city, siret, type, contact, email, phone, max_meal, description, image, menu)
VALUES
    ('Repas Solidaire', '15 Rue des Alouettes', '75010', 'Paris', '12345098765432', 'Association', 'Julien Bernard', 'contact@repas-solidaire.com', '0701020304', 120, 'Distribution alimentaire', 'image1.jpg', 'menu1.pdf'),
    ('Gourmandise Express', '40 Avenue des Champs', '69007', 'Lyon', '23456098765432', 'Restaurant', 'Camille Dupont', 'contact@gourmandise.com', '0702030405', 80, 'Cuisine rapide et bio', 'image2.jpg', 'menu2.pdf'),
    ('Au Bon Plat', '5 Rue du Commerce', '13005', 'Marseille', '34567098765432', 'Restaurant', 'Louis Lefebvre', 'contact@aubonplat.com', '0703040506', 60, 'Cuisine du terroir', 'image3.jpg', 'menu3.pdf'),
    ('Solidarité Repas', '18 Rue Pasteur', '44010', 'Nantes', '45678098765432', 'Association', 'Sophie Moreau', 'contact@solidariterepas.com', '0704050607', 200, 'Aide alimentaire pour les démunis', 'image4.jpg', 'menu4.pdf'),
    ('Délices Partagés', '22 Avenue du Soleil', '31050', 'Toulouse', '56789098765432', 'Association', 'Michel Dubois', 'contact@delicespartages.com', '0705060708', 150, 'Service de repas pour tous', 'image5.jpg', 'menu5.pdf'),
    ('La Fourchette Dorée', '8 Rue des Gourmets', '59020', 'Lille', '67890198765432', 'Restaurant', 'Claire Fontaine', 'contact@fourchettedoree.com', '0706070809', 90, 'Cuisine raffinée', 'image6.jpg', 'menu6.pdf'),
    ('Les Paniers du Coeur', '35 Quai de la Loire', '35080', 'Rennes', '78901298765432', 'Association', 'Luc Richard', 'contact@paniersducoeur.com', '0707080910', 180, 'Aide alimentaire locale', 'image7.jpg', 'menu7.pdf'),
    ('Bistro des Amis', '42 Rue des Fleurs', '38070', 'Grenoble', '89012398765432', 'Restaurant', 'Elodie Lambert', 'contact@bistroamis.com', '0708091011', 75, 'Cuisine maison', 'image8.jpg', 'menu8.pdf'),
    ('Table du Partage', '29 Rue du Marché', '67020', 'Strasbourg', '90123498765432', 'Association', 'Antoine Girard', 'contact@tabledupartage.com', '0709101112', 220, 'Repas gratuits pour les sans-abris', 'image9.jpg', 'menu9.pdf'),
    ('Sucré Salé', '17 Rue du Délice', '33040', 'Bordeaux', '01234598765432', 'Restaurant', 'Valérie Morel', 'contact@sucre-sale.com', '0710111213', 100, 'Spécialités sucrées et salées', 'image10.jpg', 'menu10.pdf');`);
}