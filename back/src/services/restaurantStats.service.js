import db from '../config/database.js';

async function getRestaurantsStats(id_orga) {
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
        
        const restaurantsStats = {
            totalMealGifted,
            totalRemainingMeal,
            totalValueMealGifted,
            mealGiftedByAsso
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