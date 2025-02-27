import instance from "./config";

async function createUser(data) {
    return await instance.post("/auth/register",data)
}
async function getAllUser() {
    try {
        const response = await instance.get("/auth")
        return response.data
    } catch (error) {
        return error
    }
}

async function getUser(id) {
    try {
        const response = await instance.get(`/auth/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function updateUser(id, userData) {
    try {
        const response = await instance.put(`/auth/${id}`, userData);
        return response.data;
    } catch (error) {
        return error;
    }
}

async function deleteUser(id) {
    try {
        const response = await instance.delete(`/auth/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export { getAllUser, createUser, getUser, updateUser, deleteUser }
