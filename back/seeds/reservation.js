/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM reservation;");
    await client.execute(`INSERT INTO reservation (id_organisation, id_availability, time, email, nb_place_setting, status, take_away)
                          VALUES 
                        (1, 11, '2025-02-06 12:20:00', 'assoc1@gmail.com', 10, 'En attente', true),
                        (2, 11, '2025-02-06 12:40:00', 'assoc2@gmail.com', 10, 'En attente', false),
                        (3, 12, '2025-02-07 13:45:00', 'assoc3@gmail.com', 10, 'En attente', true),
                        (4, 12, '2025-02-07 14:00:00', 'assoc4@gmail.com', 10, 'En attente', false),
                        (5, 13, '2025-02-08 12:30:00', 'assoc5@gmail.com', 8, 'En attente', true),
                        (1, 13, '2025-02-08 12:00:00', 'assoc1@gmail.com', 17, 'En attente', true)
    `)
}