import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendEmailVerification";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, password, email } = await request.json();
    const verifyCode = Math.floor(Math.random() * 1000000).toString();
    const userVerifiedByUsername = await userModel.findOne({
      username,
      isVerified:"true",
    },{});
    console.log(userVerifiedByUsername);
    if (userVerifiedByUsername) {
      return Response.json(
        {
          message: "username is already taken",
        },
        {
          status: 400,
        }
      );
    }
    const userRegisteredByEmail = await userModel.findOne({ email });
    console.log(userRegisteredByEmail);
    if (userRegisteredByEmail) {
      const userVerifiedRegisteredByEmail = await userModel.findOne({
        email,
        isVerified: true,
      });
      console.log(userVerifiedRegisteredByEmail);
      if (userVerifiedRegisteredByEmail) {
        return Response.json(
          {
            message: "Email is already registered",
          },
          {
            status: 400,
          }
        );
      }
    }
    if (!userRegisteredByEmail) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyCodeExp = new Date(Date.now() + 3600000);
      const newUser = new userModel({
        username: username,
        email,
        Password: hashedPassword,
        verificationCode: verifyCode,
        verificationCodeExpires: verifyCodeExp,
        isVerified: false,
        messages: [],
      });
      console.log(newUser)
    }
    const emailResponse = await sendVerificationEmail(
      username,
      email,
      verifyCode
    );
    console.log(emailResponse);
    if (emailResponse.success) {
      return Response.json(
        {
          message: "user registered successfully",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("cannot register user", error);
    return Response.json(
      {
        message: "user not registered",
      },
      {
        status: 500,
      }
    );
  }
}
