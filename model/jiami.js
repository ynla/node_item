var crypto = require('crypto')

function jiami(str) {
    let salt = "fjdsoigijasoigjasdiodgjasdiojoasid"
    let obj = crypto.createHash('md5')
    str = salt + str;
    obj.update(str)
    return obj.digest('hex')
}

module.exports = jiami;