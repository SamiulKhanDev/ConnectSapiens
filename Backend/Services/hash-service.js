const crypto = require("crypto");
class HashService {
  hashOtp(data) {
    //crypto module in node has a method name createhmac(which hashing algo to use,secret key).
    //using the algo and the secret key is will generate an hashvalue and will return an object.
    //that "hamc" obj has a method named update , that will take the value against which it will generate the hashvalue.

    const hmac = crypto.createHmac("sha256", process.env.SECRET || "a secret");
    return hmac.update(data.toString()).digest("hex"); //diget func will return the hashed value in "hex" format;
  }
}

module.exports = { hashService: new HashService() };
