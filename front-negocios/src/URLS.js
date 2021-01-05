export const UPLOAD_IMAGE_SERVICE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4042"
    : "http://localhost:4042";

export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    //: "https://api.negociosdelbarrio.com/api";
    :"http://localhost:4001/api"

export const SIGNUP_SERVICE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3015/user"
    : "http://localhost:3015/user";
