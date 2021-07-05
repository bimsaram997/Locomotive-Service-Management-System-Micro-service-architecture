const ProgressDTO = require('../model/ProgressDTO');
const nodemailer = require('nodemailer');
const config = require('../../Config/config.json')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hirushanbim123@gmail.com',
        pass: 'Janith@12345'
    }
})

const saveProgress = (req, res) => {

    ProgressDTO.findOne({ progressReportNumber: req.body.progressReportNumber }).then(result => {
        if (result == null) {
            const progress = new ProgressDTO(req.body);
            progress.save().then(result => {
                res.status(200).json({ isSaved: true, data: result })
            }).catch(error => {
                res.status(500).json(error);
            })
        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });



    console.log('awa')
    console.log(req.body)
}

const sendProReport = async(req, res) => {
    console.log(req.body);

    console.log(req.body.supervisorEmail);
    sendProEmail(req.body.managerEmail, req.body.scheduleNo, req.body.supervisorEmail,
        req.body.progressReportNumber, req.body.extraNote, req.body.progressValue, req.body.supervisorName);


}




const sendProEmail = (managerEmail, scheduleNo, supervisorEmail, progressReportNumber, extraNote, progressValue, supervisorName) => {
    console.log(supervisorEmail)

    const mailOptions = {
        from: supervisorEmail,
        to: managerEmail,
        subject: 'progress Report',
        html: `<!DOCTYPE html>
<html>
 <head>
  <title>
  </title>
  <meta content="summary_large_image" name="twitter:card">
  <meta content="website" property="og:type">
  <meta content="" property="og:description">
  <meta content="https://pro-bee-beepro-messages.s3.amazonaws.com/679187/661655/1296946/6324566.html" property="og:url">
  <meta content="https://pro-bee-beepro-thumbnails.s3.amazonaws.com/messages/679187/661655/1296946/6324566_large.jpg" property="og:image">
  <meta content="" property="og:title">
  <meta content="" name="description">
  <meta charset="utf-8">
  <meta content="width=device-width" name="viewport">
  <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&amp;display=swap" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
  <style>
   .bee-row-1 .bee-row-content,
\t\t.bee-row-4 {
\t\t\tbackground-position: top center;
\t\t\tbackground-repeat: no-repeat
\t\t}

\t\t.bee-row-1,
\t\t.bee-row-1 .bee-row-content,
\t\t.bee-row-2,
\t\t.bee-row-3,
\t\t.bee-row-3 .bee-row-content,
\t\t.bee-row-4,
\t\t.bee-row-5,
\t\t.bee-row-5 .bee-row-content {
\t\t\tbackground-repeat: no-repeat
\t\t}

\t\tbody {
\t\t\tbackground-color: #fff;
\t\t\tcolor: #000;
\t\t\tfont-family: Arial, Helvetica Neue, Helvetica, sans-serif
\t\t}

\t\ta {
\t\t\tcolor: #0068a5
\t\t}

\t\t.bee-row-1,
\t\t.bee-row-3 {
\t\t\tbackground-color: #000
\t\t}

\t\t.bee-row-1 .bee-row-content {
\t\t\tbackground-image: url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wallpaperflare.com%2Fgray-train-rail-railway-landscape-railroad-track-transportation-wallpaper-eli&psig=AOvVaw1rL1QtH74muscmf8NRqaeQ&ust=1624030752774000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMCcjpWAn_ECFQAAAAAdAAAAABAJ)
\t\t}

\t\t.bee-row-1 .bee-col-1 {
\t\t\tborder-bottom: 0 solid transparent;
\t\t\tborder-left: 0 solid transparent;
\t\t\tborder-right: 0 solid transparent;
\t\t\tborder-top: 0 solid #fff;
\t\t\tpadding-bottom: 10px;
\t\t\tpadding-top: 20px
\t\t}

\t\t.bee-row-1 .bee-col-1 .bee-block-1,
\t\t.bee-row-2 .bee-col-1 .bee-block-1,
\t\t.bee-row-2 .bee-col-1 .bee-block-3,
\t\t.bee-row-4 .bee-col-1 .bee-block-1,
\t\t.bee-row-4 .bee-col-1 .bee-block-5,
\t\t.bee-row-5 .bee-col-2 .bee-block-1,
\t\t.bee-row-5 .bee-col-2 .bee-block-2,
\t\t.bee-row-5 .bee-col-2 .bee-block-3 {
\t\t\tpadding: 10px
\t\t}

\t\t.bee-row-1 .bee-col-1 .bee-block-2 {
\t\t\twidth: 100%;
\t\t\tpadding: 20px
\t\t}

\t\t.bee-row-1 .bee-col-1 .bee-block-3 {
\t\t\tpadding: 20px
\t\t}

\t\t.bee-row-1 .bee-col-1 .bee-block-4 {
\t\t\ttext-align: center;
\t\t\twidth: 100%;
\t\t\tpadding: 20px
\t\t}

\t\t.bee-row-2 {
\t\t\tbackground-color: #040404
\t\t}

\t\t.bee-row-2 .bee-row-content,
\t\t.bee-row-4 .bee-row-content {
\t\t\tbackground-color: #092147;
\t\t\tbackground-repeat: no-repeat
\t\t}

\t\t.bee-row-2 .bee-col-1,
\t\t.bee-row-3 .bee-col-1,
\t\t.bee-row-4 .bee-col-1,
\t\t.bee-row-5 .bee-col-1,
\t\t.bee-row-5 .bee-col-2 {
\t\t\tborder-bottom: 0 solid transparent;
\t\t\tborder-left: 0 solid transparent;
\t\t\tborder-right: 0 solid transparent;
\t\t\tborder-top: 0 solid transparent;
\t\t\tpadding-bottom: 5px;
\t\t\tpadding-top: 5px
\t\t}

\t\t.bee-row-2 .bee-col-1 .bee-block-2 {
\t\t\ttext-align: center;
\t\t\twidth: 100%
\t\t}

\t\t.bee-row-2 .bee-col-1 .bee-block-4,
\t\t.bee-row-3 .bee-col-1 .bee-block-3 {
\t\t\tpadding: 15px
\t\t}

\t\t.bee-row-3 .bee-row-content,
\t\t.bee-row-5 .bee-row-content {
\t\t\tbackground-color: #fff
\t\t}

\t\t.bee-row-3 .bee-col-1 .bee-block-1 {
\t\t\tpadding-left: 20px;
\t\t\ttext-align: center;
\t\t\twidth: 100%
\t\t}

\t\t.bee-row-3 .bee-col-1 .bee-block-2 {
\t\t\tpadding: 10px 10px 10px 20px
\t\t}

\t\t.bee-row-4 {
\t\t\tbackground-color: #000
\t\t}

\t\t.bee-row-4 .bee-col-1 .bee-block-2 {
\t\t\ttext-align: center;
\t\t\twidth: 100%;
\t\t\tpadding: 10px 10px 10px 5px
\t\t}

\t\t.bee-row-4 .bee-col-1 .bee-block-3 {
\t\t\ttext-align: center;
\t\t\twidth: 100%;
\t\t\tpadding: 10px
\t\t}

\t\t.bee-row-4 .bee-col-1 .bee-block-4 {
\t\t\ttext-align: center;
\t\t\tpadding: 10px 10px 10px 20px
\t\t}

\t\t.bee-row-5 {
\t\t\tbackground-color: #43b4f8
\t\t}

\t\t.bee-row-5 .bee-col-1 .bee-block-1 {
\t\t\twidth: 100%
\t\t}

\t\t* {
\t\t\tbox-sizing: border-box
\t\t}

\t\tbody,
\t\tp {
\t\t\tmargin: 0
\t\t}

\t\t.bee-row-content {
\t\t\tmax-width: 680px;
\t\t\tmargin: 0 auto;
\t\t\tdisplay: flex
\t\t}

\t\t.bee-row-content .bee-col-w4 {
\t\t\tflex: 4
\t\t}

\t\t.bee-row-content .bee-col-w8 {
\t\t\tflex: 8
\t\t}

\t\t.bee-row-content .bee-col-w12 {
\t\t\tflex: 12
\t\t}

\t\t.bee-image img {
\t\t\tdisplay: block;
\t\t\ttext-align: center;
\t\t\twidth: 100%
\t\t}

\t\t.bee-divider,
\t\t.bee-image {
\t\t\toverflow: auto
\t\t}

\t\t.bee-divider .bee-center,
\t\t.bee-image .bee-center {
\t\t\tmargin: 0 auto
\t\t}

\t\t.bee-text {
\t\t\toverflow-wrap: anywhere
\t\t}

\t\t.bee-button .content {
\t\t\ttext-align: center
\t\t}

\t\t.bee-button a {
\t\t\ttext-decoration: none
\t\t}

\t\t.bee-heading h1 {
\t\t\tmargin-top: 0;
\t\t\tmargin-bottom: 0
\t\t}

\t\t@media (max-width:700px) {
\t\t\t.bee-row-content:not(.no_stack) {
\t\t\t\tdisplay: block
\t\t\t}
\t\t}
  </style>
 </head>
 <body>
  <div class="bee-page-container">
   <div class="bee-row bee-row-1">
    <div class="bee-row-content">
     <div class="bee-col bee-col-1 bee-col-w12">
      <div class="bee-block bee-block-1 bee-divider">
      </div>
      <div class="bee-block bee-block-3 bee-text">
       <div class="bee-text-content" style="line-height: 150%; font-size: 12px; font-family: 'Noto Sans', sans-serif; color: #ffffff;">
        <p style="font-size: 14px; line-height: 21px; text-align: center; letter-spacing: 1px;">
         <span style="font-size: 30px; line-height: 45px; text-align: center">
          <strong style="text-align: center">
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Progress Report&nbsp; ${progressReportNumber}
          </strong>
         </span>
        </p>
       </div>
      </div>
      <div class="bee-block bee-block-4 bee-heading">
      </div>
     </div>
    </div>
   </div>
   <div class="bee-row bee-row-2">
    <div class="bee-row-content">
     <div class="bee-col bee-col-1 bee-col-w12">
      <div class="bee-block bee-block-1 bee-divider">
       <div class="spacer" style="height:0px;">
       </div>
      </div>
      <div class="bee-block bee-block-2 bee-heading">
       <h1 style="color:#ffffff;direction:ltr;text-align: center; font-family:'Noto Sans', sans-serif;font-size:20px;font-weight:normal;letter-spacing:1px;line-height:150%;text-align:center;">
        <strong>
         
          Basic Details
        </strong>
       </h1>
      </div>
      
      <div class="bee-block bee-block-4 bee-text">
       <div class="bee-text-content" style="line-height: 150%; font-size: 15px; font-weight: bold; font-family: 'Noto Sans', sans-serif; color: #ffffff;">
        <p style="font-size: 14px; line-height: 21px; text-align: center; letter-spacing: 1px;  text-decoration: underline overline; ">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Special notice of.....&nbsp;
        <br>
        </p>
       
       </div>
        <p style="color: white; font-size: 12;">${extraNote}</p>
      </div>
     </div>
    </div>
   </div>
   <div class="bee-row bee-row-3">
    <div class="bee-row-content">
     <div class="bee-col bee-col-1 bee-col-w12">
      <div class="bee-block bee-block-1 bee-heading">
       <h1 style="color:#092147;direction:ltr;font-family:'Noto Sans', sans-serif;font-size:20px;font-weight:normal;letter-spacing:1px;line-height:150%;text-align:center;">
        <strong>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       SCHEDULE
        </strong>
       </h1>
      </div>
      <div class="bee-block bee-block-3 bee-text">
       <div class="bee-text-content" style="line-height: 150%; font-size: 12px; font-family: 'Noto Sans', sans-serif; color: #555555;">
        <p style="font-size: 14px; line-height: 21px; text-align: center; letter-spacing: 1px;">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your schedule progress of Locomotive is.&nbsp; <b>${progressValue}</b>
        </p>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div class="bee-row bee-row-4">
    <div class="bee-row-content">
     <div class="bee-col bee-col-1 bee-col-w12">
      <div class="bee-block bee-block-2 bee-heading">
       <h1 style="color:#ffffff;direction:ltr;font-family:'Noto Sans', sans-serif;font-size:24px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;">
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See more details...
       </h1>
      </div>
      <div class="bee-block bee-block-3 bee-heading">
       <h1 style="color:#ffffff;direction:ltr;font-family:'Noto Sans', sans-serif;font-size:14px;font-weight:normal;letter-spacing:normal;line-height:150%;text-align:center;">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         Get hurry up! View your schedule progress
       </h1>
      </div>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div class="bee-block bee-block-4 bee-button"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <a class="bee-button-content" href="http://www.example.com/" style="font-size: 12px; line-height: 24px; font-family: 'Noto Sans', sans-serif; background-color: #3baefe; border-bottom: 1px solid transparent; border-left: 1px solid transparent; border-radius: 4px; border-right: 1px solid transparent; border-top: 1px solid transparent; color: #ffffff; max-width: 100%; padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 0px; width: auto; display: inline-block;">
        <span style="font-size: 16px; line-height: 200%; word-break: break-word;">
         <span style="font-size: 14px; line-height: 28px;">
          <strong>
           View
          </strong>
         </span>
        </span>
       </a>
      </div>
      </div>
     </div>
    </div>
   </div>
   <div class="bee-row bee-row-5">
    <div class="bee-row-content">
     <div class="bee-col bee-col-1 bee-col-w4">
      <div class="bee-block bee-block-1 bee-image">
       <img alt="I'm an image" class="bee-center bee-autowidth" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/679187_661655/man2.png" style="max-width:226px;">
      </div>
     </div>
     <div class="bee-col bee-col-2 bee-col-w8">
      <div class="bee-block bee-block-1 bee-text">
       <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: 'Nunito', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #555555;">
        <p style="line-height: 14px;">
         &nbsp;
        </p>
        <p style="font-size: 14px; line-height: 16px; text-align: left;">
         <strong style="">
          <span style="font-size: 20px; line-height: 24px;">
           Contact
          </span>
         </strong>
        </p>
       </div>
      </div>
      <div class="bee-block bee-block-2 bee-divider">
       <div class="bee-center" style="border-top:1px solid #BBBBBB;width:100%;">
       </div>
      </div>
      <div class="bee-block bee-block-3 bee-text">
       <div class="bee-text-content" style="line-height: 120%; font-size: 12px; font-family: inherit; color: #555555;">
       
        <ul style="">
         <li style="font-size: 16px; line-height: 19px; text-align: justify;">
          <span style="font-size: 16px; line-height: 19px;">
           Name:&nbsp; <b>${supervisorName}</b>
          </span>
         </li>
         <li style="font-size: 16px; line-height: 19px; text-align: justify;">
          <span style="font-size: 16px; line-height: 19px;">
           Email:&nbsp; <b>${supervisorEmail}</b> 
          </span>
         </li>
         <li style="font-size: 16px; line-height: 19px; text-align: justify;">
          <span style="font-size: 16px; line-height: 19px;">
           Mobile Number: 0768922413
          </span>
         </li>
        </ul>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </body>
</html>`, // html body
    };
    transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                //cb(null, data);
            }
        })
        // const {email, text} = req.body;
        // sendReqEmailContent(email, text, function (err, data) {
        //     if (err){
        //         resp.status(500).json({message: 'Internal error'});
        //         console.log(err)
        //     }else {
        //         resp.json({message: 'Email Sent'});
        //         console.log(resp)
        //     }
        // })
        // console.log("Data", req.body)
}
module.exports = {
    sendProReport,
    sendProEmail,
    saveProgress
}