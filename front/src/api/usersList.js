import instance from "./config";
import axios from "axios";

async function usersList() {
    try {
        const response = await axios.get("http://localhost:3000/api")
        return response.data
    } catch (error) {
        return error
    }
}

export { usersList }
