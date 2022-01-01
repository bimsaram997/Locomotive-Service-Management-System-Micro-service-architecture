const ScheduleSchema = require("../model/ScheduleDTO");
const MileageDTO = require("../model/MileageDTO");
const NextScheduleDTO = require("../model/NextScheduleDTO");
const accountSid = "AC3d297c7a3fe526424aa2fc97aaa56128"; // Your Account SID from www.twilio.com/console
const authToken = "1bd347d057e0c748679dec2618f02ade"; // Your Auth Token from www.twilio.com/console
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = require('twilio')(process.env.accountSid, process.env.authToken);
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
    ScheduleSchema.find().sort({ scheduleDate: -1 })
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
            }).sort({ scheduleDate: -1 });
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
            await ScheduleSchema.find({ supervisorNic: req.query.userNic }).sort({ scheduleDate: -1 })
                .then((result) => {
                    resp.status(200).json(result);
                    //console.log(result);
                })
                .catch((error) => {
                    resp.status(500).json(result);
                });
        } else if (req.query.userRole == "Service Manager") {
            await ScheduleSchema.find({ managerNic: req.query.userNic }).sort({ scheduleDate: -1 })
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
            }).sort({ scheduleDate: -1 });
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
            await ScheduleSchema.find({ managerNic: req.query.userNic }).sort({ scheduleDate: -1 })
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


const getCurrentScheduleByLocoNumber = (req, res) => {
    console.log(req.params.locoNumber);
    ScheduleSchema.findOne().or([{ locoNumber: req.params.locoNumber }, { scheduleStatus: 0 }])
        .then((result) => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch((er) => {
            res.status(500).json(er);
        });
};

const scheduleEmail = async(req, res, next) => {
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
            html: `<html></html>`,
        };
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, data);
            }
        });
    } else {
        res.status(500).json(err);
    }
};
const sendSMS = (req, resp) => {
    const options = {
        body: "Schedule is Accepted",
        from: +13254238406, // From a valid Twilio number
        to: +94768922413, // Text this number
    }
    client.messages
        .create(options)
        .then((message) => console.log(message.body));
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

    await ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, { $set: { scheduleStatus: 8, schReason: "Assigned to Load Trial", actualCompletedDate: req.body.loadDate } },
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

const nextScheduleEmail = async(req, res, next) => {
    //console.log(req.body);
    if (req.body.nxtSchId) {
        const chiefEngEmail = 'nextScheduleEmail';
        const supEmail = req.body.supervisorEmail;
        const nxtScheduleNo = req.body.nxtSchId;
        const locoCatId = req.body.locoCatId;
        const locoNumber = req.body.locoNumber;
        const date = new Date(req.body.date).toLocaleDateString();
        const specialNote = req.body.nxtSchReason;

        const mailOptions = {
            from: chiefEngEmail,
            to: supEmail,
            subject: "Next Schedule",
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
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
<link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet">
<!--<![endif]-->
<style type="text/css">
.section-title {
padding:5px 10px;
background-color:#f6f6f6;
border:1px solid #dfdfdf;
outline:0;
}
#outlook a {
padding:0;
}
.amp-carousel-button {
background-color:rgba(49, 155, 239, 0.74);
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
background:#3498db!important;
border-color:#3498db!important;
}
.es-button-border:hover {
border-color:#107fda #107fda #107fda #107fda!important;
background:#3498db!important;
}
[data-ogsb] .es-button {
border-width:0!important;
padding:10px 20px 10px 20px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:26px!important; text-align:center } h2 { font-size:24px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:26px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:13px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:13px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:13px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:11px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:14px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style>
</head>
<body style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
<div class="es-wrapper-color" style="background-color:#F6F6F6">
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]-->
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td valign="top" style="padding:0;Margin:0">
<table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
<tr style="border-collapse:collapse">
<td align="center" style="padding:0;Margin:0">
<table bgcolor="#F5F8FF" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr style="border-collapse:collapse">
<td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="center" valign="top" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td class="es-infoblock es-m-txt-c" align="right" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here</p></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
<table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td align="center" bgcolor="#020202" style="padding:0;Margin:0;background-color:#020202">
<table bgcolor="#FFFFFF" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
<tr style="border-collapse:collapse">
<td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#5b626f" bgcolor="#5b626f">
<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;width:560px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#3F3D3D"><strong><span style="color:#ffffff;font-size:28px">NEXT</span><span style="color:#000080">SCHEDULE</span></strong></h1></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table></td>
</tr>
</table>
<table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
<tr style="border-collapse:collapse">
<td align="center" bgcolor="#000000" style="padding:0;Margin:0;background-color:#000000">
<table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#5b626f;width:600px" cellspacing="0" cellpadding="0" align="center" bgcolor="#5b626f">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px">
<!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
<tr style="border-collapse:collapse">
<td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:270px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#999999;font-size:14px"><span style="color:#ffffff;font-size:15px">Next schedule for </span><span style="color:#000080;font-size:16px"><strong>${locoCatId} ${locoNumber}</strong></span><span style="color:#ffffff;font-size:15px"> has been generated by the system as result of last Load Trial is accepted by Chief Engineer.<br></span></p>
<ul>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#ffffff;font-size:14px">Schedule No: <span style="color:#000080"><strong>${nxtScheduleNo}</strong></span></li>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#ffffff;font-size:14px">Date: <span style="color:#000080"><strong>${date}</strong></span></li>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#ffffff;font-size:14px">Notes: <span style="color:#000080"><strong>${specialNote}</strong></span></li>
</ul><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#999999;font-size:14px"><br><br></p></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
<table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
<tr style="border-collapse:collapse">
<td align="left" style="padding:0;Margin:0;width:270px">
<table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://tftccl.stripocdn.email/content/guids/CABINET_8f40916da47188bf3f215b120574330c/images/gd994bd92202b85abbe1538f339b3ea3ce5fe8aa0b917949bd7fc40412a5bbc8c80658ab70ea39377299403848634c17d_640.jpg" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="270"></td>
</tr>
</table></td>
</tr>
</table>
<!--[if mso]></td></tr></table><![endif]--></td>
</tr>
<tr style="border-collapse:collapse">
<td style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left">
<table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
<tr style="border-collapse:collapse">
<td valign="top" align="center" style="padding:0;Margin:0;width:560px">
<table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:center top" width="100%" cellspacing="0" cellpadding="0" role="presentation">
<tr style="border-collapse:collapse">
<td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#ff0000;font-size:14px"><u><em><strong>Special Attention:</strong></em></u></p>
<ul>
<li style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;Margin-bottom:15px;color:#000000;font-size:14px">This next schedule is generated by the system. Service Managers can request emergency schedule for partcular locomotive as required.</li>
</ul></td>
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

const getNxtScheduleByLocoNoAndStatus = async(req, resp, next) => {
    //get completed schedul
    console.log(req.params.nxtSchStatus)
    await NextScheduleDTO.find({ $and: [{ nxtSchStatus: req.params.nxtSchStatus }, { locoNumber: req.params.locoNumber }] })
        .then((result) => {
            resp.status(200).json(result);
            console.log(result)
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};

const updateDraftNextSchedules = async(req, resp, next) => {
    //get completed schedul
    console.log(req.params.nxtSchStatus)
    await NextScheduleDTO.find({ $and: [{ locoNumber: req.params.locoNumber }, { nxtSchStatus: req.params.nxtSchStatus }] }).updateMany({}, { $set: { nxtSchStatus: 2, nxtSchReason: 'Next Schedule is lapsed' } })
        .then((result) => {
            resp.status(200).json(result);
            console.log(result)
        })
        .catch((error) => {
            resp.status(500).json(error);
        });
};

// const assignedLoadTrial = async (req, resp) => {
//     //accepting load trial chamnge shedule status to 7
//     // console.log(req.body);

//     await ScheduleSchema.updateOne({ scheduleNo: req.body.scheduleNo }, { $set: { scheduleStatus: 8, schReason: "Assigned to Load Trial", actualCompletedDate: req.body.loadDate } },
//         function (err, result) {
//             if (err) {
//                 resp.status(500).json(err);
//             } else {
//                 resp.status(200).json(result);
//             }
//         }
//     );
// };

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

const getNextAllSchedules = async(req, resp, next) => {
    await NextScheduleDTO.find()
        .then((result) => {
            resp.status(200).json(result);
        })
        .catch((error) => {
            resp.status(500).json(error);
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
    getCurrentScheduleByLocoNumber,

    //next Schedule
    saveNextSchedule,
    nextScheduleEmail,
    getAllNextSchedules,
    getAllNextSchedulesNotFilter,
    sendOneNextSchedule,
    changeStatusNextSchedule,
    getNextAllSchedules,
    getNxtScheduleByLocoNoAndStatus,
    updateDraftNextSchedules
};