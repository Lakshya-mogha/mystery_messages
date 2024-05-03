import {z} from 'zod';


export const verificationCode = z.object({
    code: z.string().min(6,{message:'verification code can not be less than 6 characters'})
  });