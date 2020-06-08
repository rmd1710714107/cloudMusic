import axios from "axios"
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
function phone(parm){
  return instance.post("/login/cellphone",{
    phone:parm.phone,
    password:parm.pwd
  })
}
function searchMusic(param){
  return instance.get("/search",{
    params:{
      keywords:param
    }
  })
}
function searchSuggest(param){
  return instance.get("/search/suggest",{
    params:{
      keywords:param
    }
  })
}
export{
  phone,
  searchMusic,
  searchSuggest
}