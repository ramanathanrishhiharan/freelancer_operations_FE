import Cookies from "js-cookie";

const TOKEN_KEY ='token'

export function saveToken(token:string):void{
    localStorage.setItem(TOKEN_KEY,token)
    Cookies.set(TOKEN_KEY,token,{
        expires:1,
        path:"/"
    })
}

export function getToken():string|null{
    return localStorage.getItem(TOKEN_KEY)
}

export function clearToken():void{
    localStorage.removeItem(TOKEN_KEY)
    Cookies.remove(TOKEN_KEY,{path:"/"})
}
export function isAuthenticated(): boolean {
  return !!getToken()
}