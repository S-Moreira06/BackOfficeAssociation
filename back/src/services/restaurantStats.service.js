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
        date.setMonth(date.getMonth() - i);

        const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
        
        const startDateIso = startDate.toISOString();
        const endDateIso = endDate.toISOString();

        const monthlyMealGifted = `SELECT SUM(nb_place_setting) as count FROM reservation WHERE created_at >= ? AND created_at <= ? AND status = 'accepted'`;
        const monthlyMealGiftedResult = await db.prepare(monthlyMealGifted).all(startDateIso, endDateIso);

        const monthLabel = startDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });//format final, a modifier si besoin 

        mealGiftedGrowth.push({
            date: monthLabel,
            count: monthlyMealGiftedResult[0].count
        });
        }
        
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



export default {
    getRestaurantsStats
}