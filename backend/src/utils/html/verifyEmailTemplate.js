export const verifyEmailTemplate = (otp) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@500&amp;family=Lexend+Exa:wght@600;900&amp;family=Inter+Tight:wght@500&amp;family=Allerta:wght@900&amp;family=Bungee+Inline:wght@900&amp;display=swap" rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/css2?family=Capriola&family=Lilita+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap" rel="stylesheet">
<style type="text/css">
/* (same styles as your original template) */
</style>
</head>
<body id=body style="min-width:100%;Margin:0px;padding:0px;background-color:#292929;">
<div style="background-color:#292929;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
    <tr><td style="font-size:0;line-height:0;background-color:#292929;" valign="top" align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr><td><div style="line-height:60px;font-size:1px;">&nbsp;</div></td></tr>
        <tr><td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
            <tr><td width="440" style="width:440px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr><td style="padding:0 20px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr><td align="center">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                        <tr><td width="400" style="background-color:#4865CD;width:800px;border-radius:14px 14px 0 0;">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            <tr><td style="padding:26px 25px;text-align:center;">
                              <h1 style="font-family:'Lilita One',serif;font-size:40px;color:#FFFFFF;margin:0;letter-spacing:3px;">TYPERX.IO</h1>
                            </td></tr>
                          </table>
                        </td></tr>
                      </table>
                    </td></tr>
                    <tr><td align="center">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                        <tr><td width="400" style="background-color:#FFFFFF;width:800px;border-radius:0 0 14px 14px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                            <tr><td style="padding:40px;">
                              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr><td align="center">
                                  <h1 style="font-family:'Allerta',sans-serif;font-size:35px;color:#3B3B3B;font-weight:900;margin:0;">Verify your email</h1>
                                </td></tr>
                                <tr><td><div style="line-height:20px;font-size:1px;">&nbsp;</div></td></tr>
                                <tr><td align="center">
                                  <p style="font-family:'Lexend Deca',sans-serif;font-size:16px;color:#111111;margin:0;">To complete your signup, please enter the OTP below. It will expire in 5 minutes.</p>
                                </td></tr>
                                <tr><td><div style="line-height:20px;font-size:1px;">&nbsp;</div></td></tr>
                                <tr><td align="center">
                                  <h1 style="font-family:'Lexend Exa',sans-serif;font-size:35px;color:#525252;font-weight:900;margin:0;">${otp}</h1>
                                </td></tr>
                                <tr><td><div style="line-height:20px;font-size:1px;">&nbsp;</div></td></tr>
                                <tr><td align="center">
                                  <table role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;">
                                    <tr><td width="176" style="background-color:#4865CD;width:176px;border-radius:12px;">
                                      <a href="mailto:?body=${otp}" style="display:block;width:100%;height:100%;text-align:center;line-height:43px;text-decoration:none;">
                                        <span style="font-family:'Lexend Exa',sans-serif;font-size:16px;color:#FFFFFF;font-weight:600;letter-spacing:1px;">Copy OTP</span>
                                      </a>
                                    </td></tr>
                                  </table>
                                </td></tr>
                              </table>
                            </td></tr>
                          </table>
                        </td></tr>
                      </table>
                    </td></tr>
                  </table>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
        <tr><td><div style="line-height:60px;font-size:1px;">&nbsp;</div></td></tr>
      </table>
    </td></tr>
  </table>
</div>
</body>
</html>`;
};
