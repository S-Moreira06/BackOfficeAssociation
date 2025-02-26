import instance from "./config";

async function createAssociation(data) {
    return await instance.post("/association",data)
}
async function getAllAssociation() {
    try {
        const response = await instance.get("/association")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

async function getAssociation(id) {
    try {
        const response = await instance.get(`/association/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function updateAssociation(id, associationData) {
    try {
        const response = await instance.put(`/association/${id}`, associationData);
        return response.data;
    } catch (error) {
        return error;
    }
}
async function deleteAssociation(id) {
    try {
        const response = await instance.delete(`/association/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export { createAssociation, getAllAssociation, getAssociation, updateAssociation, deleteAssociation }