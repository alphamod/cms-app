import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:4000/";

const addPost = (title, content, postedBy) => {
    return axios.post(`${API_URL}addcontent`, { title, content, postedBy }, { headers: authHeader() });
};
const getContent = () => {
    return axios.get(`${API_URL}getcontent/`, { headers: authHeader() });
};
const getMyContent = (userId) => {
    return axios.get(`${API_URL}getMycontent/${userId}`, { headers: authHeader() });
};



export default { addPost, getContent, getMyContent };
