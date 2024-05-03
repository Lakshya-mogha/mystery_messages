import {z} from 'zod';


export const messageAcceptSchema = z.object({
    accept : z.boolean(),
});