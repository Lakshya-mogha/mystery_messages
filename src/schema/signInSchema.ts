import {z} from 'zod';


export const signInValidation = z.object({
    email: z.string().email({message:'invalid email'}),
    password : z.string().min(6,'password must be more than 6 characters').max(10,'password can not be more than 10 characters')
  });