import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { apiResponse } from "@/types/apiResponse";



export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<apiResponse> {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: VerificationEmail({ username, otp:verifyCode}),
    });
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error) {
    console.error("Verification email not sent", error);
    return {
      success: false,
      message: "Verification email not sent",
    };
  }
}
