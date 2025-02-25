/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM request;");
    await client.execute(`INSERT INTO request (name, address, zip, city, type, firstname, lastname, email, phone)
VALUES
    ('Repas Solidaire', '15 Rue des Alouettes', '75010', 'Paris', 'Association', 'Julien', 'Bernard', 'contact@repas-solidaire.com', '0701020304'),
    ('Gourmandise Express', '40 Avenue des Champs', '69007', 'Lyon', 'Restaurant', 'Camille', 'Dupont', 'contact@gourmandise.com', '0702030405'),
    ('Au Bon Plat', '5 Rue du Commerce', '13005', 'Marseille', 'Restaurant', 'Louis', 'Lefebvre', 'contact@aubonplat.com', '0703040506'),
    ('Solidarité Repas', '18 Rue Pasteur', '44010', 'Nantes', 'Association', 'Sophie', 'Moreau', 'contact@solidariterepas.com', '0704050607'),
    ('Délices Partagés', '22 Avenue du Soleil', '31050', 'Toulouse', 'Association', 'Michel', 'Dubois', 'contact@delicespartages.com', '0705060708'),
    ('La Fourchette Dorée', '8 Rue des Gourmets', '59020', 'Lille', 'Restaurant', 'Claire', 'Fontaine', 'contact@fourchettedoree.com', '0706070809'),
    ('Les Paniers du Coeur', '35 Quai de la Loire', '35080', 'Rennes',  'Association', 'Luc', 'Richard', 'contact@paniersducoeur.com', '0707080910'),
    ('Bistro des Amis', '42 Rue des Fleurs', '38070', 'Grenoble',  'Restaurant', 'Elodie', 'Lambert', 'contact@bistroamis.com', '0708091011'),
    ('Table du Partage', '29 Rue du Marché', '67020', 'Strasbourg', 'Association', 'Antoine', 'Girard', 'contact@tabledupartage.com', '0709101112'),
    ('Sucré Salé', '17 Rue du Délice', '33040', 'Bordeaux', 'Restaurant', 'Valérie', 'Morel', 'contact@sucre-sale.com', '0710111213');`);
}