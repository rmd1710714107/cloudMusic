import db from "./Nedb"
import { promises } from "fs";
class Setting {
  find(index) {
    return new Promise((resolve,reject)=>{
      db.setting.find(index, (err, doc) => {
        if(err){
          return reject("读取配置失败");
        }
        resolve(doc);
      })
    })
    
  }
  insert(data) {
    return new Promise((resolve, reject) => {
      db.setting.insert(data, (err, newDoc) => {
        if (err) {
          return reject(err)
        }
        resolve(newDoc);
      })
    })
  }
  update(oldData,newData){
    return new Promise((resolve,reject)=>{
      db.setting.update(oldData,newData,{},(err, numReplaced) => {
        if (err) {
          return reject(err)
        }
        resolve(numReplaced);
      })
    })
  }
  remove(index){
    return new Promise((resolve,reject)=>{
      db.setting.remove(index,{},(err, numRmoved) => {
        if (err) {
          return reject(err)
        }
        resolve(numRmoved);
      })
    })
  }
}
let localSetting = new Setting();
export default localSetting;