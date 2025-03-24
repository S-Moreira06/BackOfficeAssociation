import instance from "./config";

async function createRestaurant(data) {
    return await instance.post("/restaurant",data)
}

async function getAllRestaurant() {
    try {
        const response = await instance.get("/restaurant")
        return response.data
    } catch (error) {
        throw error
    }
}

async function getRestaurant(id) {
    try {
        const response = await instance.get(`/restaurant/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}
async function getRestaurantsStats() {
    try {
        const response = await instance.get('/restaurant/stats')
        return response.data
    } catch (error) {
        return error
    }
}

async function getRestaurantStatsById(id) {
    try {
        const response = await instance.get(`/restaurant/stats/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}
async function getMealValue() {
    try {
        const response = await instance.get(`/restaurant/value`)
        return response.data
    } catch (error) {
        return error
    }
}
async function getMealValueByCat(cat) {
    try {
        const response = await instance.get(`/restaurant/value/${cat}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function updateRestaurant(id, restaurantData) {
    try {
        const response = await instance.put(`/restaurant/${id}`,restaurantData);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function deleteRestaurant(id) {
    try {
        const response = await instance.delete(`/restaurant/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export { createRestaurant, getAllRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, getRestaurantsStats, getRestaurantStatsById, getMealValue, getMealValueByCat }