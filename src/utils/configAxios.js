import axios from "axios";

const axiosMusic = axios.create({
    baseURL: "https://backend-final-project-dev-tfcg.2.us-1.fl0.io"
})

axiosMusic.interceptors.request.use((config) => {
    config.headers = {...config.headers, Authorization: `JWT ${JSON.parse(localStorage.getItem("user"))?.token}`,};
       
    return config;
})

export { axiosMusic };