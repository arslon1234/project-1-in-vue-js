import axios from "axios";
const baseURL = "https://apiallin.igenius.uz/api/site/"

export const $http = axios.create({
       baseURL
})
export default $http