import nodemailer from "nodemailer";

export const emailRegisterUser = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "pablogz.cabj@gmail.com", // generated ethereal user
      pass: "irvspfolpvxcgdcb", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // var transport = nodemailer.createTransport(
  //   smtpTransport({
  //     host: "smtp.gmail.com",
  //     secure: true, // use SSL
  //     port: 465, // port for secure SMTP
  //     auth: {
  //       user: "pablogz.cabj@gmail.com",
  //       pass: "irvspfolpvxcgdcb",
  //     },
  //     tls: {
  //       rejectUnauthorized: false,
  //     },
  //   })
  // );

  const info = await transport.sendMail({
    from: "<ecommerce@gmail.com>",
    to: email,
    subject: "ecommerce - Confirm Account",
    text: "activate your account",
    html: `
            <p>Hello ${name}, confirm your ecommerce account</p>
            <p>Your account is almost ready, you just have to check it in the following link: <a href="${process.env.FRONTEND_URL}/confirmUser/${token}">Check account</a></p>
            <p>If you did not create this account you can ignore this message</p>
        `,
  });
};

export const emailForgetPassword = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    // host: "smtp.mailtrap.io",
    host: "smtp.gmail.io",
    port: 465,
    secure: true,
    auth: {
      user: "pablogz.cabj@gmail.com",
      pass: "dwerrwudfttyrzmr",
    },
  });

  const info = await transport.sendMail({
    from: "<ecommerce@gmail.com>",
    to: email,
    subject: "ecommerce - Reset Password",
    text: "Reset your password",
    html: `
          <p>Hello: ${name} You have requested to reset your password</p>
          <p>Follow the following link to generate a new password:
          <a href="${process.env.FRONTEND_URL}/forgetPassword/${token}">Reset password</a>
          </p>
          <p>If you did not request a password change ignore the message</p>
        `,
  });
};
