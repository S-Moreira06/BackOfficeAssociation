import instance from "./config";

async function createBeneficiary(data) {
    return await instance.post("/beneficiary",data)
}
async function getAllBeneficiary() {
    try {
        const response = await instance.get("http://localhost:3000/api/beneficiary")
        console.log(response)
        return response.data
    } catch (error) {
        return error
    }
}

async function getBeneficiary(id) {
    try {
        const response = await instance.get(`/beneficiary/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

async function updateBeneficiary(id, beneficiaryData) {
    try {
        const response = await instance.put(`/beneficiary/${id}`, beneficiaryData);
        return response.data;
    } catch (error) {
        return error;
    }
}
async function deleteBeneficiary(id) {
    try {
        const response = await instance.delete(`/beneficiary/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export { createBeneficiary,getAllBeneficiary, getBeneficiary, updateBeneficiary, deleteBeneficiary }