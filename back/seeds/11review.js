/**
 * Seeds the database with preset data.
 * @param client - The libsql client to use when migrating.
 * @returns { Promise<void> }
 */
export async function seed(client) {
    await client.execute('DELETE FROM review;');
    await client.execute(`INSERT INTO review (id_beneficiary, id_reservation, message, rating)
                          VALUES
                              (3, 1, 'Excellent service et nourriture délicieuse !', 5 ),
                              (1, 2, 'Très bon restaurant, je recommande.', 4 ),
                              (2, 3, 'Expérience moyenne, mais correcte.', 3 ),
                              (4, 3, 'Pas à la hauteur de mes attentes.', 2 ),
                              (5, 2, 'Le personnel était très sympathique.', 5 ),
                              (6, 1, 'Les plats étaient un peu trop salés.', 3 ),
                              (7, 2, 'Ambiance agréable et décoration moderne.', 4),
                              (8, 3, 'Service un peu lent, mais la nourriture était bonne.', 4 ),
                              (9, 1, 'Je ne reviendrai probablement pas.', 2 ),
                              (10, 2, 'Beau cadre avec jolie vue', 5 );
                       
`);
}