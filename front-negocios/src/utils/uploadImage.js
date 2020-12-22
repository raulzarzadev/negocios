import Axios from "axios";
import { UPLOAD_IMAGE_SERVICE } from "../URLS";

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("image", image);
  let config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data; boundary=something ",
      "access-token": "no token",
    },
    data: formData,
  };

  const res = await Axios(UPLOAD_IMAGE_SERVICE, config);

  return res;
}
