export default function GetDateTime({ timestamp, format = "full" }) {
    if (!timestamp) {
        return "Chargement...";
    }

    // Corriger le format pour éviter les bugs
    const date = new Date(timestamp.replace(" ", "T")); 
    const formattedDate = date.toLocaleString("fr-FR");
    const [datePart, timePart] = formattedDate.split(" ", 2);

    // Gérer le format demandé
    if (format === "date") return datePart;  // 📅 Seulement la date
    if (format === "time") return timePart;  // 🕒 Seulement l'heure
    return `${datePart} à ${timePart}`;      // ⏳ Format complet
}
