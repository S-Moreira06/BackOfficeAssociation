/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    //await client.execute("DELETE FROM organisation;");
    await client.execute(`INSERT INTO organisation (name, address, zip, city, siret, type, contact, email, phone, max_meal, description, image, menu)
VALUES
    ('La Belle Table', '10 Rue des Oliviers', '75001', 'Paris', '12345678901234', 'Restaurant', 'Jean Dupont', 'contact@labelletable.com', '0102030405', 100, 'Restaurant gastronomique', 'image1.jpg', 'menu1.pdf'),
    ('Saveurs du Monde', '25 Avenue de la Liberté', '69002', 'Lyon', '23456789012345', 'Restaurant', 'Marie Curie', 'contact@saveursdumonde.com', '0601020304', 80, 'Cuisine internationale', 'image2.jpg', 'menu2.pdf'),
    ('Le Petit Creux', '5 Boulevard Haussmann', '13001', 'Marseille', '34567890123456', 'Restaurant', 'Paul Martin', 'contact@lepetitcreux.com', '0611223344', 50, 'Bistro français', 'image3.jpg', 'menu3.pdf'),
    ('Association Bon Repas', '12 Rue Lafayette', '44000', 'Nantes', '45678901234567', 'Association', 'Sophie Durant', 'contact@bonrepas.com', '0622334455', 200, 'Aide alimentaire', 'image4.jpg', 'menu4.pdf'),
    ('Délices Solidaires', '30 Place Bellecour', '31000', 'Toulouse', '56789012345678', 'Association', 'Michel Lefevre', 'contact@delicessolidaires.com', '0633445566', 150, 'Distribution de repas', 'image5.jpg', 'menu5.pdf'),
    ('Gourmet Express', '8 Rue de la Paix', '59000', 'Lille', '67890123456789', 'Restaurant', 'Claire Morel', 'contact@gourmetexpress.com', '0644556677', 120, 'Fast food premium', 'image6.jpg', 'menu6.pdf'),
    ('Le Repas Partagé', '18 Quai de la Seine', '35000', 'Rennes', '78901234567890', 'Association', 'Luc Bernard', 'contact@lerepaspartage.com', '0655667788', 180, 'Repas pour tous', 'image7.jpg', 'menu7.pdf'),
    ('Bistro du Coin', '22 Rue des Lilas', '38000', 'Grenoble', '89012345678901', 'Restaurant', 'Elodie Fontaine', 'contact@bistroducoin.com', '0666778899', 60, 'Cuisine traditionnelle', 'image8.jpg', 'menu8.pdf'),
    ('Solidarité Gourmande', '14 Rue du Marché', '67000', 'Strasbourg', '90123456789012', 'Association', 'Antoine Richard', 'contact@solidaritegourmande.com', '0677889900', 250, 'Aide aux sans-abris', 'image9.jpg', 'menu9.pdf'),
    ('Tentation Sucrée', '7 Rue du Délice', '33000', 'Bordeaux', '01234567890123', 'Restaurant', 'Valérie Perrot', 'contact@tentationsucree.com', '0688990011', 90, 'Pâtisserie artisanale', 'image10.jpg', 'menu10.pdf');`);
}