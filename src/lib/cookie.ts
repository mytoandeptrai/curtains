import Cookies from 'js-cookie'

const COOKIES = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  ADDRESS: 'address',
  PRIVY_TOKEN: 'privy-token',
  PRIVY_SESSION: 'privy-session',
}

const setCookie = (key: string, value: string) => {
  Cookies.set(key, value)
}

const getCookie = (key: string) => {
  return Cookies.get(key)
}

const removeCookie = (key: string) => {
  Cookies.remove(key)
}

export { COOKIES, getCookie, removeCookie, setCookie }
