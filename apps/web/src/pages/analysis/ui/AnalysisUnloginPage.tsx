import Image, { type StaticImageData } from "next/image";
import { cn } from "@recap/ui";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/entities/auth/ui";
import LoginBanner from "@/features/login/ui/LoginBanner";
import UnloginCategoryImg from "@/shared/assets/img/analysis-unlogin-category.png";
import UnloginScreenTimeImg from "@/shared/assets/img/analysis-unlogin-screentime.png";
import UnloginTimeThiefImg from "@/shared/assets/img/analysis-unlogin-timethief.png";
import UnloginTopVisitedImg from "@/shared/assets/img/analysis-unlogin-topvisited.png";
import UnloginWorkPatternImg from "@/shared/assets/img/analysis-unlogin-workpattern.png";

const AssetCardImage = ({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={cn("w-full overflow-hidden rounded-[1.25rem]", className)}>
      <Image src={src} alt={alt} className="h-auto w-full" priority={false} />
    </div>
  );
};

const AnalysisUnloginPage = () => {
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const handleLoginSuccess = async () => {
    await queryClient.resetQueries({ queryKey: ["getUserProfile"] });
    await queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });

    refreshAuth();
  };

  return (
    <div className="flex flex-col gap-4 md:gap-5 xl:gap-7">
      <LoginBanner handleLoginSuccess={handleLoginSuccess} />

      <AssetCardImage src={UnloginScreenTimeImg} alt="unlogin-screentime" />
      <AssetCardImage src={UnloginCategoryImg} alt="unlogin-category" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-7">
        <AssetCardImage src={UnloginWorkPatternImg} alt="unlogin-workpattern" />
        <AssetCardImage src={UnloginTimeThiefImg} alt="unlogin-timethief" />
      </div>

      <AssetCardImage src={UnloginTopVisitedImg} alt="unlogin-topvisited" />
    </div>
  );
};

export default AnalysisUnloginPage;
