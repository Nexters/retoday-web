import type { UserProfileType } from "@recap/api";
import { useLocale } from "@recap/i18n";

import { Icon } from "@/shared/ui";

const profileImageAlt = ({
  lastName,
  firstName,
}: Pick<UserProfileType, "firstName" | "lastName">) =>
  [lastName, firstName].filter(Boolean).join(" ").trim();

const ProfileCard = ({ profile }: { profile: UserProfileType | undefined }) => {
  const { t } = useLocale("settings");

  if (!profile) return null;

  return (
    <div className="py-8 px-5">
      <p className="text-subtitle-2-rg text-gray-800">{t("account.title")}</p>
      <div className="flex items-center gap-3 mt-4">
        {profile?.imageUrl ? (
          <img
            src={profile.imageUrl}
            alt={profileImageAlt(profile)}
            className="size-16 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="size-16 rounded-full bg-gray-100" />
        )}
        <div className="flex flex-col">
          <p className="text-headline-sb text-gray-800">
            {profile.lastName}
            {profile.firstName}
          </p>
          <div className="flex items-center gap-1.5">
            <Icon name="email" />
            <p className="text-body-1 text-gray-800">{profile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
