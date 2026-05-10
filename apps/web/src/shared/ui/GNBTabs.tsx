"use client";

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
    className={cn(
      "bg-gray-75 flex items-center gap-2.5 rounded-full border border-solid border-gray-200 p-2",
      className,
    )}
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
      "text-subtitle-2-sb data-[state=active]:shadow-gnb data-[state=active]:border-gray-75 w-22.5 rounded-full border border-solid border-transparent py-1.5 text-gray-500 data-[state=active]:bg-gray-900 data-[state=active]:text-white",
      className,
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
