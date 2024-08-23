import Cookies from 'js-cookie'
const setCookieLogin = (value) => {
    // console.log('value',value)
    try {
        Cookies.set("userLoginAI", value, {
            expires: 7
        })
        return "Set Cookie Login Success"
    } catch (error) {
        return error
    }
}
const removeCookieLogin = () => {
    try {
        Cookies.remove('userLoginAI')
        return "Remove Cookie Login Success"
    } catch (error) {
        return error
    }
}
const getCookieLogin = () => {
    try {
        const getCookie = Cookies.get('userLoginAI')
        return getCookie
    } catch (error) {
        return error
    }
}
export {
    setCookieLogin, getCookieLogin, removeCookieLogin
}