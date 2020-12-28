import axios from "axios";
import url from "../url/url";
import { getToken } from "./user";
const token = getToken();

axios.defaults.headers = {
  "Content-Type": "application/json",
  "access-token": token,
};

export function getAdvert(id) {
  return axios.get(`${url}/adverts/editar/${id}`);
}

export function postAdvert(advert) {
  return axios.post(`${url}/adverts`, { advert });
}

export function updateAdvert(id, advert) {
  return axios.put(`${url}/adverts/editar/${id}`, {
    advert
  });
}

export function getAllBarrios() {
  return axios.get(`${url}/barrios`);
}
