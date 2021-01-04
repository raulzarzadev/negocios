import axios from "axios";
import { getToken } from "./token";
const token = getToken();

const URL = process.env.REACT_APP_ADVERTS;
console.log("Ad&B url", URL);
axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "access-token": token,
};

export function getAdvert(id) {
  return axios.get(`${URL}/adverts/editar/${id}`);
}
export function getAdvertsByOwner(owner) {
  return axios.get(`${URL}/adverts/${owner}`);
}
export function deleteAdvert(id) {
  return axios.delete(`${URL}/adverts/${id}`);
}
export function postAdvert(advert) {
  return axios.post(`${URL}/adverts`, { advert });
}

export function updateAdvert(id, advert) {
  return axios.put(`${URL}/adverts/editar/${id}`, {
    advert,
  });
}
export function getPublishedAdverts() {
  return axios.get(`${URL}/adverts`);
}
export function getAllAdverts() {
  return axios.get(`${URL}/adverts/allAdverts`);
}

export function getAdvertsByBarrio(barrio) {
  return axios.get(`${URL}/barrios/${barrio}`);
}

export function getAllBarrios() {
  return axios.get(`${URL}/barrios`);
}
