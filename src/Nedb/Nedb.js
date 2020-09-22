const path=require("path");
import Datastore from 'nedb';
import { remote } from 'electron'
let db={};
db.localMusic=new Datastore({
  filename: path.join(remote.app.getPath("userData"), 'db/localMusic.db')
})
db.setting=new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), 'db/setting.db')
})


export default db