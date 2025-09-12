import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.6.37.36:5000/api", // backend ka IP + /api
});

export default instance;

