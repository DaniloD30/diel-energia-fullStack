import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});
export const api2 = axios.create({
  baseURL: "https://date.nager.at/api/v3/publicholidays/2023/BR",
});
