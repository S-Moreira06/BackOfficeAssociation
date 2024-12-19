import instance from "./config";


async function signIn(data) {
    return await instance.post("/signin", data)

}

async function listUsers() {
    try {
        const response = await instance.get("/users")
        return response.data
    } catch (error) {
        return error
    }
}


export { signIn, listUsers }