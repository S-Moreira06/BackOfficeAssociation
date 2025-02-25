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
async function updateRestaurant() {}

export { getAllRestaurants, getRestaurant, updateRestaurant }