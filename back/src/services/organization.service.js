import db from '../config/database.js';

async function createOrganization(data) {
  console.error(data);
  const query = `
      INSERT INTO organization (name, address, zip, city, siret, category, contact, email ,phone ,max_meal ,description ,image, remaining_meal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
`;
  const values = [data.name, data.address, data.zip, data.city , data.siret ,data.category, data.contact, data.email, data.phone , data.max_meal, data.description, data.image , data.max_meal];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM organization WHERE id = ?').get(result.lastInsertRowid);
}
async function softDeleteOrganization(id){
  try {
    let today = new Date().toISOString();
    const query = `UPDATE organization SET deleted_at = ? WHERE id = ?`;
    const values = [ today, id];
    const result = db.prepare(query).run(values);
    return true
  } catch (err){
    console.log(err);
    throw err;
  }
}

async function getAllOrganizationsByCategory(category) {
  const query = 'SELECT * FROM organization where category = ?';
  const result = await db.prepare(query).all(category);
  if (result.length < 1) {
    throw new Error("No result");
  }
  return result;
}

async function findOrganizationById(id) {
  const query = 'SELECT * FROM organization WHERE id = ?';
  const result = await db.prepare(query).get(id);
  return result;
}

async function updateOrganization(organizationId, data) {
  let today = new Date().toISOString();
  const setClauses = [];
  const values = [];
  function camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  Object.entries(data).forEach(([key, value]) => {

    const snakeKey = camelToSnakeCase(key);
    setClauses.push(`${snakeKey} = ?`);
    values.push(value);
  });
  setClauses.push("updated_at = ?");
  values.push(today);
  values.push(organizationId);
  const query = `UPDATE organization SET ${ setClauses.join(', ') } WHERE id = ?`;
  try {
    await db.prepare(query).run(values);
    const updatedRecord = await db.prepare('SELECT * FROM organization WHERE id = ?').get(organizationId);
    return updatedRecord;
  } catch (error) {
    console.error(error);
    throw new Error('Uppdate organization table failed');
  }
}

async function getOrganizationById(id){
  const query = 'SELECT * FROM organization WHERE id = ?';
  const result = await db.prepare(query).get(id);
  return result;
}
async function getCountRestaurants() {
  const query = 'SELECT COUNT(*) AS count FROM organization WHERE category = ?';
  const result = await db.prepare(query).get("restaurant");
  return result.count;
}
async function getCountAsso() {
  const query = 'SELECT COUNT(*) AS count FROM organization WHERE category = ?';
  const result = await db.prepare(query).get("Association");
  return result.count;
}
async function getAllRestaurantByCity(city) {
  const query = `
        SELECT * FROM organization 
        WHERE category = 'restaurant' 
        AND city = ?`;

  const result = await db.prepare(query).all(city);


  return result.length > 0 ? result : [];
}
async function getAllAssociationByCity(city) {
  const query = `
    SELECT * FROM organization
    WHERE category = 'association'
      AND city = ?`;

  const result = await db.prepare(query).all(city);


  return result.length > 0 ? result : [];
}

async function valid(id_availability,id_reservation, slot) {
  console.log("valeur dans le orgaService.valid:" + id_availability + id_reservation + slot)
  const query1 = `
      UPDATE organization
      SET remaining_meal = remaining_meal - ?
      WHERE id = (
          SELECT restaurant_id
          FROM availability
          WHERE id = ?
          LIMIT 1
      );
  `;
  const query2 = `
      UPDATE organization
      SET remaining_meal = remaining_meal - ?
      WHERE id = (
          SELECT id_organization
          FROM reservation
          WHERE id = ?
          LIMIT 1
      );
  `;

  const dbTransaction = db.transaction(() => {  
    db.prepare(query1).run(slot, id_availability);
    db.prepare(query2).run(slot, id_reservation);
});
dbTransaction();

return { success: true };
}
async function cancel(id_availability,id_reservation, slot) {
  console.log("valeur dans le orgaService.valid:" + id_availability + id_reservation + slot)
  const query1 = `
      UPDATE organization
      SET remaining_meal = remaining_meal + ?
      WHERE id = (
          SELECT restaurant_id
          FROM availability
          WHERE id = ?
          LIMIT 1
      );
  `;
  const query2 = `
      UPDATE organization
      SET remaining_meal = remaining_meal + ?
      WHERE id = (
          SELECT id_organization
          FROM reservation
          WHERE id = ?
          LIMIT 1
      );
  `;

  const dbTransaction = db.transaction(() => { 
    db.prepare(query1).run(slot, id_availability);
    db.prepare(query2).run(slot, id_reservation);
});

dbTransaction();

return { success: true };
}

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
            FROM organization
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
        const totalValueMealGifted = totalValueMealGiftedResult?.total / 100 || 0;

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

export default {
  createOrganization,
  softDeleteOrganization ,
  getAllOrganizationsByCategory,
  findOrganizationById,
  updateOrganization,
  getOrganizationById,
  getCountRestaurants,
  getCountAsso ,
  getAllRestaurantByCity,
  getAllAssociationByCity,
  getRestaurantsStats,
  valid,
  cancel
};