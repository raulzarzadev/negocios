const PROD = process.env.NODE_ENV !=="production"
console.log(PROD)

<<<<<<< HEAD
export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://api.negociosdelbarrio.com/api";
    //:"http://localhost:4001/api"

export const SIGNUP_SERVICE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3015/user"
    : "http://localhost:3015/user";
=======
export const BACKEND_URL = PROD ? "http://localhost:3001/api": "http://138.68.233.95:4001"
export const SIGNUP_SERVICE = PROD ? "http://localhost:3015/user": "http://138.68.233.95:4002"
export const UPLOAD_IMAGE_SERVICE = PROD ? "http://localhost:4042": "http://138.68.233.95:4003"
>>>>>>> dev
