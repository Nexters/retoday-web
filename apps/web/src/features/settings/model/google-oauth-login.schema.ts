import z from "zod";

export const GoogleOAuthLoginSchema = z.object({
  oAuthToken: z.string(),
  provider: z.enum(["GOOGLE"]),
});

export type GoogleOAuthLoginDTO = z.infer<typeof GoogleOAuthLoginSchema>;
