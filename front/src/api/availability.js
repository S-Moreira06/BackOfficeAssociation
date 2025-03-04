import instance from "./config";

async function createAvailability(data) {
    return await instance.post("/availability",data);
}

export { createAvailability }