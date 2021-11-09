export function LoginStatus() {
  let returnVal={status:false}
  let expireTime=10000
  let login = window.localStorage.getItem("loginUser")//Cookies.get("loginUser")

  if(login!=null){
    let objLogin = JSON.parse(login)
    if (new Date() < new Date(objLogin.expireDate)){
      if(objLogin!=null&&objLogin.data!=null&&objLogin.data.id!=null&&objLogin.data.id!=''){
        returnVal={status:true}
      }
    }
  }
  return JSON.parse(JSON.stringify(returnVal))
}

export function loginUser() {
  let login = window.localStorage.getItem("loginUser")//Cookies.get("loginUser")
  if(login!=null){
    let objLogin = JSON.parse(login)
    if (new Date() < new Date(objLogin.expireDate)){
      if(objLogin!=null&&objLogin.data!=null&&objLogin.data.id!=null&&objLogin.data.id!=''){
        return objLogin.data
      }
    }
  }
  return {};
}

export function userMenus() {
  let menus = window.localStorage.getItem("currentUserMenu")
  let returnVal=[]
  if(menus){
   returnVal = JSON.parse(menus)
  }
  return JSON.parse(JSON.stringify(returnVal))
}

export function systemDicts(dictName) {
  let strDicts = window.localStorage.getItem("systemDicts")
  let returnVal=[]
  if(strDicts){
   let  dicts = JSON.parse(strDicts);
   let findIndex = dicts.findIndex(item=>{return item.label == dictName});
   if(findIndex>-1)
    returnVal = dicts.find(item=>{return item.label == dictName}).dictvalues
  }
  return JSON.parse(JSON.stringify(returnVal));
}

export function systemUsers() {
  let users = window.localStorage.getItem("Users")
  let returnVal=[]
  if(users){
   returnVal = JSON.parse(users)
  }
  return JSON.parse(JSON.stringify(returnVal))
}

export function systemDeparts() {
  let departs = window.localStorage.getItem("Departs")
  let returnVal=[]
  if(departs){
   returnVal = JSON.parse(departs)
  }
  return JSON.parse(JSON.stringify(returnVal))
}

export function getPdfFile() {
  let filePath = window.localStorage.getItem("pdfFileInfo")
  if(filePath!=null){
    return JSON.parse(filePath)
  }
  return ""
}

