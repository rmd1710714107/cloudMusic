import db from "./Nedb"
class Setting {
  find(index) {
    return new Promise((resolve,reject)=>{
      db.setting.find(index, (err, doc) => {
        if(err){
          return reject("读取配置失败");
        }
        if (doc === []) {//设定一些默认配置
          this.insert({ micLisSta: "localMusic" })
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
}
let localSetting = new Setting();
export default localSetting;