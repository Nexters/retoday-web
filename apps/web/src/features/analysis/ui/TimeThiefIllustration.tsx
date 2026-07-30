import Image from "next/image";

import TimeThiefImg from "@/shared/assets/img/time-thief.png";

const TimeThiefIllustration = ({
  alt,
  faviconUrl,
  faviconAlt = "",
}: {
  alt: string;
  faviconUrl: string | null;
  faviconAlt?: string;
}) => {
  return (
    <div className="relative w-full">
      <Image
        src={TimeThiefImg}
        alt={alt}
        className="h-auto w-full object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />

      <div className="absolute top-[60%] left-[65%] aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt={faviconAlt}
            className="size-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="size-full bg-gray-300" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

export default TimeThiefIllustration;
