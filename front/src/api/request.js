import instance from "./config";
import axios from "axios";

async function request(data) {
    return await instance.post("/",data)
}