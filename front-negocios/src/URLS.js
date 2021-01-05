const PROD = process.env.NODE_ENV !=="production"
console.log(PROD)

export const BACKEND_URL = PROD ? "http://localhost:3001/api": "http://138.68.233.95:4001"
export const SIGNUP_SERVICE = PROD ? "http://localhost:3015/user": "http://138.68.233.95:4002"
export const UPLOAD_IMAGE_SERVICE = PROD ? "http://localhost:4042": "http://138.68.233.95:4003"
