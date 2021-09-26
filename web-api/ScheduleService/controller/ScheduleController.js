const ScheduleSchema = require("../model/ScheduleDTO");
const MileageDTO = require("../model/MileageDTO");
const NextScheduleDTO = require("../model/NextScheduleDTO");
const accountSid = "AC3d297c7a3fe526424aa2fc97aaa56128"; // Your Account SID from www.twilio.com/console
const authToken = "1bd347d057e0c748679dec2618f02ade"; // Your Auth Token from www.twilio.com/console
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(process.env.accountSid, process.env.authToken);
const client = require('twilio')(accountSid, authToken);
const basicAuth = require("express-basic-auth");
const ProgressDTO = require("../model/ProgressDTO");
const nodemailer = require("nodemailer");
const LoadTrailDTO = require("../model/LoadTrialDTO");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hirushanbim123@gmail.com",
        pass: "Janith@12345",
    },
});

const getAllSchedules = (req, resp) => {
    ScheduleSchema.find()
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};

const getAllScheduleAssigned = async(req, resp) => {
    let returnArray = [];

    if (req.query.type == "calender") {
        if (req.query.userRole == "Supervisor") {
            var _findSche = await ScheduleSchema.find({
                supervisorNic: req.query.userNic,
            });
            if (_findSche.length > 0) {
                returnArray.push(_findSche);
            }
            var _findLoadTrail = await LoadTrailDTO.find({
                supervisorNic: req.query.userNic,
            });
            if (_findLoadTrail.length > 0) {
                returnArray.push(_findLoadTrail);
            }
            if (returnArray.length == 2) {
                resp.status(200).json(returnArray);
            } else {}
        } else {}
    } else {
        if (req.query.userRole == "Supervisor") {
            await ScheduleSchema.find({ supervisorNic: req.query.userNic })
                .then((result) => {
                    resp.status(200).json(result);
                    //console.log(result);
                })
                .catch((error) => {
                    resp.status(500).json(result);
                });
        } else if (req.query.userRole == "Service Manager") {
            await ScheduleSchema.find({ managerNic: req.query.userNic })
                .then((result) => {
                    resp.status(200).json(result);
                    //console.log(result);
                })
                .catch((error) => {
                    resp.status(500).json(result);
                });
        }
    }
};

const getAllScheduleAssignedManager = async(req, resp) => {
    let returnArray = [];

    if (req.query.type == "calender") {
        if (req.query.userRole == "Service Manager") {
            var _findSche = await ScheduleSchema.find({
                managerNic: req.query.userNic,
            });
            if (_findSche.length > 0) {
                returnArray.push(_findSche);
            }
            var _findLoadTrail = await LoadTrailDTO.find({
                managerNic: req.query.userNic,
            });
            if (_findLoadTrail.length > 0) {
                returnArray.push(_findLoadTrail);
            }
            if (returnArray.length == 2) {
                resp.status(200).json(returnArray);
            } else {}
        } else {}
    } else {
        if (req.query.userRole == "Service Manager") {
            await ScheduleSchema.find({ managerNic: req.query.userNic })
                .then((result) => {
                    resp.status(200).json(result);
                    //console.log(result);
                })
                .catch((error) => {
                    resp.status(500).json(result);
                });
        }
    }
};
const getAllCompSchedule = (req, resp) => {
    //get completed schedule
    if (req.query.userRole == "Supervisor") {
        ScheduleSchema.find({ scheduleStatus: 6, supervisorNic: req.query.userNic })
            .then((result) => {
                resp.status(200).json(result);
            })
            .catch((error) => {
                resp.status(500).json(error);
            });
    }
};

const deleteSchedule = (req, resp) => {
    ScheduleSchema.deleteOne({ scheduleNo: req.headers.id })
        .then((result) => {
            if (result.deletedCount > 0) {
                resp.status(200).json({ message: "deleted" });
            } else {
                resp.status(200).json({ message: "try Again" });
            }
        })
        .catch((error) => {
            resp.status(500).json({ error });
        });
};

const updateSchedule = (req, resp) => {
    ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, {
            $set: {
                scheduleUpdate: req.body.scheduleUpdate,
                locoCatId: req.body.locoCatId,
                locoNumber: req.body.locoNumber,
                userNic: req.body.userNic,
                userName: req.body.userrName,
                userEmail: req.body.userEmail,
                scheduleStatus: req.body.scheduleStatus,
                scheduleCom: req.body.scheduleCom,
                scheduleTrackMotors: req.body.scheduleTrackMotors,
                scheduleLocoBody: req.body.scheduleLocoBody,
                scheduleElCuUnit: req.body.scheduleElCuUnit,
                scheduleEMechanical: req.body.scheduleEMechanical,
                scheduleMach: req.body.scheduleMach,
                scheduleRemark: req.body.scheduleRemark,
            },
        })
        .then((result) => {
            if (result.nModified > 0) {
                resp.status(200).json({ message: "updated" });
            } else {
                resp.status(200).json({ message: "Try Again" });
            }
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};
const getDraftCount = (req, resp) => {
    ScheduleSchema.count({ scheduleStatus: "draft" })
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};
const getAcceptCount = (req, resp) => {
    ScheduleSchema.count({ scheduleStatus: "Accept" })
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};
const getSchedule = (req, resp) => {
    const { customerNic } = { customerNic: req.params.customerNic };
    ScheduleSchema.findById(customerNic)
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(result);
        });
};
const getCount = (req, resp) => {
    ScheduleSchema.find({ customerNic: req.body.customerNic })
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};
const getMySampleData = (req, resp) => {
    ScheduleSchema.aggregate([{
            $facet: {
                Total: [
                    { $match: { scheduleStatus: { $eq: "Accept" } } },
                    { $count: "Total" },
                ],
                "Total New": [
                    { $match: { scheduleStatus: { $eq: "draft" } } },
                    { $count: "Total" },
                ],
            },
        }, ])
        .then((result) => {
            console.log(result);
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};
const sendSMS = (req, resp) => {
    client.messages
        .create({
            body: "Schedule is Accepted",
            to: "+94768922413", // Text this number
            from: "+13343779253", // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));
};
const saveSchedule = async(req, res, next) => {
    ScheduleSchema.findOne({ scheduleNo: req.body.scheduleNo })
        .then((result) => {
            if (result == null) {
                const schedule = new ScheduleSchema(req.body);
                schedule
                    .save()
                    .then((result) => {
                        res.status(200).json({ isSaved: true, data: result });
                    })
                    .catch((error) => {
                        res.status(500).json(error);
                    });
            } else {
                res.status(200).json({ isSaved: false, data: result });
            }
        })
        .catch((er) => {
            res.status(500).json(er);
        });

    console.log("awa");
    //console.log(req.body)
};

const sendOneSchedule = (req, res) => {
    console.log(req.params.id);
    ScheduleSchema.find({
            _id: req.params.id,
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((er) => {
            res.status(500).json(er);
        });
};
const getOneSchedule = (req, res) => {
    console.log(req.params.scheduleNo);
    ScheduleSchema.find({
            scheduleNo: req.params.scheduleNo,
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((er) => {
            res.status(500).json(er);
        });
};

const scheduleEmail = async(req, res, next) => {
    //console.log(req.body);
    if (req.body.supervisorEmail) {
        const serManEmail = req.body.managerEmail;
        const supEmail = req.body.supervisorEmail;
        const scheduleNo = req.body.scheduleNo;
        const locoCatId = req.body.locoCatId;
        const locoNumber = req.body.locoNumber;
        const schReason = req.body.schReason;
        const specialNote = req.body.specialNote;

        const mailOptions = {
            from: serManEmail,
            to: supEmail,
            subject: "New Schedule",
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
	<link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
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
		@media (max-width: 670px) {

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

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #b8b8b8;">
	<!--[if IE]><div class="ie-browser"><![endif]-->
	<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #b8b8b8; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#b8b8b8" valign="top">
		<tbody>
			<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#b8b8b8"><![endif]-->
					<div style="background-color:transparent;">
						<div class="block-grid " style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #000000;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#000000;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#000000"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#000000;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
												<div style="font-size:1px;line-height:20px">&nbsp;</div><a href="http://example.com/" target="_blank" style="outline:none" tabindex="-1"><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/693118_675721/1618836043384.png" alt="Logo" title="Logo" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 130px; max-width: 100%; display: block;" width="130"></a>
												<div style="font-size:1px;line-height:15px">&nbsp;</div>
												<!--[if mso]></td></tr></table><![endif]-->
											</div>
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #333333; width: 100%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 5px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
											<div style="color:#ffba00;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #ffba00; mso-line-height-alt: 17px;">
													<p style="margin: 0; font-size: 46px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 55px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 46px;">New Schedule&nbsp; <span style="font-size: 20px; color: #ffffff;">[<span style>${scheduleNo}]</span></span></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="20%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #333637; width: 20%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 5px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
											<div style="color:#ffffff;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #ffffff; mso-line-height-alt: 17px;">
													<p style="margin: 0; font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 22px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px;">${locoCatId}&nbsp; ${locoNumber}</span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="20%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #333637; width: 20%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 45px; padding-left: 45px; padding-top: 10px; padding-bottom: 40px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#ffffff;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:40px;padding-left:45px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.5; color: #ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px;">
													<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">New Schedule is assigned to ${locoCatId} ${locoNumber}.Please carry out schedule and provide progress of schedule..&nbsp;</p>
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
					<div style="background-color:transparent;">
						<div class="block-grid mixed-two-up" style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #000000;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#000000;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#000000"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="216" style="background-color:#000000;width:216px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 40px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 216px; width: 216px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 40px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 10px; padding-bottom: 0px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#ffba00;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; color: #ffba00; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 17px;">
													<p style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><strong><span style="font-size: 15px; background-color: #2a2a2a;">&nbsp; Note&nbsp;&nbsp;</span></strong></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 10px; padding-bottom: 0px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
											<div style="color:#ffffff;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #ffffff; mso-line-height-alt: 17px;">
													<p style="margin: 0; font-size: 28px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 34px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 28px;">${schReason}</span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#a3a3a3;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.5; color: #a3a3a3; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px;">
													<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">${specialNote}</p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td><td align="center" width="433" style="background-color:#000000;width:433px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num8" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 432px; width: 433px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container right fixedwidth" align="right" style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="right"><![endif]--><img class="right fixedwidth" align="right" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1191/image-01_1.png" alt="Image" title="Image" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 344px; max-width: 100%; float: none; display: block;" width="344">
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
					<div style="background-color:transparent;">
						<div class="block-grid " style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #000000;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#000000;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#000000"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#000000;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
											<!--<![endif]-->
											<div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:60px;padding-left:10px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 60px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:4200/userDashboard/viewSchedules" style="height:34.5pt;width:100.5pt;v-text-anchor:middle;" arcsize="11%" strokeweight="1.5pt" strokecolor="#FFBA00" fill="false"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="http://localhost:4200/userDashboard/viewSchedules" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: transparent; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; width: auto; width: auto; border-top: 2px solid #FFBA00; border-right: 2px solid #FFBA00; border-bottom: 2px solid #FFBA00; border-left: 2px solid #FFBA00; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:25px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">View More</span></span></a>
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
        });
    } else {
        res.status(500).json(err);
    }
};

const patchMileage = async(req, res, next) => {
    console.log(req.params.scheduleNo, req.params.progressValue);
    if (req.params.scheduleNo) {
        if (req.params.progressValue == 100) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, {
                    $set: {
                        scheduleStatus: 6,
                        scheduleProgress: req.params.progressValue,
                        schReason: "Fully Completed",
                    },
                },
                function(err, result) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
        } else if (req.params.progressValue == 90) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, {
                    $set: {
                        scheduleStatus: 5,
                        scheduleProgress: req.params.progressValue,
                        schReason: "Very Close to complete",
                    },
                },
                function(err, result) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
        } else if (req.params.progressValue == 75) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, {
                    $set: {
                        scheduleStatus: 4,
                        scheduleProgress: req.params.progressValue,
                        schReason: "three fourth(3/4) of Schedule is completed",
                    },
                },
                function(err, result) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
        } else if (req.params.progressValue == 60) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, {
                    $set: {
                        scheduleStatus: 3,
                        scheduleProgress: req.params.progressValue,
                        schReason: "half of Schedule is completed",
                    },
                },
                function(err, result) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
        } else if (req.params.progressValue == 45) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, {
                    $set: {
                        scheduleStatus: 2,
                        scheduleProgress: req.params.progressValue,
                        schReason: "Schedule is on the way to complete",
                    },
                },
                function(err, result) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
        } else if (req.params.progressValue == 30) {
            await ScheduleSchema.updateOne({ scheduleNo: req.params.scheduleNo }, {
                    $set: {
                        scheduleStatus: 1,
                        scheduleProgress: req.params.progressValue,
                        schReason: "Schedule is just started",
                    },
                },
                function(err, result) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(result);
                    }
                }
            );
        }
    }
};
const getProSchedule = async(req, resp, next) => {
    const _id = req.params.id;
    console.log(_id);
    await ProgressDTO.find({ scheduleNo: _id }, function(err, result) {
        if (err) {
            resp.status(500).json(err);
        } else {
            resp.status(200).json(result);
            console.log(result);
        }
    });
};

const changeScheduleSeven = async(req, resp) => {
    //accepting load trial chamnge shedule status to 7
    // console.log(req.body);

    await ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, { $set: { scheduleStatus: 7, schReason: "Load Trial is Processed" } },
        function(err, result) {
            if (err) {
                resp.status(500).json(err);
            } else {
                resp.status(200).json(result);
            }
        }
    );
};

//update schedule Overdue

const assignedLoadTrial = async(req, resp) => {
    //accepting load trial chamnge shedule status to 7
    // console.log(req.body);

    await ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, { $set: { scheduleStatus: 8, schReason: "Assigned to Load Trial" } },
        function(err, result) {
            if (err) {
                resp.status(500).json(err);
            } else {
                resp.status(200).json(result);
            }
        }
    );
};

const getAllScheduleCalendar = async(req, resp) => {
    let returnArray = [];
    var _findSche = await ScheduleSchema.find();
    if (_findSche.length > 0) {
        returnArray.push(_findSche);
    }
    var _findLoadTrail = await LoadTrailDTO.find();
    if (_findLoadTrail.length > 0) {
        returnArray.push(_findLoadTrail);
    }

    if (returnArray.length == 2) {
        resp.status(200).json(returnArray);
    }
};

const scheduleLapseEmail = async(req, res, next) => {
    //console.log(req.body);
    if (req.body.supervisorEmail) {
        const serManEmail = req.body.managerEmail;
        const supEmail = req.body.supervisorEmail;
        const scheduleNo = req.body.scheduleNo;
        const locoCatId = req.body.locoCatId;
        const locoNumber = req.body.locoNumber;

        const mailOptions = {
            from: serManEmail,
            to: supEmail,
            subject: "Schedule Lapsed!",
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
	<link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
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
		@media (max-width: 670px) {

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

			.img-container.big img {
				width: auto !important;
			}
		}
	</style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #b8b8b8;">
	<!--[if IE]><div class="ie-browser"><![endif]-->
	<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #b8b8b8; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#b8b8b8" valign="top">
		<tbody>
			<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#b8b8b8"><![endif]-->
					<div style="background-color:transparent;">
						<div class="block-grid " style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #000000;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#000000;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#000000"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#000000;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
												<div style="font-size:1px;line-height:20px">&nbsp;</div><a href="http://example.com/" target="_blank" style="outline:none" tabindex="-1"><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/693118_675721/1618836043384.png" alt="Logo" title="Logo" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 130px; max-width: 100%; display: block;" width="130"></a>
												<div style="font-size:1px;line-height:15px">&nbsp;</div>
												<!--[if mso]></td></tr></table><![endif]-->
											</div>
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #333333; width: 100%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 5px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
											<div style="color:#ffba00;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #ffba00; mso-line-height-alt: 17px;">
													<p style="margin: 0; font-size: 46px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 55px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 46px;"><span style="font-size: 28px;">Schedule is lapsed</span> <span style="font-size: 20px; color: #ffffff;">[<span style>${scheduleNo}]</span></span></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="20%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #333637; width: 20%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 5px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
											<div style="color:#ffffff;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #ffffff; mso-line-height-alt: 17px;">
													<p style="margin: 0; font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 22px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px;">${locoCatId}&nbsp; ${locoNumber}</span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="20%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #333637; width: 20%;" align="center" role="presentation" valign="top">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 45px; padding-left: 45px; padding-top: 10px; padding-bottom: 40px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#ffffff;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:40px;padding-left:45px;">
												<div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.5; color: #ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px;">
													<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">Schedule is lapsed on ${locoCatId} ${locoNumber}.Please carry out necessary actions.</p>
													<p style="margin: 0; font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">If schedule is completed.Please Ignore this Message!</p>
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
        });
    } else {
        res.status(500).json(err);
    }
};

//nextschedule

const saveNextSchedule = async(req, res, next) => {
    NextScheduleDTO.findOne({ nxtSchId: req.body.nxtSchId })
        .then((result) => {
            if (result == null) {
                const nxtSchedule = new NextScheduleDTO(req.body);
                nxtSchedule
                    .save()
                    .then((result) => {
                        res.status(200).json({ isSaved: true, data: result });
                    })
                    .catch((error) => {
                        res.status(500).json(error);
                    });
            } else {
                res.status(200).json({ isSaved: false, data: result });
            }
        })
        .catch((er) => {
            res.status(500).json(er);
        });
};

const getAllNextSchedules = async(req, res, next) => {
    //get completed schedule
    console.log(req.params.locoNumberNextSchedule);
    await NextScheduleDTO.find({
            locoNumber: req.params.locoNumberNextSchedule,
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((er) => {
            res.status(500).json(er);
        });
};

const getAllNextSchedulesNotFilter = async(req, resp, next) => {
    //get completed schedul
    await NextScheduleDTO.find({ nxtSchStatus: 0 })
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};

const sendOneNextSchedule = async(req, res, next) => {
    await NextScheduleDTO.find({
            nxtSchId: req.params.nxtSchId,
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((er) => {
            res.status(500).json(er);
        });
};

const changeStatusNextSchedule = async(req, res, next) => {
    //change status of the comment after adding feedbacks by user
    const _obj = req.body;
    console.log(_obj);
    //console.log(_obj.status)

    if (_obj.nxtScheduleId) {
        console.log(_obj.nxtSchId);
        await NextScheduleDTO.updateOne({ nxtSchId: _obj.nxtScheduleId }, { $set: { nxtSchStatus: 1, nxtSchReason: "Assigned to Mileage Report" } },
            function(err, result) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            }
        );
    }
};

module.exports = {
    saveSchedule,
    getAllSchedules,
    deleteSchedule,
    updateSchedule,
    getDraftCount,
    getAcceptCount,
    getSchedule,
    getCount,
    getMySampleData,
    sendSMS,
    sendOneSchedule,
    patchMileage,
    getProSchedule,
    getOneSchedule,
    getAllCompSchedule,
    getAllScheduleAssigned,
    changeScheduleSeven,
    assignedLoadTrial,
    scheduleEmail,
    scheduleLapseEmail,
    getAllScheduleCalendar,
    getAllScheduleAssignedManager,

    //next Schedule
    saveNextSchedule,
    getAllNextSchedules,
    getAllNextSchedulesNotFilter,
    sendOneNextSchedule,
    changeStatusNextSchedule,
};