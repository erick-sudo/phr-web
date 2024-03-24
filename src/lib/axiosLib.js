import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const axiosPost = async (url, payload) => await axios.post(url, payload);
export const axiosGet = async (url) => await axios.get(url);
export const axiosDelete = async (url) => await axios.delete(url);
export const axiosPut = async (url, payload) => await axios.put(url, payload);
export const axiosPatch = async (url, payload) =>
  await axios.patch(url, payload);
