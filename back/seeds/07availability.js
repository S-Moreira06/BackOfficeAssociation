/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute('DELETE FROM availability;');
    await client.execute(`INSERT INTO availability (restaurant_id, date, time_start, time_end, deadline_accept,
                                                    on_site, take_away, max_people, price, commentary)
                          VALUES 
                        (1, '2025-02-06', '12:00:00', '14:00:00', '12 heures', 50, 20, 80, 35,'100% vegan - Menu sans produits origine animale'),
                        (2, '2025-02-07', '13:30:00', '15:30:00', '6 heures', 30, 10, 50, 25, 'Halal - Tous les plats respectent les normes halal'),
                        (3, '2025-02-08', '11:00:00', '13:00:00', '24 heures', 60, 25, 100, 40, 'Circuit court - Produits locaux et de saison'),
                        (4, '2025-02-09', '14:00:00', '16:00:00', '18 heures', 45, 15, 75, 30, '100% bio - Tous les ingrédients sont certifiés bio'),
                        (5, '2025-02-10', '12:00:00', '14:00:00', '12 heures', 70, 35, 90, 45, 'Hallal - Menu conforme aux normes hallal'),
                        (6, '2025-02-11', '16:00:00', '18:00:00', '8 heures', 50, 20, 80, 35, 'Menu végétarien - Pas de viande ni de poisson'),
                        (7, '2025-02-12', '11:30:00', '13:30:00', '6 heures', 40, 10, 60, 20, 'Circuit court - Ingrédients provenant de fermes locales'),
                        (8, '2025-02-13', '14:30:00', '16:30:00', '24 heures', 55, 30, 85, 38, '100% vegan - Plat végétalien sans lactose ni gluten'),
                        (9, '2025-02-14', '12:15:00', '14:15:00', '12 heures', 65, 40, 95, 42, 'Halal - Viande certifiée halal'),
                        (10, '2025-02-15', '13:00:00', '15:00:00', '18 heures', 50, 25, 70, 28, 'Circuit court - Plats préparés avec des produits locaux'); `);
}