import instance from "./config";
import axios from "axios";

async function getAllRestaurants() {
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

export { getAllRestaurants, getRestaurant, updateRestaurant }