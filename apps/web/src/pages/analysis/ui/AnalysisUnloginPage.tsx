import Image, { type StaticImageData } from "next/image";
import { cn, Grid, Stack } from "@recap/ui";

import LoginBanner from "@/entities/login/ui/LoginBanner";
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
  return (
    <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
      <LoginBanner />

      <AssetCardImage src={UnloginScreenTimeImg} alt="unlogin-screentime" />
      <AssetCardImage src={UnloginCategoryImg} alt="unlogin-category" />

      <Grid
        cols={{ base: 1, md: 2 }}
        gap="none"
        className="gap-4 md:gap-5 xl:gap-7"
      >
        <AssetCardImage src={UnloginWorkPatternImg} alt="unlogin-workpattern" />
        <AssetCardImage src={UnloginTimeThiefImg} alt="unlogin-timethief" />
      </Grid>

      <AssetCardImage src={UnloginTopVisitedImg} alt="unlogin-topvisited" />
    </Stack>
  );
};

export default AnalysisUnloginPage;
