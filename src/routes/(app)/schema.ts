	
import { z } from "zod";
 
export const formSchema = z.object({
  code: z.string().length(6),
  cgu: z.boolean()
});
 
export type FormSchema = typeof formSchema;