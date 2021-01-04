import axios from "axios";
import url from "../url/url";
import { getToken } from "./token";
const token = getToken();

axios.defaults.headers = {
  Accept: "application/json",
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
    advert,
  });
}
export function deleteAdvert(id) {
  return axios.delete(`${url}/adverts/${id}`);
}

export function getPublishedAdverts() {
  return axios.get(`${url}/adverts`);
}
export function getAllAdverts() {
  return axios.get(`${url}/adverts/allAdverts`);
}

export function getAdvertsByBarrio(barrio) {
  return axios.get(`${url}/barrios/${barrio}`);
}

export function getAllBarrios() {
  return axios.get(`${url}/barrios`);
}