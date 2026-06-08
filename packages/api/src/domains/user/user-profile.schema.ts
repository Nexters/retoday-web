import { z } from "zod";

import { CreateResponseSchema } from "../../schema";

const UserProfileSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  imageUrl: z.string(),
  timeZone: z.string().optional(),
  recapPeriod: z.string().nullable().optional(),
  excludedDomains: z.array(z.string()),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;

export const GetUserProfileSchema = CreateResponseSchema(UserProfileSchema);
