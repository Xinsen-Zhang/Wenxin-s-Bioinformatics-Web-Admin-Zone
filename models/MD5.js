const crypto = require("crypto");
exports.md5 = (str) => {
    const md5 = crypto.createHash("md5");
    md5.update(str);
    str = md5.digest('hex');
    return str;
};

// exports.doubleMD5 = (str) =>{
//     var crypted = "cat" + exports.md5 + "cat";
//     return exports.md5(crypted);
// };

// console.log(exports.doubleMD5("Xwx19980703"));