import { cn, Item, ItemContent, ItemDescription, ItemTitle } from "@recap/ui";

const TopicCardItem = ({
  title,
  content,
  isPlaceholder = false,
}: {
  title: string;
  content: string;
  isPlaceholder?: boolean;
}) => (
  <Item className="bg-gray-75 flex-col items-stretch rounded-xl border-0 px-6.5 py-6 shadow-none">
    <ItemContent className="gap-0 p-0">
      <ItemTitle className="text-heading-md text-gray-900">{title}</ItemTitle>
      <ItemDescription
        className={cn(
          "text-body-1 mt-4 whitespace-pre-line",
          isPlaceholder ? "text-gray-500" : "text-gray-900",
        )}
      >
        {content}
      </ItemDescription>
    </ItemContent>
  </Item>
);

export default TopicCardItem;
