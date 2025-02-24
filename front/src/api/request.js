import instance from "./config";
import axios from "axios";

async function request(data) {
    return await instance.post("request",data)
}

async function getAllRequests() {
    try {
        const response = await instance.get("http://localhost:3000/api/request")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

export { request, getAllRequests }