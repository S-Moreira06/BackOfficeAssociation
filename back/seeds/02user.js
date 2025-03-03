/**
* Seeds the database with preset data.
* @param client - The libsql client to use when migrating.
* @returns { Promise<void> }
*/
export async function seed(client) {
    await client.execute("DELETE FROM user;");
    await client.execute(`INSERT INTO user (firstname, lastname, email, password, address, zip, city, phone, role, verified)
    VALUES
    ('Alice', 'Dupont', 'alice.dupont@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '123 Rue Principale', '75001', 'Paris', '0601020304', 'admin',true),
        ('Bob', 'Martin', 'bob.martin@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '456 Boulevard Haussmann', '69002', 'Lyon', '0611223344', 'agent de reservation',true),
        ('Charlie', 'Durand', 'charlie.durand@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '789 Avenue de la République', '13001', 'Marseille', '0622334455', 'directeur association', TRUE),
        ('Diane', 'Lemoine', 'diane.lemoine@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '101 Place Bellecour', '31000', 'Toulouse', '0633445566', 'restaurateur', TRUE),
        ('Eric', 'Morel', 'eric.morel@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '12 Rue Lafayette', '44000', 'Nantes', '0644556677', 'agent de reservation', FALSE),
        ('Fanny', 'Bertrand', 'fanny.bertrand@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '25 Avenue Foch', '67000', 'Strasbourg', '0655667788', 'directeur association', TRUE),
        ('Georges', 'Lemoine', 'georges.lemoine@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '78 Rue Victor Hugo', '59000', 'Lille', '0666778899', 'restaurateur', TRUE),
        ('Hélène', 'Marchand', 'helene.marchand@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '32 Place de la République', '33000', 'Bordeaux', '0677889900', 'admin', TRUE),
        ('Isabelle', 'Leroy', 'isabelle.leroy@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '54 Quai de la Seine', '35000', 'Rennes', '0688990011', 'agent de reservation', FALSE),
        ('Jacques', 'Renaud', 'jacques.renaud@example.com', '$2b$10$DqS8H6yYd37RtlnAppvtyOR9TAH0r3JBbiS3L9OdwfXic4v8uDPWu', '91 Rue de la Liberté', '38000', 'Grenoble', '0699001122', 'directeur association', TRUE);`
    );
}
