import axios from "axios";

export default axios.create({
    baseURL: "https://www.hcmariupol.com.ua/api",
    responseType: "json"
  });