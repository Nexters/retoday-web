import { CreateResponseSchema } from "@recap/api";
import { z } from "zod";

const UserProfileSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  imageUrl: z.string(),
  excludedDomains: z.array(z.string()),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;

export const GetUserProfileSchema = CreateResponseSchema(UserProfileSchema);
