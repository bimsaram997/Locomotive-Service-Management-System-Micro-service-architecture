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
const getLoadTrialAssigned = async(req, resp, next) => {
    //console.log(resp)
    // LoadTrialDTO.find().then(result => {
    //     resp.status(200).json(result);
    // }).catch(error => {
    //     resp.status(500).json(result)
    // })

    if (req.query.userRole == 'Chief Engineer' || req.query.userRole == 'Service Manager' || req.query.userRole == 'Clerk') {
        await LoadTrialDTO.find().then(result => {
            resp.status(200).json(result);

        }).catch(error => {
            resp.status(500).json(result)
        });

    } else if (req.query.userRole == 'Supervisor') {
        await LoadTrialDTO.find({ supervisorNic: req.query.userNic }).then(result => {
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
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);
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
    await CommentDTO.find({ status: 4 })
        .then(result => {
            res.status(200).json(result);
            //console.log(result)
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
        console.log(idVal)
            // const mRepNo = req.body.mReportNumber;
            // const id = req.body.id;
            // const locoCat = req.body.mLocoCatId
            // const locoNumber = req.body.mLocoNumber;
            // const date = req.body.mileageDate;


        const mailOptions = {
            from: chiefEmail,
            to: supEmail,
            subject: 'New Comment on Load Trial ' + loadNo,
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
	<link href="https://fonts.googleapis.com/css?family=Catamaran" rel="stylesheet" type="text/css">
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
				width: 100% !important;
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

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #F8F8F8;">
	<!--[if IE]><div class="ie-browser"><![endif]-->
	<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F8F8F8; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#F8F8F8" valign="top">
		<tbody>
			<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#F8F8F8"><![endif]-->
					<div style="background-color:#081032;">
						<div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #247091;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#247091;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#081032;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#247091"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#247091;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/693118_675721/1618836043384.png" alt="I'm an image" title="I'm an image" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 120px; max-width: 100%; display: block;" width="120">
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
					<div style="background-color:#081032;">
						<div class="block-grid mixed-two-up no-stack" style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #247091;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#247091;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#081032;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#247091"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="400" style="background-color:#247091;width:400px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
								<div class="col num8" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 400px; width: 400px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 40px; padding-bottom: 10px; font-family: sans-serif"><![endif]-->
											<div style="color:#FFFFFF;font-family:'Oswald', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;line-height:1.2;padding-top:40px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; font-family: 'Oswald', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color: #FFFFFF; mso-line-height-alt: 14px;">
													<p style="margin: 0; font-size: 34px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 41px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 34px;"><strong>New Comment...</strong></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 0px; padding-bottom: 15px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#ffffff;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:0px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.5; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #ffffff; mso-line-height-alt: 18px;">
													<ul>
														<li style="line-height: 1.5; font-size: 18px; mso-line-height-alt: 27px;"><span style="font-size: 18px;">New Comment ${commentId} is created to <strong><span style="color: #dae500;"> ${locoCatId}&nbsp; ${locoNumber}</span></strong> Locomotive.</span></li>
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
								<!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#247091;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:35px; padding-bottom:0px;"><![endif]-->
								<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px; width: 200px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container center  autowidth " align="center" style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
												<div style="font-size:1px;line-height:20px">&nbsp;</div><img class="center  autowidth " align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/117/customer_care.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 152px; max-width: 100%; display: block;" width="152">
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
					<div style="background-color:#081032;">
						<div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #247091;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#247091;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#081032;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#247091"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#247091;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: sans-serif"><![endif]-->
											<div style="color:#555555;font-family:Catamaran, Lucida Sans Unicode, Lucida Grande, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; font-family: Catamaran, Lucida Sans Unicode, Lucida Grande, sans-serif; color: #555555; mso-line-height-alt: 14px;">
													<p style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: justify; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 16px; color: #ffffff;">"${comments}"</span></p>
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
					<div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/117/bg_footer_1.png');background-position:top center;background-repeat:repeat;background-color:#081032;">
						<div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/117/bg_footer_1.png');background-position:top center;background-repeat:repeat;background-color:#081032;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:30px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:4200/userDashboard/viewLoadProf/${idVal}" style="height:41.25pt;width:117pt;v-text-anchor:middle;" arcsize="8%" strokeweight="0.75pt" strokecolor="#8a3b8f" fillcolor="#8a3b8f"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:sans-serif; font-size:22px"><![endif]--><a href="http://localhost:4200/userDashboard/viewLoadProf/${idVal}" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #8a3b8f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #8a3b8f; border-right: 1px solid #8a3b8f; border-bottom: 1px solid #8a3b8f; border-left: 1px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Catamaran, Lucida Sans Unicode, Lucida Grande, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:22px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong><span style="font-size: 22px; line-height: 44px;" data-mce-style="font-size: 22px; line-height: 44px;">View More</span></strong></span></span></a>
												<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
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
					<div style="background-color:#081032;">
						<div class="block-grid " style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #0068a5;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#0068a5;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#081032;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#0068a5"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#0068a5;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:5px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: sans-serif"><![endif]-->
											<div style="color:#555555;font-family:Catamaran, Lucida Sans Unicode, Lucida Grande, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 12px; line-height: 1.2; color: #555555; font-family: Catamaran, Lucida Sans Unicode, Lucida Grande, sans-serif; mso-line-height-alt: 14px;">
													<p style="margin: 0; font-size: 17px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 17px; color: #ffffff; mso-ansi-font-size: 18px;">Contact:&nbsp;<span style="font-size: 18px; color: #0006ff;"> ${chiefEmail}</span></span></p>
													<p style="margin: 0; font-size: 17px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 20px; mso-ansi-font-size: 18px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 17px; mso-ansi-font-size: 18px;">&nbsp;</span></p>
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
    console.log(req.params.commentId);
    await feedLoadTrialDTO.find({
        commentId: req.params.commentId
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}


module.exports = {
    saveLoadTrial,
    getLoadTrialAssigned,
    getOneLoad,
    acceptLoadTrial,

    addComment,
    makeComment,
    getLoadComments,
    getOneComment,
    changeStatusComment,
    getResolvedComments,
    commentEmail,

    addFeedBack,
    getOneFeedBack
}