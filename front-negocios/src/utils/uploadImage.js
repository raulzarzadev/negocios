import Axios from "axios";
const URL = process.env.REACT_APP_UPLOADIMAGE_SERVICE;
console.log(URL);
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

  const res = await Axios(`${URL}/upload`, config);

  return res;
}
