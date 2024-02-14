const bcrypt =require("bcryptjs");
const comparepassword =(password,hashedPassword) =>{
  return  bcrypt.compare(password,hashedPassword)

}
module.exports =comparepassword;