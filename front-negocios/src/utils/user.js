import jwt from "jsonwebtoken"

const tokenName = "access-token"

export const isAuthenticated = () => {
    const token = localStorage.getItem("access-token")
    if (token) {
        const payload = jwt.decode(token)
        return { email: payload?.email, id: payload?.id, rol: payload?.rol }
    } else { return false }
}

export const getToken = () => {
    const res = localStorage.getItem(tokenName)
    return res
}

export const setToken = (token) => {
    localStorage.setItem(tokenName, token)
}

export const removeToken = () => {
    localStorage.removeItem(tokenName)
}