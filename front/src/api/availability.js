import instance from "./config";

async function createAvailability(data) {
    return await instance.post("/availability",data);
}
async function getAllAvailability() {
    try {
        const response = await instance.get("http://localhost:3000/api/availability")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

export { createAvailability, getAllAvailability }