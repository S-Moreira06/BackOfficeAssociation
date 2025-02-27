import instance from "./config";

async function signIn(data) {
    return await instance.post("/auth/login", data)
}

export { signIn }