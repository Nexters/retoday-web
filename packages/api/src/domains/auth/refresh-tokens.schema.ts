import { z } from "zod";

export const RefreshTokensSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokensDTO = z.infer<typeof RefreshTokensSchema>;

export const RefreshTokensResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RefreshTokensResponse = z.infer<typeof RefreshTokensResponseSchema>;
