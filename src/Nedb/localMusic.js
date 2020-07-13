import db from "./Nedb"
class localMusicDb{
  find(index={}){
    return new Promise((resolve,reject)=>{
      db.localMusic.find(index, (err, localMusic) => {
        if(err){
          return reject(err);
        }
        resolve(localMusic)
      })
    })
  }
  insert(data){
    return new Promise((resolve,reject)=>{
      db.localMusic.insert(data, (err, inserData) => {
        if(err){
          return reject(err);
        }
        resolve(inserData)
      })
    })
  }
  count(index){
    return new Promise((resolve,reject)=>{
      db.localMusic.count(index, (err, count) => {
        if(err){
          return reject(err);
        }
        resolve(count)
      })
    })
  }
}
let localMusic=new localMusicDb();
export default localMusic;
