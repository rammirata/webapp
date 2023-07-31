module.exports.generateMail = (name) => ({
  subject: "Thanks for showing your interest in the blockway platform",
  body: body.replace(/\$NAME/g, name),
});

// templates = $NAME
var body = `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
	<!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css">
	<!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		@media (max-width:700px) {

			.fullMobileWidth,
			.row-content {
				width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.reverse {
				display: table;
				width: 100%;
			}

			.reverse .column.first {
				display: table-footer-group !important;
			}

			.reverse .column.last {
				display: table-header-group !important;
			}

			.row-6 td.column.first>table,
			.row-6 td.column.last>table {
				padding-left: 30px;
				padding-right: 30px;
			}

			.row-6 td.column.first .border,
			.row-6 td.column.last .border {
				border-top: 0;
				border-right: 0px;
				border-bottom: 0;
				border-left: 0;
			}

			.row-1 .column-2 .block-3.text_block td.pad {
				padding: 20px !important;
			}
		}
	</style>
</head>

<body style="background-color: #f5f5f5; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="icons_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; text-align: left; padding-top: 20px; padding-bottom: 20px;">
																<table class="alignment" cellpadding="0" cellspacing="0" role="presentation" align="left" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td style="vertical-align: middle; text-align: center; padding-top: 20px; padding-bottom: 20px; padding-left: 20px; padding-right: 20px;"><img class="icon" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-jj11m6c4yh/logo_long_1080.png" alt height="64" width="212" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:20px;padding-left:15px;padding-right:15px;padding-top:55px;">
																<div style="font-family: sans-serif">
																	<div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;">
																		<p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 25.5px;"><span class="tinyMce-placeholder" style="font-size:17px;"></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0452ee; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/heasder-bg.png'); background-repeat: no-repeat; background-size: cover; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-bottom:75px;padding-top:75px;text-align:center;width:100%;">
																<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Welcome, $NAME!</span></h1>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px"><img class="fullMobileWidth" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7071/contacts_no-bg.gif" style="display: block; height: auto; border: 0; width: 374px; max-width: 100%;" width="374" alt="Contacts" title="Contacts"></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 50px; padding-right: 50px; vertical-align: top; padding-top: 0px; padding-bottom: 40px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
																<h3 style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">We're thrilled to have you on blockway.</span></h3>
															</td>
														</tr>
													</table>
													<table class="divider_block block-2" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="15%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #0452EE;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="text_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
																<div style="font-family: sans-serif">
																	<div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;">
																		<p style="margin: 0; font-size: 14px; text-align: center;">Blockway is the next generation on-chain analytics platform. Make the most of your project marketing by making data-driven decisions<br><br>Thanks for signing up for the waiting list. We will get you approved as soon as we can</p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fafafa; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr class="reverse">
												<td class="column column-1 first" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 30px; padding-right: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="border">
														<table class="heading_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="padding-bottom:40px;padding-top:35px;text-align:center;width:100%;">
																	<h3 style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">Any question?</span></strong></h3>
																</td>
															</tr>
														</table>
													</div>
												</td>
												<td class="column column-2 last" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 30px; padding-right: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="border">
														<table class="button_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="text-align:center;padding-top:25px;padding-bottom:50px;">
																	<div class="alignment" align="center">
																		<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:business@blockway.tech?subject=Hey%2C%20I%20have%20a%20question&body=" style="height:42px;width:157px;v-text-anchor:middle;" arcsize="72%" strokeweight="1.5pt" strokecolor="#0452EE" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#2d2d2d; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href="mailto:business@blockway.tech?subject=Hey%2C%20I%20have%20a%20question&body=" target="_blank" style="text-decoration:none;display:inline-block;color:#2d2d2d;background-color:transparent;border-radius:30px;width:auto;border-top:2px solid #0452EE;font-weight:400;border-right:2px solid #0452EE;border-bottom:2px solid #0452EE;border-left:2px solid #0452EE;padding-top:5px;padding-bottom:5px;font-family:Poppins, Arial, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:14px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word;"><span class="tinyMce-placeholder" style="line-height: 28px;" dir="ltr" data-mce-style>Send an email</span></span></span></a>
																		<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																	</div>
																</td>
															</tr>
														</table>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0452ee; color: #000000; width: 680px;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 25px; padding-bottom: 25px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-bottom:25px;padding-top:15px;text-align:center;width:100%;">
																<h3 style="margin: 0; color: #ffffff; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong><span class="tinyMce-placeholder">Don’t forget to follow us!</span></strong></h3>
															</td>
														</tr>
													</table>
													<table class="social_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" style="text-align:center;">
																	<table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																		<tr>
																			<td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/blockway-technologies" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" width="32" height="32" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
																			<td style="padding:0 2px 0 2px;"><a href="mailto:business@blockway.tech" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/mail@2x.png" width="32" height="32" alt="E-Mail" title="E-Mail" style="display: block; height: auto; border: 0;"></a></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="text_block block-3" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #fafafa; line-height: 1.5;">
																		<p style="margin: 0; font-size: 10px; text-align: center; mso-line-height-alt: 15px;"><span style="font-size:10px;"><span style>© 2022 Blockway.&nbsp;</span></span><span style="font-size:10px;"><span style> All Rights Reserved.</span></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>
</html>
`;
