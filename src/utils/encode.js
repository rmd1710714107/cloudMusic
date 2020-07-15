const crypto = require('crypto');
const text = 'Encryption Testing AES GCM mode'; // 要加密和解密的数据
const key = crypto.randomBytes(32); // 256 位的共享密钥
const iv = crypto.randomBytes(16); // 初始向量，16 字节
const algorithm = 'aes-256-gcm'; // 加密算法和操作模式
// function encode(data) {
//   const cipher = crypto.createCipheriv(algorithm, key, iv); // 初始化加密算法
//   let encrypted = cipher.update(data, 'utf8', 'utf8');
//   console.log(encrypted);
//   return encrypted;
  
// }
// function decode(data) {
//   const decipher = crypto.createDecipheriv(algorithm, key, iv); // 初始化解密算法
//   let decrypted = decipher.update(data, 'utf8', 'utf8');
//   return decrypted
// }
// export{
//   encode,
//   decode
// }
//初始化参数


//加密
const cipher = crypto.createCipheriv(algorithm, key, iv); // 初始化加密算法
let encrypted = cipher.update(text, 'utf8');
//encrypted += cipher.final('hex');
//console.log(encrypted.toString());
// const tag = cipher.getAuthTag(); // 生成标签，用于验证密文的来源
// console.log(tag);

// 解密
const decipher = crypto.createDecipheriv(algorithm, key, iv); // 初始化解密算法
// decipher.setAuthTag(tag); // 传入验证标签，验证密文的来源
let decrypted = decipher.update(encrypted);
//decrypted += decipher.final('utf8');

//console.log(decrypted.toString()); // Encryption Testing AES GCM mode