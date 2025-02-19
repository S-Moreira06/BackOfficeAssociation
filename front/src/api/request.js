import instance from "./config";
import axios from "axios";

async function request(data) {
    console.log(data)
    return await instance.post("request",data)
    
}

export { request }