/**
 * Seeds the database with preset data.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function seed(client) {
    await client.execute('DELETE FROM review;');
    await client.execute(`INSERT INTO review (id_beneficiary, id_reservation, message, rating, is_archived,updated_at, 
                    deleted_at)
                          VALUES
                              (3, 1, 'Excellent service et nourriture délicieuse !', 5, false, NULL, NULL),
                              (1, 2, 'Très bon restaurant, je recommande.', 4, false, '2021-08-22', NULL),
                              (2, 3, 'Expérience moyenne, mais correcte.', 3, false, '2023-03-05', NULL),
                              (4, 3, 'Pas à la hauteur de mes attentes.', 2, false, '2022-11-30', NULL),
                              (5, 2, 'Le personnel était très sympathique.', 5, false, '2021-12-12', NULL),
                              (6, 1, 'Les plats étaient un peu trop salés.', 3, false, '2023-04-18', NULL),
                              (7, 2, 'Ambiance agréable et décoration moderne.', 4, false, '2022-07-07', NULL),
                              (8, 3, 'Service un peu lent, mais la nourriture était bonne.', 4, false, NULL, NULL),
                              (9, 1, 'Je ne reviendrai probablement pas.', 2, false, NULL, NULL),
                              (10, 2, 'Beau cadre avec jolie vue', 5, false, NULL, NULL);
                       
`);
}