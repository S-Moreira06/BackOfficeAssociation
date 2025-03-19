import db from '../config/database.js';

async function getRestaurantsStats() {
    try {
        const totalMealGiftedResult = await db.prepare(`
            SELECT SUM(nb_place_setting) AS total
            FROM reservation
            WHERE status = 'accepted';
        `).get();
        const totalMealGifted = totalMealGiftedResult?.total || 0;

        

        const totalRemainingMealResult = await db.prepare(`
            SELECT SUM(max_meal) AS total
            FROM organisation
            WHERE category = 'restaurant';
        `).get();
        const totalRemainingMeal = (totalRemainingMealResult?.total || 0)-totalMealGifted;
        
        const totalValueMealGiftedResult = await db.prepare(`
            SELECT SUM(a.price * r.nb_place_setting) AS total
            FROM reservation r
            JOIN availability a ON r.id_availability = a.id
            WHERE r.status = 'accepted';;
        `).get();
        const totalValueMealGifted = totalValueMealGiftedResult?.total || 0;

        const mealGiftedGrowth = [];
        for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i); // Reculer de 'i' mois

        // Début du mois
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        
        // Fin du mois
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
        
        const startDateIso = startDate.toISOString();
        const endDateIso = endDate.toISOString();

        const monthlyMealGifted = `SELECT SUM(nb_place_setting) as count FROM reservation WHERE created_at >= ? AND created_at <= ? AND status = 'accepted'`;
        const monthlyMealGiftedResult = await db.prepare(monthlyMealGifted).all(startDateIso, endDateIso);

        // Format du mois (ex: "Janvier 2024")
        const monthLabel = startDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

        mealGiftedGrowth.push({
            date: monthLabel,
            count: monthlyMealGiftedResult[0].count
        });
        }

console.log(mealGiftedGrowth);

        
        const restaurantsStats = {
            totalMealGifted,
            totalRemainingMeal,
            totalValueMealGifted,
            mealGiftedGrowth
        };
        return restaurantsStats;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getMealGiftedForAsso(id_orga) {
    const mealGiftedForAssoResult = await db.prepare(`
        SELECT SUM(nb_place_setting) AS total
        FROM reservation
        WHERE status = 'accepted' AND id_organisation = ?;
    `).get(id_orga);
    const mealGiftedForAsso = mealGiftedForAssoResult?.total || 0;

    const mealGiftedForAssoResultHere = await db.prepare(`
        SELECT SUM(nb_place_setting) AS total
        FROM reservation
        WHERE status = 'accepted' AND id_organisation = ? AND take_away= 0 ;
    `).get(id_orga);
    const mealGiftedForAssoHere = mealGiftedForAssoResultHere?.total || 0;

    const mealGiftedForAssoResultAway = await db.prepare(`
        SELECT SUM(nb_place_setting) AS total
        FROM reservation
        WHERE status = 'accepted' AND id_organisation = ? AND take_away= 1 ;
    `).get(id_orga);
    const mealGiftedForAssoAway = mealGiftedForAssoResultAway?.total || 0;

    return {
        mealGiftedForAsso,
        mealGiftedForAssoHere,
        mealGiftedForAssoAway
    };
}

export default {
    getRestaurantsStats,
    getMealGiftedForAsso
}