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

export { getAllRestaurants }