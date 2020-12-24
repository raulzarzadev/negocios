import axios from "axios";
import url from "../url/url";
import { getToken } from "./user";
const token = getToken();

export function getAdvert(id) {
  return  axios.get(`${url}/adverts/editar/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
    },
  });
}
