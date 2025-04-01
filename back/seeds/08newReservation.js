/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM reservation;");
    await client.execute(`INSERT INTO reservation (id_organization, id_availability, time, email, nb_place_setting, status, take_away)
                          VALUES 
                        (21, 1, '2025-04-25 10:00:00', 'org21@gmail.com', 3, 'En attente', true),
                        (22, 2, '2025-04-25 11:00:00', 'org22@gmail.com', 2, 'En attente', false),
                        (23, 3, '2025-04-25 10:30:00', 'org23@gmail.com', 3, 'En attente', true),
                        (24, 4, '2025-04-25 11:00:00', 'org24@gmail.com', 2, 'En attente', false),
                        (25, 5, '2025-04-25 12:00:00', 'org25@gmail.com', 1, 'En attente', true),
                        (26, 6, '2025-04-25 12:00:00', 'org26@gmail.com', 2, 'En attente', false),
                        (27, 7, '2025-04-25 11:30:00', 'org27@gmail.com', 3, 'En attente', true),
                        (28, 8, '2025-04-25 12:00:00', 'org28@gmail.com', 2, 'En attente', false),
                        (29, 9, '2025-04-25 10:00:00', 'org29@gmail.com', 3, 'En attente', true),
                        (30, 10, '2025-04-25 12:00:00', 'org30@gmail.com', 2, 'En attente', false),
                        (21, 11, '2025-04-25 10:00:00', 'org21_2@gmail.com', 3, 'En attente', true),
                        (22, 12, '2025-04-25 12:30:00', 'org22_2@gmail.com', 2, 'En attente', false),
                        (23, 13, '2025-04-25 10:00:00', 'org23_2@gmail.com', 1, 'En attente', true),
                        (24, 14, '2025-04-25 11:00:00', 'org24_2@gmail.com', 3, 'En attente', false),
                        (25, 15, '2025-04-25 12:30:00', 'org25_2@gmail.com', 2, 'En attente', true),
                        (26, 16, '2025-04-25 12:00:00', 'org26_2@gmail.com', 1, 'En attente', false),
                        (27, 17, '2025-04-25 12:00:00', 'org27_2@gmail.com', 3, 'En attente', true),
                        (28, 18, '2025-04-25 11:00:00', 'org28_2@gmail.com', 2, 'En attente', false),
                        (29, 19, '2025-04-25 10:30:00', 'org29_2@gmail.com', 1, 'En attente', true),
                        (30, 20, '2025-04-25 12:30:00', 'org30_2@gmail.com', 3, 'En attente', false);
                            `)
}
