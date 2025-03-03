export async function seed(client) {
    await client.execute(`INSERT INTO option (name)
                          VALUES
                              ('Halal'),
                              ('Végétarien'),
                              ('Végan'),
                              ('Sans lactose'),
                              ('Sans gluten'),
                              ('Sans allergènes'),
                              ('Aliments crus'),
                              ('Options pour enfants'),
                              ('Plats épicés'),
                              ('Plats de saison'),
                              ('Options bio'),
                              ('circuit court');
                     ; `);
}