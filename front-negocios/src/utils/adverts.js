import axios from "axios";
import url from "../url/url";
import { getToken } from "./user";
const token = getToken();

export function getAdvert(id) {
  return axios.get(`${url}/adverts/editar/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
    },
  });
}

export function postAdvert(advert) {
  return axios.post(`${url}/adverts`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
    },
    data: advert,
  });
}

export function updateAdvert(id, advert) {
  return axios.put(`${url}/adverts/editar/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
    },
    data: advert,
  });
}

export function getAllBarrios() {
  return axios.get(`${url}/barrios`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
    },
  });
}
