const tokenName = "access-token"

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

