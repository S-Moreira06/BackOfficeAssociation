import db from '../config/database.js';

async function getRestaurantsStats(id = null) {
    try {
        const params = id ? [id] : [];
        const totalMealGiftedQuery = `
            SELECT SUM(nb_place_setting) AS total
            FROM reservation
            WHERE status = 'accepted'
            ${id ? 'AND id_availability IN (SELECT id FROM availability WHERE restaurant_id = ?)' : ''}
        `;
        const totalMealGiftedResult = await db.prepare(totalMealGiftedQuery).get(...params);
        const totalMealGifted = totalMealGiftedResult?.total || 0;

        const totalMealHereGiftedQuery = `
            SELECT SUM(nb_place_setting) AS total
            FROM reservation
            WHERE status = 'accepted' AND take_away = 0 
            ${id ? 'AND id_availability IN (SELECT id FROM availability WHERE restaurant_id = ?)' : ''}
        `;
        const totalMealHereGiftedResult = await db.prepare(totalMealHereGiftedQuery).get(...params);
        const totalMealHereGifted = totalMealHereGiftedResult?.total || 0;

        const totalMealAwayGiftedQuery = `
            SELECT SUM(nb_place_setting) AS total
            FROM reservation
            WHERE status = 'accepted' AND take_away = 1
            ${id ? 'AND id_availability IN (SELECT id FROM availability WHERE restaurant_id = ?)' : ''}
        `;
        const totalMealAwayGiftedResult = await db.prepare(totalMealAwayGiftedQuery).get(...params);
        const totalMealAwayGifted = totalMealAwayGiftedResult?.total || 0;

        const totalRemainingMealQuery = `
            SELECT SUM(max_meal) AS total
            FROM organisation
            WHERE category = 'restaurant' ${id ? "AND id = ?" : ""};
        `;
        const totalRemainingMealResult = await db.prepare(totalRemainingMealQuery).get(...params);
        const totalRemainingMeal = (totalRemainingMealResult?.total || 0) - totalMealGifted;

        const totalValueMealGiftedQuery = `
            SELECT SUM(a.price * r.nb_place_setting) AS total
            FROM reservation r
            JOIN availability a ON r.id_availability = a.id
            WHERE r.status = 'accepted' ${id ? 'AND r.id_availability IN (SELECT id FROM availability WHERE restaurant_id = ?)' : ''};
        `;
        const totalValueMealGiftedResult = await db.prepare(totalValueMealGiftedQuery).get(...params);
        const totalValueMealGifted = totalValueMealGiftedResult?.total || 0;

        const mealGiftedGrowth = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);

            const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
            const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

            const startDateIso = startDate.toISOString();
            const endDateIso = endDate.toISOString();

            const monthlyMealGiftedQuery = `
                SELECT SUM(nb_place_setting) AS count
                FROM reservation
                WHERE created_at >= ? AND created_at <= ? AND status = 'accepted'
                ${id ? 'AND id_availability IN (SELECT id FROM availability WHERE restaurant_id = ?)' : ''}
            `;

            const monthlyMealGiftedParams = id ? [startDateIso, endDateIso, id] : [startDateIso, endDateIso];
            const monthlyMealGiftedResult = await db.prepare(monthlyMealGiftedQuery).all(...monthlyMealGiftedParams);
            const monthLabel = startDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

            mealGiftedGrowth.push({
                date: monthLabel,
                count: monthlyMealGiftedResult[0]?.count || 0
            });
        }

        return {
            totalMealGifted,
            totalMealHereGifted,
            totalMealAwayGifted,
            totalRemainingMeal,
            totalValueMealGifted,
            mealGiftedGrowth            
        };
    } catch (error) {
        console.error('Erreur dans getRestaurantsStats:', error);
        throw error;
    }
}

export default {getRestaurantsStats}