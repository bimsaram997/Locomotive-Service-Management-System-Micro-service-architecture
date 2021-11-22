const ScheduleSchema = require('../model/ScheduleDTO');
const MileageDTO = require('../model/MileageDTO');
const LoadTrialDTO = require('../model/LoadTrialDTO');
const LocoDTO = require('../model/LocomotiveDTO');
const CommentDTO = require('../model/commentDTO');
const feedLoadTrialDTO = require('../model/feedLoadTrialDTO');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hirushanbim123@gmail.com',
        pass: 'Janith@12345'
    }
})

//Load Trilas
const saveLoadTrial = async(req, res, next) => {

    LoadTrialDTO.findOne({ loadNo: req.body.loadNo }).then(result => {
        if (result == null) {
            const loadTrial = new LoadTrialDTO(req.body);
            loadTrial.save().then(result => {
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
}


const loadTrialEmail = async(req, res, next) => {
    //console.log(req.body);
    if (req.body.supervisorEmail) {
        const supEmail = req.body.supervisorEmail;
        const scheduleNo = req.body.scheduleNo;
        const loadNo = req.body.loadNo
        const locoCatId = req.body.locoCatId;
        const locoNumber = req.body.locoNumber;
        const specialNote = req.body.loadNote;
        const adminEmail = "gilchrista037@gmail.com"

        const mailOptions = {
            from: supEmail,
            to: adminEmail,
            subject: "New Load Trial",
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'Open Sans', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>New message 2</title>
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
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
<!--<![endif]-->
<style type="text/css">
#outlook a {
padding:0;
}
.ExternalClass {
width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height:100%;
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
.es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
background:#004ed6!important;
border-color:#004ed6!important;
}
[data-ogsb] .es-button {
border-width:0!important;
padding:15px 30px 15px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:28px!important; text-align:left } h2 { font-size:20px!important; text-align:left } h3 { font-size:14px!important; text-align:left } h1 a { text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px!important } h2 a { text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:20px!important } h3 a { text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:14px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:14px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:14px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style>
</head>
<body style="width:100%;font-family:'Open Sans', sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#EFF2F7">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#eff2f7"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td valign="top" style="padding:0;Margin:0">
<table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#0050D8;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td align="center" bgcolor="#464646" style="padding:0;Margin:0;background-color:#464646">
<table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#333333" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#333333;width:600px">
<tr style="border-collapse:collapse">
<td align="left" bgcolor="#ffffff" style="Margin:0;padding-left:15px;padding-right:15px;padding-top:30px;padding-bottom:30px;background-color:#ffffff">
<!--[if mso]><table style="width:570px" cellpadding="0" cellspacing="0"><tr><td style="width:320px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;width:320px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://tffomt.stripocdn.email/content/guids/CABINET_72df46029c76611b99703b34cdd6440e/images/g475b23f906f0ad2f01b2c428c1f2487913dd134415785fa2d1c22db84743e6a786293c9250e5bfd9939269335e5dce4d_640.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="320"></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:230px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;width:230px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:16px;font-style:normal;font-weight:bold;color:#888888;letter-spacing:0px">NEW&nbsp;</h3></td>
</tr>
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#3C4858">LOAD TRIAL</h1></td>
</tr>
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:17px;color:#000000;font-size:14px"><br>Load Trial for schedule No. <span style="font-size:15px"><strong><span style="color:#FF8C00">${scheduleNo}</span></strong></span> {on<span style="color:#0000FF"><strong><span style="font-size:15px">${locoCatId} ${locoNumber}</span></strong></span>} has been completed.<br>&nbsp;<br>Please take your necessary actions</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:18px;color:#8492a6;font-size:15px;text-align:center"><br></p><h2 style="Margin:0;line-height:19px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:16px;font-style:normal;font-weight:normal;color:#8492a6;text-align:center"><strong><u></u></strong></h2><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:17px;color:#000000;font-size:14px;text-align:left"><br></p></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td></tr></table><![endif]--></td>
</tr>
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;padding-left:15px;padding-right:15px;padding-top:20px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="center" valign="top" style="padding:0;Margin:0;width:570px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#ffffff;text-align:center"><u><strong>Special Notes on Load No. ${loadNo}</strong></u></h2><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'Open Sans', sans-serif;line-height:18px;color:#EFEFEF;font-size:12px"><br><span style="font-size:14px"><em>${specialNote}</em></span><br></p></td>
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
</html>`,
        };
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                //cb(err, null);
            } else {
                // cb(null, data);
            }
        });
    } else {
        res.status(500).json(err);
    }
};



const getLoadTrialAssigned = async(req, resp, next) => {
    //console.log(resp)
    // LoadTrialDTO.find().then(result => {
    //     resp.status(200).json(result);
    // }).catch(error => {
    //     resp.status(500).json(result)
    // })

    if (req.query.userRole == 'Chief Engineer' || req.query.userRole == 'Clerk') {
        await LoadTrialDTO.find().sort({ loadDate: -1 }).then(result => {
            resp.status(200).json(result);

        }).catch(error => {
            resp.status(500).json(result)
        });

    } else if (req.query.userRole == 'Supervisor') {
        await LoadTrialDTO.find({ supervisorNic: req.query.userNic }).sort({ loadDate: -1 }).then(result => {
            resp.status(200).json(result);
            //console.log(result);
        }).catch(error => {
            resp.status(500).json(result)
        });
    } else if (req.query.userRole == 'Service Manager') {
        await LoadTrialDTO.find({ managerNic: req.query.userNic }).sort({ loadDate: -1 }).then(result => {
            resp.status(200).json(result);
            //console.log(result);
        }).catch(error => {
            resp.status(500).json(result)
        });
    }

};
const getOneLoad = (req, res) => {
    //console.log(req.params.id);
    LoadTrialDTO.find({
        loadNo: req.params.loadNo
    }).then(result => {
        res.status(200).json(result);
        console.log(req.params.loadNo)
    }).catch(er => {
        res.status(500).json(er);
    });

}



//Comments
const makeComment = (req, resp, next) => {
    CommentDTO.findOne({ commentId: req.body.commentId }).then(result => {
        if (result == null) {
            const comment = new CommentDTO(req.body);
            comment.save().then(result => {
                resp.status(200).json({ isSaved: true, data: result })

            }).catch(error => {
                resp.status(500).json(error);
            })

        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });

}

const addComment = async(req, resp) => {
    // console.log(req.body);
    if (req.body) {
        await LoadTrialDTO.updateOne({ loadNo: req.body.loadNo }, { $set: req.body }, function(err, result) {

                if (err) {
                    resp.status(500).json(err)

                } else {
                    resp.status(200).json(result)

                }

            })
            // await ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, { $set: { scheduleStatus: 7, schReason: "Load Trial Reviewed and Passed" } }, function(err, result) {

        //     if (err) {
        //         resp.status(500).json(err)

        //     } else {
        //         resp.status(200).json(result)

        //     }

        // })
    }
}

const getAllComments = async(req, resp, next) => {
    await CommentDTO.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(error);
    })
}

getLoadComments = async(req, resp, next) => {
    const _id = req.params.id;
    //console.log(_id);
    await CommentDTO.find({ loadNo: _id }, function(err, result) {
        if (err) {
            resp.status(500).json(err)
        } else {
            resp.status(200).json(result)

        }
    })
}
const getOneComment = async(req, res) => {
    //console.log(req.params.id);
    await CommentDTO.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}
const changeStatusComment = async(req, res, next) => { //change status of the comment after adding feedbacks by user
    const _obj = req.body;
    //console.log(_obj);
    //console.log(_obj.status)
    if (_obj.status = 2) {
        if (_obj.commentId) {
            console.log(_obj.commentId)
            await CommentDTO.updateOne({ commentId: _obj.commentId }, { $set: { status: 4, reason: "Resolved issues on Comments" } }, function(err, result) {

                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result)

                }
            })
        }
    }
}

const getResolvedComments = async(req, res, next) => {
    const obj = req.params.loadNo


    await CommentDTO.find({ loadNo: req.params.loadNo, status: 4 })
        .then(result => {
            res.status(200).json(result);

        }).catch(er => {
            res.status(500).json(er);
        });


}

const commentEmail = async(req, res, next) => {

    // console.log(req.body.commentId);
    if (req.body.supervisorEmail) {
        const chiefEmail = req.body.chiefEngEmail;
        const supEmail = req.body.supervisorEmail;
        const comments = req.body.comments;
        const commentId = req.body.commentId;
        const locoCatId = req.body.locoCatId
        const locoNumber = req.body.locoNumber;
        const loadNo = req.body.loadNo;
        const idVal = req.body.loadSid;

        // const mRepNo = req.body.mReportNumber;
        // const id = req.body.id;
        // const locoCat = req.body.mLocoCatId
        // const locoNumber = req.body.mLocoNumber;
        // const date = req.body.mileageDate;


        const mailOptions = {
            from: chiefEmail,
            to: supEmail,
            subject: 'New Comment on Load Trial ' + loadNo,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>New message 3</title>
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
<link href="https://stripo.email/" rel="stylesheet">
<!--<![endif]-->
<style type="text/css">
.rollover div {
font-size:0;
}
.section-title {
padding:10px 15px;
background-color:#f6f6f6;
border:1px solid #dfdfdf;
outline:0;
border-radius:8px;
margin-bottom:15px;
}
#outlook a {
padding:0;
}
.ExternalClass {
width:100%;
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height:100%;
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
padding:15px 30px 15px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:26px!important; text-align:left } h2 { font-size:22px!important; text-align:left } h3 { font-size:18px!important; text-align:left } h1 a { text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:26px!important } h2 a { text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:22px!important } h3 a { text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:18px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:12px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:12px!important; display:inline-block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style>
</head>
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#F0F0F0">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f0f0f0"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td align="center" bgcolor="#222222" style="padding:0;Margin:0;background-color:#222222">
<table bgcolor="#0081ff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#0081ff;width:600px">
<tr style="border-collapse:collapse">
<td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:15px;padding-right:15px">
<!--[if mso]><table style="width:570px" cellpadding="0" cellspacing="0"><tr><td style="width:275px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr style="border-collapse:collapse">
<td align="center" valign="top" style="padding:0;Margin:0;width:275px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" class="es-m-txt-c" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:35px;color:#efefef;font-size:23px"><strong>NEW <span style="font-size:25px;color:#000080">COMMENT</span></strong></p></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:275px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;width:275px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="right" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://tffomt.stripocdn.email/content/guids/CABINET_3d75dc486c798839006ab717afb3f815/images/comment256_g2z.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="45"></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td></tr></table><![endif]--></td>
</tr>
</table></td>
</tr>
</table>
<table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td align="center" bgcolor="#222222" style="padding:0;Margin:0;background-color:#222222">
<table bgcolor="#222222" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#222222;width:600px">
<tr style="border-collapse:collapse">
<td align="left" bgcolor="#f1f5f8" style="padding:0;Margin:0;padding-top:15px;padding-left:15px;padding-right:15px;background-color:#f1f5f8">
<!--[if mso]><table style="width:570px" cellpadding="0" cellspacing="0"><tr><td style="width:340px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr style="border-collapse:collapse">
<td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:340px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;padding-top:10px">
<ul>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;Margin-bottom:15px;color:#000000;font-size:15px">New Comment is added by Chief Engineer on <span style="font-size:16px;color:#ff8c00"><strong>Load Trial No. ${loadNo}</strong></span>.</li>
</ul><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;color:#000000;font-size:15px"><br>&nbsp; &nbsp; <span style="color:#000080"><u><strong><span style="font-size:17px">Other Details</span></strong></u></span></p>
<ul>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;Margin-bottom:15px;color:#000000;font-size:15px">Comment No : <span style="font-size:16px"><strong><span style="color:#FF8C00">${commentId}</span></strong></span></li>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;Margin-bottom:15px;color:#000000;font-size:15px">Locomotive :<span style="color:#ff8c00;font-size:16px"><strong> ${locoCatId} ${locoNumber}</strong></span>&nbsp;</li>
</ul></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td><td style="width:30px"></td><td style="width:200px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;width:200px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="right" class="es-m-txt-r" style="padding:0;Margin:0;padding-top:15px;font-size:0px"><img src="https://tffomt.stripocdn.email/content/guids/CABINET_3d75dc486c798839006ab717afb3f815/images/g39c93926999a501e22457c767c5fd694e10ffe8355077c5a79f898c6a5abf1d9f0fd1e4bca16ed976a010274e4ce8f5e_640.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;border-radius:4px" width="200"></td>
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
<tr style="border-collapse:collapse">
<td align="center" bgcolor="#222222" style="padding:0;Margin:0;background-color:#222222">
<table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;padding-top:15px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="center" valign="top" style="padding:0;Margin:0;width:600px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:29px;color:#000080;font-size:19px;text-align:center"><strong><u>Special Notes</u></strong></p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
<tr style="border-collapse:collapse">
<td align="left" style="Margin:0;padding-top:30px;padding-bottom:30px;padding-left:30px;padding-right:30px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="center" valign="top" style="padding:0;Margin:0;width:540px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;color:#696969;font-size:15px"><em>${comments}.</em></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:23px;color:#333333;font-size:15px"><em><span style="color:#696969"></span></em></p></td>
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
</html>`,

        };
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                //cb(err, null);
            } else {
                // cb(null, data);
            }

        })

    } else {
        res.status(500).json(err);
    }

}

///


const acceptLoadTrial = async(req, res) => { //accept LoadTrial

    if (req.params.loadNo) {
        LoadTrialDTO.updateOne({ loadNo: req.params.loadNo }, { $set: { status: 2, reason: "Load Trial is Passed" } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }

        })

    }



}


//feedbacks


const addFeedBack = (req, resp, next) => {
    feedLoadTrialDTO.findOne({ feedId: req.body.feedId }).then(result => {
        if (result == null) {
            const feedback = new feedLoadTrialDTO(req.body);
            feedback.save().then(result => {
                resp.status(200).json({ isSaved: true, data: result })
                    //onsole.log(result)
            }).catch(error => {
                resp.status(500).json(error);
            })

        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });

}

const getOneFeedBack = async(req, res, next) => {

    await feedLoadTrialDTO.find({
        commentId: req.params.commentId
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}

const feedbackEmail = async(req, res, next) => {

    // console.log(req.body.commentId);
    if (req.body.feedId) {
        const chiefEmail = req.body.chiefEngEmail;
        const supEmail = req.body.supervisorEmail;
        const comments = req.body.comments;
        const commentId = req.body.commentId;
        const locoCatId = req.body.locoCatId
        const locoNumber = req.body.locoNumber;
        const loadNo = req.body.loadNo;
        const feedId = req.body.feedId;
        const action = req.body.action
        console.log(req.body.feedId);
        // const mRepNo = req.body.mReportNumber;
        // const id = req.body.id;
        // const locoCat = req.body.mLocoCatId
        // const locoNumber = req.body.mLocoNumber;
        // const date = req.body.mileageDate;


        const mailOptions = {
            from: supEmail,
            to: chiefEmail,
            subject: 'Feed back on Comment No' + commentId,
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
<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
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
padding:10px 30px 10px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:60px!important; text-align:center } h2 { font-size:36px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:60px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:36px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style>
</head>
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#000000">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#000000"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#000000">
<tr>
<td valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr>
<td align="center" style="padding:0;Margin:0">
<table bgcolor="#2d2b2b" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#2d2b2b;width:600px">
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:28px;mso-line-height-rule:exactly;font-family:Montserrat, sans-serif;font-size:23px;font-style:normal;font-weight:bold;color:#F1C232;text-align:center"><strong><span style="color:#FFFFFF">NEW</span> FEEDBACK</strong></h3></td>
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
<table bgcolor="#2d2b2b" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#2d2b2b;width:600px">
<tr>
<td align="left" style="padding:20px;Margin:0">
<!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:202px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr>
<td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:202px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:40px;font-size:0px"><img class="adapt-img" src="https://tftccl.stripocdn.email/content/guids/CABINET_8fe809418ad1dce1a445edc78ba40ecb/images/g8b4f214054a97df96cdc4595acd158e0a79ed32eb5146eaa306b915b78a8ea60bf7453632f3bc4aec407afb57ffa4116_640.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="202"></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:338px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr>
<td align="left" style="padding:0;Margin:0;width:338px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:20px"><h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:Montserrat, sans-serif;font-size:17px;font-style:normal;font-weight:bold;color:#F1C232">DEAR CHEIF ENGINEER,</h3></td>
</tr>
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">Supervisor resolved the <span style="color:#FF8C00"><strong>${comments} </strong></span>issue by taking <span style="color:#FF8C00"><strong>${action} </strong></span>on<span style="color:#FF8C00"><strong> Load Trial No.${loadNo}</strong></span>. Please take necessary actions.</p></td>
</tr>
<tr>
<td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0">
<table border="0" width="85%" height="100%" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;display:inline-table;width:85% !important" role="presentation">
<tr>
<td style="padding:0;Margin:0;border-bottom:2px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
</tr>
</table></td>
</tr>
<tr>
<td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><h2 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:Montserrat, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#daa520;text-align:center"><u>Other Details</u></h2>
<ul>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;font-size:14px">Locomotive: <span style="color:#FF8C00"><strong>${locoCatId} ${locoNumber}</strong></span></li>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;font-size:14px">Comment No: <span style="color:#FF8C00"><strong>${commentId}</strong></span></li>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;Margin-bottom:15px;color:#FFFFFF;font-size:14px">Feedback No: <span style="color:#FF8C00"><strong>${feedId}</strong></span></li>
</ul></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td></tr></table><![endif]--></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
</div>
</body>
</html>`,

        };
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                //cb(err, null);
            } else {
                // cb(null, data);
            }

        })

    } else {
        res.status(500).json(err);
    }

}


module.exports = {
    saveLoadTrial,
    loadTrialEmail,
    getLoadTrialAssigned,
    getOneLoad,
    acceptLoadTrial,

    addComment,
    makeComment,
    getLoadComments,
    getAllComments,
    getOneComment,
    changeStatusComment,
    getResolvedComments,
    commentEmail,

    addFeedBack,
    getOneFeedBack,
    feedbackEmail
}