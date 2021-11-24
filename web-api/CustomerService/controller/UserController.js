const UserDTO = require('../model/UserDTO')
const EmailDTO = require('../model/EmailDTO')
const ResetPassword = require('../model/ResetToken')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const config = require('../../Config/config.json')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hirushanbim123@gmail.com',
        pass: 'Janith@12345'
    }
})


const sendContent = (email, receive, subject, text, cb) => {
    const mailOptions = {
        from: email,
        to: receive,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    })

}
const sendMails = (req, resp) => {
    const { email, receive, subject, text } = req.body;
    sendContent(email, receive, subject, text, function(err, data) {
        if (err) {
            resp.status(500).json({ message: 'Internal error' });

        } else {
            resp.json({ message: 'Email Sent' });
        }
    })

}
const sendReqEmailContent = (email, text, cb) => {
    const mailOptions = {
        from: email,
        to: 'bimsaram997@gmail.com',
        subject: 'Password Reset',
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    })

}
const sendPassEmail = (email, resettoken) => {


    const mailOptions = {
        from: 'your emil',
        to: email,
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
	<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
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

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #000000;">
	<!--[if IE]><div class="ie-browser"><![endif]-->
	<table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000000; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#000000" valign="top">
		<tbody>
			<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#000000"><![endif]-->
					<div style="background-color:#f3e6f8;">
						<div class="block-grid " style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3e6f8;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div class="img-container center fixedwidth" align="center" style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
												<div style="font-size:1px;line-height:15px">&nbsp;</div><img class="center fixedwidth" align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/693118_675721/editor_images/3a6c072b-899f-4092-8d7f-b0f58e5cf180.png" alt="your logo" title="your logo" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 130px; max-width: 100%; display: block;" width="130">
												<div style="font-size:1px;line-height:25px">&nbsp;</div>
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
					<div style="background-color:#f3e6f8;">
						<div class="block-grid " style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #f1d0ff;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#f1d0ff;background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/bg-white-rombo.png');background-position:top left;background-repeat:no-repeat">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3e6f8;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:#f1d0ff"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:#f1d0ff;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:45px; padding-bottom:0px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:45px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
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
											<div class="img-container center fixedwidth" align="center" style="padding-right: 20px;padding-left: 20px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 20px;padding-left: 20px;" align="center"><![endif]-->
												<div style="font-size:1px;line-height:20px">&nbsp;</div><img class="center fixedwidth" align="center" border="0" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/2971/lock4.png" alt="Forgot your password?" title="Forgot your password?" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 325px; max-width: 100%; display: block;" width="325">
												<div style="font-size:1px;line-height:20px">&nbsp;</div>
												<!--[if mso]></td></tr></table><![endif]-->
											</div>
											<table cellpadding="0" cellspacing="0" role="presentation" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top">
												<tr style="vertical-align: top;" valign="top">
													<td style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 35px; text-align: center; width: 100%;" width="100%" align="center" valign="top">
														<h1 style="color:#8412c0;direction:ltr;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:28px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"><strong>Forgot your password?</strong></h1>
													</td>
												</tr>
											</table>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 45px; padding-left: 45px; padding-top: 10px; padding-bottom: 0px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:0px;padding-left:45px;">
												<div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #393d47; mso-line-height-alt: 18px;">
													<p style="margin: 0; text-align: center; line-height: 1.5; word-break: break-word; font-size: 18px; mso-line-height-alt: 27px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px; color: #aa67cf;">We received a request to reset your password.</span></p>
													<p style="margin: 0; text-align: center; line-height: 1.5; word-break: break-word; font-size: 18px; mso-line-height-alt: 27px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 18px; color: #aa67cf;">If you didn't make this request, simply ignore this email.</span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="80%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #E1B4FC; width: 80%;" align="center" role="presentation" valign="top">
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
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 45px; padding-left: 45px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:45px;padding-bottom:10px;padding-left:45px;">
												<div class="txtTinyMce-wrapper" style="line-height: 1.5; font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; color: #393d47; mso-line-height-alt: 18px;">
													<p style="margin: 0; line-height: 1.5; word-break: break-word; font-size: 13px; mso-line-height-alt: 20px; mso-ansi-font-size: 14px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 13px; color: #8412c0; mso-ansi-font-size: 14px;">If you did make this request just click the button below:</span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<div class="button-container" align="center" style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"  style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  style="height:40.5pt;width:177.75pt;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#8412c0" fillcolor="#8412c0"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href='http://localhost:4200/resetPasswordCommon/${resettoken.resettoken}' style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #8412c0; border-radius: 0px; -webkit-border-radius: 0px; -moz-border-radius: 0px; width: auto; width: auto; border-top: 1px solid #8412c0; border-right: 1px solid #8412c0; border-bottom: 1px solid #8412c0; border-left: 1px solid #8412c0; padding-top: 10px; padding-bottom: 10px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span style="font-size: 14px; line-height: 28px;" data-mce-style="font-size: 14px; line-height: 28px;">RESET MY PASSWORD</span></span></span></a>
												<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
											</div>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 15px; font-family: Arial, sans-serif"><![endif]-->
											<div style="color:#393d47;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
												<div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #393d47; mso-line-height-alt: 14px;">
													<p style="margin: 0; font-size: 10px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 12px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 10px; color: #aa67cf;"><span style>If you didn't request to change your brand password, </span><span style>you don't have to do anything. So that's easy.</span></span></p>
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
					<div style="background-color:#f3e6f8;">
						<div class="block-grid " style="min-width: 320px; max-width: 650px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3e6f8;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="650" style="background-color:transparent;width:650px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:10px;"><![endif]-->
								<div class="col num12" style="min-width: 320px; max-width: 650px; display: table-cell; vertical-align: top; width: 650px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table class="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" role="presentation" valign="top">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
															<table class="divider_content" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" align="center" role="presentation" valign="top">
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
                cb(err, null);
            } else {
                cb(null, data);
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


const register = async(req, resp) => {



    UserDTO.findOne({ userEmail: req.body.userEmail }).then(result => {
        if (result == null) {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.userPassword, salt, function(error, hash) {
                    const admin = new UserDTO(req.body);
                    admin.userPassword = hash
                        //userPassword: hash,


                    admin.save().then(result => {
                        resp.status(200).json({ isSaved: true, data: result });
                    }).catch(error => {
                        res.status(500).json(error);
                    })

                })
            })
        } else {
            resp.status(200).json({ isSaved: false, data: result });
        }
    }).catch(er => {
        reps.status(500).json(er);
    });


    // UserDTO.findOne({ userEmail: req.body.userEmail }, (error, result) => {


    //     if (result == null) {
    //         bcrypt.genSalt(10, function(err, salt) {
    //             bcrypt.hash(req.body.userPassword, salt, function(error, hash) {
    //                 const admin = new UserDTO(req.body);
    //                 admin.userPassword = hash
    //                     //userPassword: hash,


    //                 admin.save().then(result => {
    //                     resp.status(200).json({ message: true, data: result });
    //                 }).catch(error => {
    //                     res.status(500).json(error);
    //                 })

    //             })
    //         });
    //     } else {

    //         res.status(200).json({ isSaved: false, data: result });

    //     }

    // }).catch(er => {
    //     res.status(500).json(er);
    // });





};

const loginUser = async(req, resp) => {
    // console.log(req.headers.email )
    UserDTO.findOne({ userEmail: req.headers.email }).then(result => {
        // console.log(result)
        if (result != null) {
            bcrypt.compare(req.headers.password, result.userPassword, function(err, finalOutput) {
                if (finalOutput === true) {
                    const user = {
                        "email": result.userEmail
                    };
                    const { userPassword, ...userWithoutHash } = result.toObject();
                    const token = jwt.sign({ sub: result.id }, config.secret);
                    resp.status(200).json({ message: "Success!", userData: user, ...userWithoutHash, token });
                } else {
                    resp.status(200).json({ message: "User Email or Passwords are Not Valid" });
                }
            });
        } else {
            // console.log('dsa')
            resp.status(200).json({ message: "Record Not Found!" });
        }
    }).catch(onerror => {
        resp.status(500).json(onerror);
    })
};


const validPasswordToken = async(req, res) => {

    if (!req.body.resettoken) {
        return res
            .status(500)
            .json({ message: 'Token is required' });
    }
    const user = await ResetPassword.findOne({
        resetToken: req.body.resettoken
    });
    if (!user) {
        return res
            .status(409)
            .json({ message: 'Invalid URL' });
    }
    User.findOneAndUpdate({ _id: user._userId }).then(() => {
        res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
        return res.status(500).send({ msg: err.message });
    });






}
const newPassword = (req, res) => {
    //userId  hoyaganna ona email eka balala

    ResetPassword.findOne({ resettoken: req.body.resettoken }, function(err, userToken, next) {
        if (!userToken) {
            return res
                .status(409)
                .json({ message: 'Token has expired' });
        }

        UserDTO.findOne({
            _id: userToken._userId

        }, function(err, userEmail, next) {
            if (!userEmail) {
                return res
                    .status(409)
                    .json({ message: 'User does not exist' });
            }
            return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: 'Error hashing password' });
                }
                userEmail.userPassword = hash;


                userEmail.save(function(err) {
                    if (err) {
                        console.log(err)
                        return res
                            .status(400)
                            .json({ message: 'Password can not reset.' });
                    } else {
                        userToken.remove();
                        return res
                            .status(201)
                            .json({ message: 'Password reset successfully' });
                    }

                });
            });
        });

    })




}

const requestPassword = async(req, res) => {
    if (!req.body.email) {
        return res
            .status(500)
            .json({ message: 'Email is required' });
    }
    const user = await UserDTO.findOne({
        userEmail: req.body.email
    });
    console.log(req.body.email)
    if (!user) {
        return res
            .status(409)
            .json({ message: 'Email does not exist' });
    }
    var resettoken = new ResetPassword({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    resettoken.save(function(err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        ResetPassword.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
        res.status(200).json({ message: 'Reset Password successfully.' });

        sendPassEmail(req.body.email, resettoken)
            ///Nodamailer eka
    })


}


const getAllUsers = (req, resp) => {
    UserDTO.find({ userRole: 'Supervisor' }).then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result);
    })
};

const getOneUser = (req, res) => {
    //console.log(req.params.id);
    UserDTO.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });

}


const getManagers = (req, resp) => {
    UserDTO.find({ userRole: 'Service Manager' }).then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result);
    })
};

const getAllUserNew = (req, resp) => {
    UserDTO.find().sort({ appointmentDate: -1 }).then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result);
    })
};

const deleteUser = (req, resp) => {
    UserDTO.deleteOne({ userEmail: req.headers.id }).then(result => {
        if (result.deletedCount > 0) {
            resp.status(200).json({ message: 'deleted' });
        } else {
            resp.status(200).json({ message: 'try Again' });
        }
    }).catch(error => {
        resp.status(500).json({ error });
    })
};

const getUser = async(req, res, next) => {
    console.log(req.params.id);
    await UserDTO.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json(result);

    }).catch(er => {
        res.status(500).json(er);
    });
};

const getUserByNic = async(req, res, next) => {
    console.log(req.params.userNic);
    await UserDTO.find({
        userNic: req.params.userNic
    }).then(result => {
        res.status(200).json(result);

    }).catch(er => {
        res.status(500).json(er);
    });
};


const editUser = async(req, resp) => {
    // console.log(req.body);
    if (req.body) {
        await UserDTO.updateOne({ userNic: req.body.userNic }, { $set: req.body }, function(err, result) {

            if (err) {
                resp.status(500).json(err)
                console.log(err)
            } else {
                resp.status(200).json(result)
            }

        })

    }
}

const updateUser = (req, resp) => {
    UserDTO.updateOne({ userEmail: req.body.userEmail }, {
        $set: {
            userName: req.body.userName,
            userWorks: req.body.userWorks,
            userNic: req.body.userNic,
            userMobile: req.body.userMobile,
            userRole: req.body.userRole,


        }
    }).then(result => {
        if (result.nModified > 0) {

            resp.status(200).json({ message: 'updated' })
        } else {
            resp.status(500).json({ message: 'Try Again' })
        }
    }).catch(error => {
        resp.status(500).json(error)
    });


}

const getOneMan = (req, res) => {

    UserDTO.find({
        userName: req.params.managerName
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });
}
const getOneSup = (req, res) => {

    UserDTO.find({
        userName: req.params.supervisorName
    }).then(result => {
        res.status(200).json(result);
    }).catch(er => {
        res.status(500).json(er);
    });
}

const getUserInfo = async(req, resp, next) => {

    await UserDTO.find({ userNic: req.query.userNic }).then(result => {
        resp.status(200).json(result);

    }).catch(error => {
        resp.status(500).json(result)
    });

}
module.exports = {
    register,
    getAllUsers,
    loginUser,
    getUser,
    sendMails,
    requestPassword,
    newPassword,
    validPasswordToken,
    sendPassEmail,
    getAllUserNew,
    deleteUser,
    updateUser,
    getManagers,
    getUserByNic,

    getOneMan,
    getOneSup,
    getUserInfo,
    editUser,
    getOneUser


}