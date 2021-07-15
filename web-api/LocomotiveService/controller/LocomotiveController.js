const LocomotiveSchema = require('../model/LocomotiveDTO')
const Schedule = require('../model/ScheduleDTO');
const MileageSchema = require('../model/MileageDTO');
const nodemailer = require('nodemailer');
const config = require('../../Config/config.json')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hirushanbim123@gmail.com',
        pass: 'Janith@12345'
    }
})

const getLocoSch = async(req, resp, next) => {
    const _id = req.params.id;
    console.log(_id)
    await Schedule.find({ locoNumber: _id }, function(err, result) {
        if (err) {
            resp.status(500).json(err)
        } else {
            resp.status(200).json(result)
            console.log(result)
        }
    })
}


const saveLoco = (req, resp) => {
    LocomotiveSchema.findOne({ locoNumber: req.body.locoNumber }).then(result => {
        if (result == null) {
            const loco = new LocomotiveSchema({
                locoCatId: req.body.locoCatId,
                locoPower: req.body.locoPower,
                locoNumber: req.body.locoNumber,
                locoMileage: req.body.locoMileage,
                locoAvailability: req.body.locoAvailability,
                userNic: req.body.userNic,
                locoDate: req.body.locoDate,
                locoOil: req.body.locoOil,
                locoFuel: req.body.locoFuel,
                locoWater: req.body.locoWater,
                locoMainGen: req.body.locoMainGen,
                locoTracMot: req.body.locoTracMot,
                locoVBreak: req.body.locoVBreak,
                locoDBreak: req.body.locoDBreak,
                locoNote: req.body.locoNote,
                image: req.body.image,
            });
            loco.save().then(result => {
                resp.status(200).json({ isSaved: true, data: result })
            }).catch(error => {
                resp.status(500).json(error);
            })
        } else {
            resp.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        resp.status(500).json(er);
    });


}

const saveReactiveLoco = async(req, res, next) => {

    LocomotiveSchema.findOne({ locoNumber: req.body.locoNumber }).then(result => {
        if (result == null) {
            const loco = new LocomotiveSchema(req.body);
            loco.save().then(result => {
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


const getAllLocomotives = async(req, resp, next) => {
    console.log(resp)
    LocomotiveSchema.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result)
    })
};

const getAllLocosSelect = async(req, resp) => {
    LocomotiveSchema.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result);
    })
}
const deleteLoco = (req, resp) => {
    LocomotiveSchema.deleteOne({ locoNumber: req.headers.id }).then(result => {
        if (result.deletedCount > 0) {
            resp.status(200).json({ message: 'deleted' });
        } else {
            resp.status(200).json({ message: 'try Again' });
        }
    }).catch(error => {
        resp.status(500).json({ error });
    })
};

const updateLocomotive = async(req, resp) => {
    console.log(req.body);
    if (req.body) {
        await LocomotiveSchema.updateOne({ locoNumber: req.body.locoNumber }, { $set: req.body }, function(err, result) {

            if (err) {
                resp.status(500).json(err)
                    //console.log(err)
            } else {
                resp.status(200).json(result)
            }

        })

    }
}

const getAllLocoAssigned = async(req, resp) => {
    console.log(req.query)
    if (req.query.userRole == 'Chief Engineer' || req.query.userRole == 'Service Manager' || req.query.userRole == 'Clerk') {
        await LocomotiveSchema.find().then(result => {
            resp.status(200).json(result);

        }).catch(error => {
            resp.status(500).json(result)
        });

    } else if (req.query.userRole == 'Supervisor') {
        await LocomotiveSchema.find({ userNic: req.query.userNic }).then(result => {
            resp.status(200).json(result);
            //console.log(result);
        }).catch(error => {
            resp.status(500).json(result)
        });
    }
}




/*const getInCount = (req, resp) => {
    LocomotiveSchema.count({ locoAvailability: 'In' }).then(result => {
        resp.status(200).json(result)
    }).catch(error => {
        resp.status(500).json(error);
    })
}
const getOutCount = (req, resp) => {
    LocomotiveSchema.count({ locoAvailability: 'Out' }).then(result => {
        resp.status(200).json(result)
    }).catch(error => {
        resp.status(500).json(error);
    })
}*/

const saveMileage = async(req, res, next) => {

    MileageSchema.findOne({ mReportNumber: req.body.mReportNumber }).then(result => {
        if (result == null) {
            console.log(result)
            const mileageReport = new MileageSchema(req.body);
            mileageReport.save().then(result => {
                console.log(result)
                res.status(200).json({ isSaved: true, data: result })
            }).catch(error => {
                res.status(500).json(error);
                console.log(error)
            })
        } else {
            res.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        res.status(500).json(er);
    });


}
const getAllMileage = async(req, resp, next) => {
    MileageSchema.find().then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result);
    })
}

const patchMileController = async(req, res, next) => {
    console.log(req.params.id)
    if (req.params.id) {
        await MileageSchema.updateOne({ _id: req.params.id }, { $set: { status: 2, reason: 'Accepted' } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }

        })

    }
}
const rejectMileController = async(req, res, next) => {
    console.log(req.params.id, req.params.reason);
    if (req.params.id) {
        await MileageSchema.updateOne({ _id: req.params.id }, { $set: { status: 4, reason: req.params.reason } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }

        })

    }

}

const getAcceptedMileage = (req, resp) => {
    MileageSchema.find({ status: 2 }).then(result => {
        resp.status(200).json(result);
    }).catch(error => {
        resp.status(500).json(result);
    })
}
const getOneMileage = (req, res) => {

    MileageSchema.find({
        mReportNumber: req.params.mReportNumber
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });


}

const getOneLoco = (req, res) => {
    console.log(req.params.id);
    LocomotiveSchema.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}
const getOneLocoNew = (req, res) => {
    console.log(req.params.mLocoNumber);
    LocomotiveSchema.find({
        locoNumber: req.params.mLocoNumber
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });


}

const sendLocoStatus = async(req, resp) => {
    console.log(req.body.image);
    const _findEmail = await LocomotiveSchema.findOne({ supervisorEmail: req.body.email });
    if (_findEmail != null) {
        console.log(req.body.supervisorEmail);
        sendPassEmail(req.body.supervisorEmail, req.body.locoNumber, req.body.locoCatId,
            req.body.locoAvailability, req.body.locoPower, req.body.locoNote, req.body.locoMileage, req.body.locoDate)
    } else {
        res.status(404).json({ message: false });
    }
}

const sendPassEmail = (supervisorEmail, locoNumber, locoCatId, locoAvailability, locoPower, locoNote, locoMileage, locoDate, cb) => {


    const mailOptions = {
        from: supervisorEmail,
        to: 'hirushanbim123@gmail.com',
        subject: 'Password Reset',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <title></title>
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css">
            <!--<![endif]-->
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                }
        
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                }
        
                * {
                    line-height: inherit;
                }
        
                a[x-apple-data-detectors=true] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
            </style>
            <style type="text/css" id="media-query">
                @media (max-width: 620px) {
        
                    .block-grid,
                    .col {
                        min-width: 320px !important;
                        max-width: 100% !important;
                        display: block !important;
                    }
        
                    .block-grid {
                        width: 100% !important;
                    }
        
                    .col {
                        width: 100% !important;
                    }
        
                    .col_cont {
                        margin: 0 auto;
                    }
        
                    img.fullwidth,
                    img.fullwidthOnMobile {
                        max-width: 100% !important;
                    }
        
                    .no-stack .col {
                        min-width: 0 !important;
                        display: table-cell !important;
                    }
        
                    .no-stack.two-up .col {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num2 {
                        width: 16.6% !important;
                    }
        
                    .no-stack .col.num3 {
                        width: 25% !important;
                    }
        
                    .no-stack .col.num4 {
                        width: 33% !important;
                    }
        
                    .no-stack .col.num5 {
                        width: 41.6% !important;
                    }
        
                    .no-stack .col.num6 {
                        width: 50% !important;
                    }
        
                    .no-stack .col.num7 {
                        width: 58.3% !important;
                    }
        
                    .no-stack .col.num8 {
                        width: 66.6% !important;
                    }
        
                    .no-stack .col.num9 {
                        width: 75% !important;
                    }
        
                    .no-stack .col.num10 {
                        width: 83.3% !important;
                    }
        
                    .video-block {
                        max-width: none !important;
                    }
        
                    .mobile_hide {
                        min-height: 0px;
                        max-height: 0px;
                        max-width: 0px;
                        display: none;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide {
                        display: block !important;
                        max-height: none !important;
                    }
                }
            </style>
        </head>
        
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
            <!--[if IE]><div class="ie-browser"><![endif]-->
            <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#FFFFFF" valign="top">
                <tbody>
                    <tr style="vertical-align: top;" valign="top">
                        <td style="word-break: break-word; vertical-align: top;" valign="top">
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
                            <div style="background-color:#132437;">
                                <div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/blue-glow_3.jpg');background-position:center top;background-repeat:no-repeat">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#132437;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <div class="img-container center fixedwidth" align="center" style="padding-right: 30px;padding-left: 30px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 30px;padding-left: 30px;" align="center"><![endif]-->
                                                        <div style="font-size:1px;line-height:35px">&nbsp;</div><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/684606_667138/editor_images/435bbbc8-edf2-411d-b50f-287ed37e9844.png" alt="Books Plus" title="Books Plus" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 150px; display: block;" width="150">
                                                        <div style="font-size:1px;line-height:35px">&nbsp;</div>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <div class="img-container center fixedwidth fullwidthOnMobile" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth fullwidthOnMobile" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/top-rounded.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 600px; display: block;" width="600">
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color:#132437;">
                                <div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#132437;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:10px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <div class="img-container center autowidth" align="center" style="padding-right: 20px;padding-left: 20px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 20px;padding-left: 20px;" align="center"><![endif]-->
                                                        <div style="font-size:1px;line-height:5px">&nbsp;</div><img class="center autowidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/684606_667138/editor_images/b0af3dff-fc8b-498e-98c3-79b141ec62b2.jpg" alt="book shelf" title="book shelf" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 560px; display: block;" width="560">
                                                        <div style="font-size:1px;line-height:5px">&nbsp;</div>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/orange-gradient-wide.png');background-position:top left;background-repeat:no-repeat;background-color:#ff7d14;">
                                <div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/orange-gradient-wide.png');background-position:top left;background-repeat:no-repeat;background-color:#ff7d14;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top">
                                                        <tr style="vertical-align: top;" valign="top">
                                                            <td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-left: 0px; padding-right: 0px; padding-top: 25px; text-align: center; width: 100%;" width="100%" align="center" valign="top">
                                                                <h1 style="color:#555555;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:36px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"><strong>LOCOMOTIVE ${locoCatId} ${locoNumber}</strong></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 20px; padding-bottom: 20px; font-family: Arial, sans-serif"><![endif]-->
                                                    <div style="color:#737487;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.8;padding-top:20px;padding-right:30px;padding-bottom:20px;padding-left:30px;">
                                                        <div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.8; color: #737487; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 25px;">
                                                            <p style="margin: 0; font-size: 18px; line-height: 1.8; word-break: break-word; text-align: center; mso-line-height-alt: 32px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px;">Locomotive has arrived to the shed. </span></p>
                                                            <p style="margin: 0; font-size: 18px; line-height: 1.8; word-break: break-word; text-align: center; mso-line-height-alt: 32px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px;">Please attention to this,</span></p>
                                                            <p style="margin: 0; font-size: 18px; line-height: 1.8; word-break: break-word; text-align: center; mso-line-height-alt: 32px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px;">"${locoNote}"</span></p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <div class="button-container" align="center" style="padding-top:20px;padding-right:15px;padding-bottom:30px;padding-left:15px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 20px; padding-right: 15px; padding-bottom: 30px; padding-left: 15px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.example.com" style="height:39pt;width:236.25pt;v-text-anchor:middle;" arcsize="8%" stroke="false" fillcolor="#ff7d14"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="https://www.example.com" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #ff7d14; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #ff7d14; border-right: 1px solid #ff7d14; border-bottom: 1px solid #ff7d14; border-left: 1px solid #ff7d14; padding-top: 10px; padding-bottom: 10px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">View More</span></span></a>
                                                        <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                                    </div>
                                                    <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/divider.png" alt="line" title="line" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 541px; display: block;" width="541">
                                                        <div style="font-size:1px;line-height:40px">&nbsp;</div>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color:#ff7d14;">
                                <div class="block-grid two-up" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ff7d14;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color:#ffffff;width:300px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 300px; width: 300px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                                    <div style="color:#393d47;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                        <div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #393d47; mso-line-height-alt: 17px;">
                                                            <p style="margin: 0; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;">&nbsp;</p>
                                                            <ul>
                                                                <li style="line-height: 1.2; mso-line-height-alt: NaNpx;"><span style="color: #2f2f2f;"><strong><span style="font-size: 17px; mso-ansi-font-size: 18px;">Loco Mileage:&nbsp;</span> ${locoMileage}</strong></span></li>
                                                                <li style="line-height: 1.2; mso-line-height-alt: NaNpx;"><span style="color: #2f2f2f;"><strong><span style="font-size: 17px; mso-ansi-font-size: 18px;">Loco Update Date:&nbsp;</span>${locoDate}</strong></span></li>
                                                                <li style="line-height: 1.2; mso-line-height-alt: NaNpx;"><span style="color: #2f2f2f;"><strong><span style="font-size: 17px; mso-ansi-font-size: 18px;">Loco Availability</span>${locoAvailability}</strong> </span></li>
                                                                <li style="line-height: 1.2; mso-line-height-alt: NaNpx;"><span style="color: #2f2f2f;"><strong><span style="font-size: 17px; mso-ansi-font-size: 18px;">Loco Power: </span>${locoPower} </strong></span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td><td align="center" width="300" style="background-color:#ffffff;width:300px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:40px;"><![endif]-->
                                        <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 300px; width: 300px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:40px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <div class="img-container center autowidth" align="center" style="padding-right: 40px;padding-left: 40px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 40px;padding-left: 40px;" align="center"><![endif]-->
                                                        <div style="font-size:1px;line-height:40px">&nbsp;</div><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/book-unlimited.gif" alt="book icon" title="book icon" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 110px; display: block;" width="110">
                                                        <div style="font-size:1px;line-height:40px">&nbsp;</div>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color:#ff7d14;">
                                <div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ff7d14;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                        <div style="font-size:1px;line-height:10px">&nbsp;</div><img class="center autowidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/divider.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 541px; display: block;" width="541">
                                                        <div style="font-size:1px;line-height:35px">&nbsp;</div>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 0px; padding-bottom: 0px; font-family: Arial, sans-serif"><![endif]-->
                                                    <div style="color:#07113e;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.8;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
                                                        <div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.8; color: #07113e; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 25px;">
                                                            <p style="margin: 0; font-size: 18px; line-height: 1.8; word-break: break-word; text-align: center; mso-line-height-alt: 32px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px;">Reach me:&nbsp; ${supervisorEmail}</span></p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <table class="social_icons" cellpadding="0" cellspacing="0" width="100%" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top">
                                                        <tbody>
                                                            <tr style="vertical-align: top;" valign="top">
                                                                <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 15px; padding-bottom: 15px; padding-left: 15px;" valign="top">
                                                                    <table class="social_table" align="center" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top; display: inline-block; text-align: center;" align="center" valign="top">
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;" valign="top"><a href="https://www.facebook.com/" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/circle-dark-gray/facebook@2x.png" alt="Facebook" title="Facebook" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"></a></td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;" valign="top"><a href="https://twitter.com/" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/circle-dark-gray/twitter@2x.png" alt="Twitter" title="Twitter" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"></a></td>
                                                                                <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;" valign="top"><a href="https://instagram.com/" target="_blank"><img width="32" height="32" src="https://d2fi4ri5dhpqd1.cloudfront.net/public/resources/social-networks-icon-sets/circle-dark-gray/instagram@2x.png" alt="Instagram" title="Instagram" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"></a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <div style="background-color:#ff7d14;">
                                <div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
                                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ff7d14;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                        <div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                            <div class="col_cont" style="width:100% !important;">
                                                <!--[if (!mso)&(!IE)]><!-->
                                                <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                    <!--<![endif]-->
                                                    <div class="img-container center fixedwidth fullwidthOnMobile" align="center" style="padding-right: 0px;padding-left: 0px;">
                                                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth fullwidthOnMobile" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/bottom-rounded.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 600px; display: block;" width="600">
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </div>
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top: 30px; padding-bottom: 5px; font-family: Arial, sans-serif"><![endif]-->
                                                    <div style="color:#262b30;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:30px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
                                                        <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #262b30; mso-line-height-alt: 14px;">
                                                            <p style="margin: 0; font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 12px;">© 2020 Company Name | 123 Main St. City, State, Country 12345</span></p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 35px; font-family: Arial, sans-serif"><![endif]-->
                                                    <div style="color:#262b30;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:5px;padding-right:10px;padding-bottom:35px;padding-left:10px;">
                                                        <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #262b30; mso-line-height-alt: 14px;">
                                                            <p style="margin: 0; font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 12px;">If you prefer not to receive marketing emails form this list, <a style="text-decoration: underline; color: #262b30;" href="http://www.example.com" target="_blank" rel="noopener">click here to unsubscribe</a>.</span></p>
                                                        </div>
                                                    </div>
                                                    <!--[if mso]></td></tr></table><![endif]-->
                                                    <!--[if (!mso)&(!IE)]><!-->
                                                </div>
                                                <!--<![endif]-->
                                            </div>
                                        </div>
                                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                        <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                                    </div>
                                </div>
                            </div>
                            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--[if (IE)]></div><![endif]-->
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

const patchFinalMile = async(req, res, next) => {
    const _obj = req.body;
    console.log(_obj);
    console.log(_obj.locoNumber)
    if (_obj.locoNumber) {
        await LocomotiveSchema.updateOne({ locoNumber: _obj.locoNumber }, { $set: { endMileage: _obj.endMileage, endMileDate: _obj.endMileDate } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)

            }

        })

    }
}
const patchLocoSchedule = async(req, res, next) => {
    console.log(req.params.locoNumber)
    if (req.params.locoNumber) {
        await LocomotiveSchema.updateOne({ locoNumber: req.params.locoNumber }, { $set: { locoStatus: 1, statusReason: 'I schedule' } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }

        })

    }

}


const patchSch = async(req, res, next) => {
    const _obj = req.body;
    console.log(_obj);
    console.log(_obj.locoNumber)
    if (_obj.locoNumber) {
        await LocomotiveSchema.updateOne({ locoNumber: _obj.locoNumber }, { $set: { locoStatus: 1, statusReason: "In a Service Schedule" } }, function(err, result) {

            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)

            }

        })

    }
}

const patchLoadLoco = async(req, res, next) => {
    const _obj = req.body;
    console.log(_obj);
    console.log(_obj.status)
    if (_obj.status = 2) {
        if (_obj.locoNumber) {
            console.log(_obj.locoNumber)
            await LocomotiveSchema.updateOne({ locoNumber: _obj.locoNumber }, { $set: { locoStatus: 2, statusReason: "Last Load Trial is Passed." } }, function(err, result) {

                if (err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json(result)

                }

            })

        }
    }

}
module.exports = {
    saveLoco,
    getAllLocomotives,
    getAllLocosSelect,
    deleteLoco,
    updateLocomotive,
    saveReactiveLoco,
    saveMileage,
    getAllMileage,
    patchMileController,
    rejectMileController,
    getOneLoco,
    getAcceptedMileage,
    getOneMileage,
    sendLocoStatus,
    sendPassEmail,
    getLocoSch,
    patchFinalMile,
    getOneLocoNew,
    getAllLocoAssigned,
    patchLocoSchedule,
    patchSch,
    patchLoadLoco
}