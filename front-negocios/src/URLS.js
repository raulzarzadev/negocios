const PROD = process.env.NODE_ENV !=="production"
console.log(PROD)

export const BACKEND_URL = PROD ? "http://localhost:3001/api": "https://adverts.negociosdelbarrio.com"
export const SIGNUP_SERVICE = PROD ? "http://localhost:3015/user": "https://sign.negociosdelbarrio.com"
export const UPLOAD_IMAGE_SERVICE = PROD ? "http://localhost:4042": "https://images.negociosdelbarrio.com"
