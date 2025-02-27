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

export { createRestaurant, getAllRestaurant, getRestaurant, updateRestaurant,deleteRestaurant }