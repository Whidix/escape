import { z } from "zod";
 
export const formSchema = z.object({
  answer: z.string(),
  escapeId: z.string()
});
 
export type FormSchema = typeof formSchema;