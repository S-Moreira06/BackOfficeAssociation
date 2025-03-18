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
            WHERE type = 'restaurant';
        `).get();
        const totalRemainingMeal = (totalMealGiftedResult?.total || 0)-totalMealGifted;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}