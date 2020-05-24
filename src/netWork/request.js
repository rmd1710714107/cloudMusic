import axios from "axios"
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
function phone(phone,pwd){
  instance.post("/login/cellphone",{
    phone:phone,
    password:pwd
  })
}
export{
  phone
}