const validateEmail=(email)=> {
const result =email.match(/^[^\d\W]\w*@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
)
return result
}
module.exports =validateEmail;