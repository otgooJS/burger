import axios from "axios";

const instance = axios.create({
  baseURL: `https://burger-9b5fd-default-rtdb.asia-southeast1.firebasedatabase.app/`,
});

export default instance;
