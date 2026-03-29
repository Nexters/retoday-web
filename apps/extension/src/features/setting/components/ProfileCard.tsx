import { Icon } from "@/components";
import { useGetUserProfile } from "@/entities/user/queries/user-query";

const ProfileCard = () => {
  const { data: userProfile } = useGetUserProfile();

  return (
    <div className="py-8 px-5">
      <p className="text-subtitle-2-rg text-gray-800">내 계정</p>
      <div className="flex items-center gap-3 mt-4">
        {userProfile?.imageUrl ? (
          <img
            src={userProfile.imageUrl}
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
            className="size-16 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="size-16 rounded-full bg-gray-100" />
        )}
        <div className="flex flex-col">
          <p className="text-headline-sb text-gray-800">
            {userProfile?.lastName}
            {userProfile?.firstName}
          </p>
          <div className="flex items-center gap-1.5">
            <Icon name="email" />
            <p className="text-body-1 text-gray-800">{userProfile?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
