import {z} from 'zod';


export const userMessage = z.object({
    content: z.string().min(1).max(300,'message cannot be more than 300 characters')
  });