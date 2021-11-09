const TokenKey = 'token'

export function getToken() {
  let returnVal=''
  let token = window.localStorage.getItem(TokenKey)//Cookies.get(TokenKey)

  if(token){
    returnVal = token.toString()
  }
  return returnVal
}


export function setToken(token) {
  window.localStorage.removeItem(TokenKey);
  window.localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  window.localStorage.removeItem(TokenKey);
}
