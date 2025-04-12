export const forgetPasswordTemplate = (otp) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
=<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t0,.t12,.t23{line-height:35px!important;font-size:30px!important}.t4{text-align:center!important}.t3{vertical-align:top!important;width:600px!important}.t0{mso-text-raise:2px!important}
}
</style>
<link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@500&amp;family=Lexend+Exa:wght@600;900&amp;family=Inter+Tight:wght@500&amp;family=Allerta:wght@900&amp;family=Bungee+Inline:wght@900&amp;display=swap" rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/css2?family=Capriola&family=Lilita+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap" rel="stylesheet">
</head>
<body id=body class=t53 style="min-width:100%;Margin:0px;padding:0px;background-color:#292929;"><div class=t52 style="background-color:#292929;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t51 style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#292929;" valign=top align=center>
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center id=innerTable><tr><td><div class=t45 style="mso-line-height-rule:exactly;mso-line-height-alt:60px;line-height:60px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t49 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=440 class=t48 style="width:440px;">
<table class=t47 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t46 style="padding:0 20px 0 20px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t11 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=400 class=t10 style="background-color:#4865CD;overflow:hidden;width:800px;border-radius:14px 14px 0 0;">
<table class=t9 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t8 style="padding:26px 25px 26px 25px;"><div class=t7 style="width:100%;text-align:center;"><div class=t6 style="display:inline-block;"><table class=t5 role=presentation cellpadding=0 cellspacing=0 align=center valign=top>
<tr class=t4><td></td><td class=t3 width=350 valign=top>
<table role=presentation width=100% cellpadding=0 cellspacing=0 class=t2 style="width:100%;"><tr><td class=t1><h1 class=t0 style="margin:0;Margin:0;font-family:Lilita One,serif;line-height:41px;font-weight:900;font-style:normal;font-size:40px;text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;letter-spacing:3px;">TYPERX.IO</h1></td></tr></table>
</td>
<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align=center>
<table class=t38 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=400 class=t37 style="background-color:#FFFFFF;overflow:hidden;width:800px;border-radius:0 0 14px 14px;">
<table class=t36 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t35 style="padding:40px 40px 40px 40px;"><table role=presentation width=100% cellpadding=0 cellspacing=0 style="width:100% !important;"><tr><td align=center>
<table class=t16 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=320 class=t15 style="width:600px;">
<table class=t14 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t13><h1 class=t12 style="margin:0;Margin:0;font-family:Allerta,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:900;font-style:normal;font-size:35px;text-decoration:none;text-transform:none;direction:ltr;color:#3B3B3B;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">Forgot your password?</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t18 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t22 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=320 class=t21 style="width:600px;">
<table class=t20 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t19><p class=t17 style="margin:0;Margin:0;font-family:Lexend Deca,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:500;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#111111;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">To reset your password, Use this OTP to reset your password. It expires in 5 minutes.</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t24 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t28 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=320 class=t27 style="width:600px;">
<table class=t26 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td class=t25><h1 class=t23 style="margin:0;Margin:0;font-family:Lexend Exa,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:41px;font-weight:900;font-style:normal;font-size:35px;text-decoration:none;text-transform:none;direction:ltr;color:#525252;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">${otp}</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t30 style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t34 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=176 class=t33 style="background-color:#4865CD;overflow:hidden;width:176px;border-radius:12px 12px 12px 12px;">
<table class=t32 role=presentation cellpadding=0 cellspacing=0 width=100% style="width:100%;"><tr><td align=center>
    <table class=t34 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;">
        <tr>
            <td width=176 class=t33 style="background-color:#4865CD;overflow:hidden;width:176px;border-radius:12px 12px 12px 12px;">
                <a href="mailto:?body={otp}" style="display:block;width:100%;height:100%;text-align:center;line-height:43px;text-decoration:none;">
                    <span class=t29 style="display:block;margin:0;Margin:0;font-family:Lexend Exa,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:43px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;letter-spacing:1px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:8px;">
                        Copy OTP
                    </span>
                </a>
            </td>
        </tr>
    </table>
</td></tr>
</table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t40 style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align=center>
<table class=t44 role=presentation cellpadding=0 cellspacing=0 style="Margin-left:auto;Margin-right:auto;"><tr><td width=260 class=t43 style="width:260px;">
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class=t50 style="mso-line-height-rule:exactly;mso-line-height-alt:60px;line-height:60px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></body>
</html>`;
}