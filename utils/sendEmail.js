const nodemail =require("nodemailer");
const {senderEmail,emailPassword} =require("../config/kyes");
const sendEmail =async({emailTo,subject,code,content})=>{
    const transporter =nodemail.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{

            user:senderEmail,
            pass:emailPassword,

        }
    });
    const message={
        to:emailTo,
        subject,
        html:`<div>
        <h1>T H A N O S</h1>
        <h3>use this below code to ${content}</h3>
        <p><strong>Code: </strong>${code}</p>
        </div>`
    };
    await transporter.sendMail(message)

    //cvop hxaf veak plyy

};

module.exports =sendEmail;