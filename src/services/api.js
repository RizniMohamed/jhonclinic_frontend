import axios from "axios";

const API = axios.create({ baseURL: 'https://jhonclinic.herokuapp.com/', });

export default API;
