import axios from "axios";

export const ADDRESS = "10.0.0.49:8000";

const api = axios.create({
  baseURL: "http://" + ADDRESS + "/",
  headers: {
    "Content-type": "application/json",
  },
});

export default {api};