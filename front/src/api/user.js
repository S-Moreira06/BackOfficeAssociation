import instance from "./config";
import axios from "axios";

async function createUser(data) {
    return await instance.post("/auth/register",data)
}
async function getAllUsers() {
    try {
        const response = await axios.get("http://localhost:3000/api/auth")
        return response.data
    } catch (error) {
        return error
    }
}

async function getUser(id) {
    try {
        const response = await axios.get(`http://localhost:3000/api/auth/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

export { getAllUsers, createUser, getUser }
