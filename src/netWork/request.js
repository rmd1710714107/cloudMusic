import axios from "axios"
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
instance.interceptors.request.use(config=>{
  config.headers.Authorization=document.cookie.split(";")[1].split("=")[1];
  return config;
})
function phone(parm){
  console.log(parm);
  return instance.post("/login/cellphone",{
    phone:parm.phone,
    password:parm.pwd
  })
}
export{
  phone
}