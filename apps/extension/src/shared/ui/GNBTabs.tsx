import * as React from "react";
import { cn, Tabs, TabsContent, TabsList, TabsTrigger } from "@recap/ui";

type GnbTabsProps = React.ComponentPropsWithoutRef<typeof Tabs>;
const GnbTabs = ({ className, ...props }: GnbTabsProps) => {
  return <Tabs className={cn(className)} {...props} />;
};

type GnbTabsListProps = React.ComponentPropsWithoutRef<typeof TabsList>;
const GnbTabsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  GnbTabsListProps
>(({ className, ...props }, ref) => (
  <TabsList
    ref={ref}
    className={cn(className, "w-full p-0 gap-0 bg-transparent border-none")}
    {...props}
  />
));
GnbTabsList.displayName = "GnbTabsList";

type GnbTabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsTrigger>;
const GnbTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsTrigger>,
  GnbTabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsTrigger
    ref={ref}
    className={cn(
      className,
      "flex-1 py-3 text-gray-500 rounded-none text-subtitle-2-rg border-0",
      "data-[state=active]:text-subtitle-2-sb data-[state=active]:border-b-2 data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 data-[state=active]:border-gray-900 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-gray-900",
    )}
    {...props}
  />
));
GnbTabsTrigger.displayName = "GnbTabsTrigger";

type GnbTabsContentProps = React.ComponentPropsWithoutRef<typeof TabsContent>;
const GnbTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsContent>,
  GnbTabsContentProps
>(({ className, ...props }, ref) => (
  <TabsContent ref={ref} className={cn(className)} {...props} />
));
GnbTabsContent.displayName = "GnbTabsContent";

export { GnbTabs, GnbTabsContent, GnbTabsList, GnbTabsTrigger };
