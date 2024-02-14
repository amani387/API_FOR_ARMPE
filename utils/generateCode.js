const generateCode =(codelengeth)=>{
const number =String(Math.random()).split(".")[1].split("");
const length =number.length;
let code ="";
if(!codelengeth){
    codelengeth =4
}
for(let i = 0;i < codelengeth;i++){
  code = code + number[length - (i+1)]
}
return code;
}
module.exports=generateCode;