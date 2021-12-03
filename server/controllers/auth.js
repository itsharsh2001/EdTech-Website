import User from "../models/user.js";
import GoogleUser from '../models/googleUsers'
import FacebookUser from '../models/facebookUsers.js'
import { hashPassword, comparePassword } from "../utils/auth";
import mail from "@sendgrid/mail";
import fast2sms from "fast-two-sms";
import OTP from "../models/otp.js";
import OtpGenerator from "otp-generator";
import crypto from "crypto";
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios'
import { createJwtToken } from '../utils/jwt'


var emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

mail.setApiKey(process.env.SENDGRID);

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, date, confirmPassword } = req.body;

    // validate Fields
    if (!name || !email || !phone || !password || !date) {
      return res.status(400).json({ message: "Fill all the Fields" });
    }

    // validate name
    if (name.length < 3)
      return res.status(400).json({ message: "Invalid Name" });

    // validate email
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid E-Mail Address" });

    // validate phone
    if (phone.length != 10)
      return res.status(500).json({ message: "Invalid Phone Number" });

    // validate password
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must have atleast 6 characters" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "Password Doesn't match" });

    // check user exist or not
    let checkUser = await User.findOne({ email: email });
    console.log("hello");

    if (checkUser)
      return res.status(400).json({ message: "User already registered" });

 
    let checkUserPhone = await User.findOne({ phone: phone });

    if (checkUserPhone)
      return res.status(400).json({ message: "User already registered With This Mobile" });

    // hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      phone,
      date,
      password: hashedPassword,
    });

    // saving user
    await user.save();

    //generate new otp
    let otpCode = OtpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const otpData = new OTP({
      email: email,
      otp: otpCode,
    });

    await otpData.save();

    const smsMessage = `<h1>please verify your email using this otp : ${otpCode}</h1>`;

    try {
      const data = {
        to: email,
        from: "gouravkapoor232323@gmail.com",
        subject: "Otp",
        text: "message",
        html: smsMessage,
      };

      mail.send(data);
    } catch (error) {
      console.log(error);
    }

    try {
      await fast2sms.sendMessage({
        authorization: process.env.fast2sms,
        message: `please verify your phone using this otp : ${otpCode}`,
        numbers: [phone],
      });
    } catch (err) {
      console.log(err);
    }

    return res.status(200).json({ message: "true" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Try again" });
  }
};


export const mobileLogin = async (req, res) => {
  try {

    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Enter Mobile Number' })
    }

    const checkUser = await User.findOne({ phone: phone });

    if (!checkUser) {
      return res.status(400).json({ message: 'User Not Registered' })
    }

    if (!checkUser.isverified) {
      return res.status(400).json({ message: 'Verify Your email' })
    }

    const findOtp = await OTP.findOne({phone: phone});

    if(!findOtp){

      //generate new otp
    let otpCode = OtpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const otpData = new OTP({
      phone: phone,
      otp: otpCode,
    });

    await otpData.save();

    try {
      await fast2sms.sendMessage({
        authorization: process.env.fast2sms,
        message: `please verify your email using this otp : ${otpCode}`,
        numbers: [phone],
      });
    } catch (err) {
      console.log(err);
    }

    return res.status(200).json({ message: "true" });

    }
    else{
      
      try {
        await fast2sms.sendMessage({
          authorization: process.env.fast2sms,
          message: `please verify your email using this otp : ${findOtp.otp}`,
          numbers: [phone],
        });
      } catch (err) {
        console.log(err);
      }

      return res.status(200).json({ message: "true" });
    }
    

    


  } catch (error) {
    console.log(error)
  }
}


export const mobileLoginCheckOtp = async (req, res) => {
  try {

    const { phone, otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "Enter Otp" });
    }

    const checkForOtp = await OTP.findOne({ phone: phone });

    //if otp is not present
    if (!phone) return res.status(400).json({ message: "otp Expired" });

    //otp entered is incorrect
    if (checkForOtp.otp !== otp)
      return res.status(400).json({ message: "Wrong Otp" });

      const findEmail = await User.findOne({phone:phone})

      findEmail.password = undefined;

    const token = createJwtToken(findEmail.email);


    res.cookie("token", token, {
      httpOnly: true, // http - in development
      // secure: true, // only works on https - secure - in production
    });

    await OTP.deleteOne({ phone: phone });

    res.status(200).json({ message: "done", user:findEmail });

  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the Fields" });
    }

    // validate email
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Enter Valid Email" });

    // email exist or not
    let checkUser = await User.findOne({ email: email });

    if (!checkUser)
      return res.status(500).json({ message: "User Not Registered" });

    if (!checkUser.isverified) {
      return res.status(500).json({ message: "Please verify your email" });
    }

    // matching password
    const passwordMatch = await comparePassword(password, checkUser.password);

    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // creating token
    const token = createJwtToken(email);

    // Now Return User and Token to the client.
    checkUser.password = undefined;

    res.cookie("token", token, {
      httpOnly: true, // http - in development
      // secure: true, // only works on https - secure - in production
    });

    return res.status(200).json({ message: "true", user: checkUser });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "signout success" });
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.user.email })

    if (!user) {
      return res.sendStatus(403)
    } else {
      return res.status(200).json({ message: true })
    }
  } catch (err) {
    console.log(err)
  }
};




export const checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp) return res.status(400).json({ message: "Enter Otp" });

    const checkForOtp = await OTP.findOne({ email: email });

    //if otp is not present
    if (!checkForOtp) return res.status(400).json({ message: "otp Expired" });

    //otp entered is incorrect
    if (checkForOtp.otp !== otp)
      return res.status(400).json({ message: "Wrong Otp" });

    const verifiedUser = await User.findOne({ email: checkForOtp.email });

    verifiedUser.isverified = true;

    verifiedUser.save();

    await OTP.deleteOne({ email: email });


    // Now Return User and Token to the client.
    verifiedUser.password = undefined;

    // creating token
    const token = createJwtToken(email);


    res.cookie("token", token, {
      httpOnly: true, // http - in development
      // secure: true, // only works on https - secure - in production
    });

    return res.status(200).json({ message: "true", user: verifiedUser });

  } catch (error) {
    console.log(error);
  }
};


export const resendOtpForgot = async (req, res) => {
  try {

    const { email } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser)
      return res.status(400).json({ message: "User Not Registered" });

    const otpExpired = await OTP.findOne({ email: email });

    if (otpExpired) {
      return res.status(500).json({ message: "Check Your Otp on email" });
    }

    //generate new otp
    let otpCode = OtpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const otpData = new OTP({
      email: email,
      otp: otpCode,
    });

    await otpData.save();

    const smsMessage = `<h1>please verify your email using this otp : ${otpCode}</h1>`;

    try {
      const data = {
        to: email,
        from: "gouravkapoor232323@gmail.com",
        subject: "Otp",
        text: "message",
        html: smsMessage,
      };

      mail.send(data);

      try {
        await fast2sms.sendMessage({
          authorization: process.env.fast2sms,
          message: `please verify your email using this otp : ${otpCode}`,
          numbers: [phone],
        });
      } catch (err) {
        reject(err)
      }

    } catch (error) {
      reject(err)
    }

    return res.status(200).json({ message: "check your otp Your Email" });

  } catch (error) {
    console.log(error)
  }
}

export const resendOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const findUser = await User.findOne({ email: email });

    if (!findUser)
      return res.status(400).json({ message: "User Not Registered" });

    const otpExpired = await OTP.findOne({ email: email });

    if (otpExpired) {
      return res.status(200).json({ message: "check your otp Your Email"});
    }

    if (findUser.isverified == true)
      return res.status(400).json({ message: "You are already Verified!" });

    //generate new otp
    let otpCode = OtpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const otpData = new OTP({
      email: email,
      otp: otpCode,
    });

    await otpData.save();

    const smsMessage = `<h1>please verify your email using this otp : ${otpCode}</h1>`;

    try {
      const data = {
        to: email,
        from: "gouravkapoor232323@gmail.com",
        subject: "Otp",
        text: "message",
        html: smsMessage,
      };

      mail.send(data);

      try {
        await fast2sms.sendMessage({
          authorization: process.env.fast2sms,
          message: `please verify your email using this otp : ${otpCode}`,
          numbers: [phone],
        });
      } catch (err) {
       reject(err);
      }

    } catch (error) {
      reject(err);
    }


    return res.status(200).json({ message: "check your otp Your Email" });
  } catch (error) {
    return res.status(400).json({ message: "Try Again" });
  }
};


export const resendotponmobile = async (req,res) =>{
  try{
    const { phone } = req.body;

    const userOtp = await OTP.findOne({phone:phone});

    if(userOtp){
      return res.status(400).json({message:'Check your OTP on phone.'})
    }

    //generate new otp
    let otpCode = OtpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const otpData = new OTP({
      phone: phone,
      otp: otpCode,
    });

    await otpData.save();

    try {
      await fast2sms.sendMessage({
        authorization: process.env.fast2sms,
        message: `please verify your email using this otp : ${otpCode}`,
        numbers: [phone],
      });
    } catch (err) {
      reject(err)
    }

    return res.status(200).json({ message: "check Your email for new otp" });


  }catch(error){
    console.log(error)
  }
}

export const updatePassword = async (req, res) => {
  try {

    const { email, password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Enter all the Fields' })
    }

    if (password != confirmPassword) {
      return res.status(500).json({ message: "Passwords are not matching" })
    }


    if (password.length < 6) {
      return res.status(500).json({ message: "Password should have atleast 6 digits" })
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res.status(400).json({ message: "Your email is not registered here" })
    }

    const hashedPassword = await hashPassword(password);

    findUser.password = hashedPassword;

    await findUser.save();


    // Now Return User and Token to the client.
    findUser.password = undefined;

    // creating token
    const token = createJwtToken(email);


    res.cookie("token", token, {
        httpOnly: true, // http - in development
        // secure: true, // only works on https - secure - in production
      });

    return res.status(200).json({ message: "true", user: findUser });
  }
  catch (error) {
    console.log(error)
  }
}

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const userFind = await User.findOne({ email: email });

    if (!userFind) {
      return res.status(400).json({ message: "user not registered" })
    }

    const checkOtp = await OTP.findOne({email:email});

    if(checkOtp) {
      return res.status(200).json({ message:"check otp on email" });
      
    }

    //generate new otp
    let otpCode = OtpGenerator.generate(6, {
      alphabets: false,
      specialChars: false,
      upperCase: false,
    });

    const otpData = new OTP({
      email: email,
      otp: otpCode,
    });

    await otpData.save();

    const smsMessage = `<h1>please verify your email using this otp : ${otpCode}</h1>`;

    try {
      const data = {
        to: email,
        from: "gouravkapoor232323@gmail.com",
        subject: "Otp",
        text: "message",
        html: smsMessage,
      };

      mail.send(data);
      res.status(200).json({ message: true });

    } catch (error) {
      reject(err)
    }



  } catch (error) {
    console.log(error)
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    if (!ticket) {
      return res.status(400).json({ message: "Unauthorised Email" });
    }

    const email = ticket.payload.email;
    const email_verified = ticket.payload.email_verified;
    const name = ticket.payload.given_name


    // email exist or not
    let checkUser = await User.findOne({ email: email });

    if (!checkUser) {
      const checkGoogleUser = await GoogleUser.findOne({ email: email });
      if (!checkGoogleUser) {
        const saveGoogleUser = new GoogleUser({
          email: email,
          name: name,
          emailVerified: email_verified,
        })
        await saveGoogleUser.save();

        const user = {
          email: email,
          name: name
        }

        const token = createJwtToken(email);
        res.cookie("token", token, {
          httpOnly: true, // http - in development
          // secure: true, // only works on https - secure - in production
        });

        return res.status(200).json({ message: "true", user: user });
      } else {

        const token = createJwtToken(email);
        res.cookie("token", token, {
          httpOnly: true, // http - in development
          // secure: true, // only works on https - secure - in production
        });

        return res.status(200).json({ message: "true", user: checkGoogleUser });
      }
    } else {
      checkUser.password = undefined;
      const token = createJwtToken(email);
      res.cookie("token", token, {
        httpOnly: true, // http - in development
        // secure: true, // only works on https - secure - in production
      });
      return res.status(200).json({ message: "true", user: checkUser });
    }



  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};


export const facebookLogin = async (req, res) => {
  try {

    const { accessToken, userID } = req.body;

    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}?fields=id,name,email&access_token=${accessToken}`

    return (
      axios(urlGraphFacebook, {
        method: 'GET'
      }).then(async response => {
        const name = response.data.name;
        const email = response.data.email;

        const checkInUser = await User.findOne({ email: email });

        if (!checkInUser) {
          const checkInGoogle = await GoogleUser.findOne({ email: email });

          if (!checkInGoogle) {
            const checkInFacebook = await FacebookUser.findOne({ email: email });

            if (!checkInFacebook) {
              const newUser = new FacebookUser({
                email: email,
                name: name
              })

              await newUser.save();

              const sendUser = {
                email: email,
                name: name
              }
              const token = createJwtToken(email);
              res.cookie("token", token, {
                httpOnly: true, // http - in development
                // secure: true, // only works on https - secure - in production
              });

              res.status(200).json({ message: true, user: sendUser });


            } else {
              const token = createJwtToken(email);
              res.cookie("token", token, {
                httpOnly: true, // http - in development
                // secure: true, // only works on https - secure - in production
              });
              res.status(200).json({ message: true, user: checkInFacebook });
            }

          } else {
            const token = createJwtToken(email);
            res.cookie("token", token, {
              httpOnly: true, // http - in development
              // secure: true, // only works on https - secure - in production
            });
            res.status(200).json({ message: true, user: checkInGoogle });
          }

        } else {
          checkInUser.password = undefined;
          const token = createJwtToken(email);
          res.cookie("token", token, {
            httpOnly: true, // http - in development
            // secure: true, // only works on https - secure - in production
          });
          res.status(200).json({ message: true, user: checkInUser });
        }

      }).catch((err) => {
        return res.status(400).json({ message: 'Unauthorised email' })
      })
    )

  } catch (err) {
    console.log(err)
  }
}
