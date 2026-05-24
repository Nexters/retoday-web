import { Avatar, AvatarFallback, AvatarImage, cn } from "@recap/ui";

const TimeThiefPill = ({
  title,
  faviconUrl,
}: {
  title: string;
  faviconUrl: string | null;
}) => {
  return (
    <div
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-2 self-start",
        "bg-blue-75 rounded-xl px-3 py-2",
        "text-title-1 text-gray-900",
      )}
    >
      <Avatar aria-hidden className="size-6 shrink-0">
        {faviconUrl && (
          <AvatarImage
            src={faviconUrl}
            alt=""
            className="object-contain"
            referrerPolicy="no-referrer"
          />
        )}
        <AvatarFallback />
      </Avatar>

      <span className="whitespace-nowrap">{title}</span>
    </div>
  );
};

export default TimeThiefPill;
