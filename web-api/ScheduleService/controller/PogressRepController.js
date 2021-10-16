const ProgressDTO = require('../model/ProgressDTO');
const nodemailer = require('nodemailer');
const config = require('../../Config/config.json');
const ScheduleDTO = require('../model/ScheduleDTO');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hirushanbim123@gmail.com',
        pass: 'Janith@12345'
    }
})

const saveProgress = async(req, res, next) => {
    const _proObj = req.body;

    // console.log(_proObj);

    // console.log('Ena Enwa')
    const _updaetData = await ScheduleDTO.updateOne({ scheduleNo: _proObj.scheduleNo }, {
        $push: { schProgressReport: { $each: [_proObj] } }
    })
    if (_updaetData) {
        res.status(200).json({ isSaved: true, data: _updaetData })
    } else {
        res.status(500).json('error');
    }


    // ProgressDTO.findOne({ progressReportNumber: req.body.progressReportNumber }).then(result => {
    //     if (result == null) {
    //         const progress = new ProgressDTO(req.body);
    //         progress.save().then(result => {
    //             res.status(200).json({ isSaved: true, data: result })
    //         }).catch(error => {
    //             res.status(500).json(error);
    //         })
    //     } else {
    //         res.status(200).json({ isSaved: false, data: result });
    //     }
    // }).catch(er => {
    //     res.status(500).json(er);
    // });



    // console.log('awa')
    // console.log(req.body)
}

const sendProReport = async(req, res) => {
    // console.log(req.body);

    //console.log(req.body.supervisorEmail);
    sendProEmail(req.body.managerEmail, req.body.supervisorEmail,
        req.body.scheduleNo, req.body.locoNumber, req.body.locoCatId,
        req.body.progressReportNumber, req.body.extraNote, req.body.progressValue, req.body.supervisorName);


}
const getAllProgress = (req, resp) => {
    ProgressDTO.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(error);
    })
}

const sendOneProgress = (req, res) => {
    //console.log(req.params.id);
    ProgressDTO.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);

    }).catch(er => {
        res.status(500).json(er);
    });


}


const sendProEmail = (managerEmail, supervisorEmail, scheduleNo, locoNumber, locoCatId,
    progressReportNumber, extraNote, progressValue, supervisorName) => {
    //console.log(supervisorEmail)

    const mailOptions = {
        from: supervisorEmail,
        to: managerEmail,
        subject: 'Progress Report',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>New message</title>
<!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]-->
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
<!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<!--[if !mso]><!-- -->
<link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,400i,700,700i" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
<!--<![endif]-->
<style type="text/css">
#outlook a {
padding:0;
}
.es-button {
mso-style-priority:100!important;
text-decoration:none!important;
}
a[x-apple-data-detectors] {
color:inherit!important;
text-decoration:none!important;
font-size:inherit!important;
font-family:inherit!important;
font-weight:inherit!important;
line-height:inherit!important;
}
.es-desk-hidden {
display:none;
float:left;
overflow:hidden;
width:0;
max-height:0;
line-height:0;
mso-hide:all;
}
[data-ogsb] .es-button {
border-width:0!important;
padding:15px 40px 15px 40px!important;
}
[data-ogsb] .es-button.es-button-1 {
padding:10px 35px!important;
}
[data-ogsb] .es-button.es-button-2 {
padding:15px 60px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:72px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:72px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
</style>
</head>
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#1B1B1B">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#1B1B1B"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:no-repeat;background-position:center 100px;background-color:#1B1B1B">
<tr>
<td valign="top" style="padding:0;Margin:0">
<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
<tr>
<td align="center" style="padding:0;Margin:0">
<table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center" bgcolor="#080E0E">
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:10px">
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:600px">
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;position:relative"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img class="adapt-img" src="https://tffomt.stripocdn.email/content/guids/bannerImgGuid/images/image163439791113359.png" alt="Womens equality day" title="Womens equality day" width="600" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
<table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
<tr>
<td align="center" bgcolor="#dec699" style="padding:0;Margin:0;background-color:#dec699">
<table bgcolor="#dec699" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#dec699;width:600px">
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;padding-right:20px">
<!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:314px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:314px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:10px;padding-left:30px;padding-right:40px;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img class="adapt-img" src="https://tffomt.stripocdn.email/content/guids/CABINET_97a1a80a4a445875f0d0d32ae5067dcb/images/g3ede4fce74051d2cabe2551e711298722c840b6b5548e829958bc6e57f5df5ed595196ae8cfd65c8f237c8a1fe985003_640.jpg" alt="CARD" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="CARD" width="244"></a></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:246px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr>
<td align="left" style="padding:0;Margin:0;width:246px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" class="es-m-p20l" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#1b1b1b"><span style="color:#FFFFFF">Locomotive <strong>${locoCatId}</strong></span><strong><span style="color:#FF8C00"> ${locoNumber}</span></strong></h3></td>
</tr>
<tr>
<td align="left" class="es-m-p20l" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#000000;font-size:14px">Report Number: <strong>${progressReportNumber}</strong><br>Schedule Number: <strong>${scheduleNo}</strong><br>Schedule Progress:<strong> ${progressValue}%</strong><br>Supervisor Name: <strong>${supervisorName}</strong></p></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td></tr></table><![endif]--></td>
</tr>
</table></td>
</tr>
</table>
<table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr>
<td align="center" style="padding:0;Margin:0">
<table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#EFEFEF;font-size:18px"><strong>Notes</strong></p></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
<table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td style="padding:0;Margin:0;border-bottom:1px solid #dec699;background:none;height:1px;width:100%;margin:0px"></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
<table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
<tr>
<td align="center" style="padding:0;Margin:0">
<table class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr>
<td align="left" style="padding:20px;Margin:0">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#EFEFEF;font-size:14px"><i>${extraNote}</i></p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
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
    saveProgress,
    getAllProgress,
    sendOneProgress
}