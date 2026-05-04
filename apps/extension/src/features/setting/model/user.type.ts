export type UserProfileResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  timeZone: string;
  recapPeriod: string;
  excludedDomains: string[];
};
