"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { TimeZoneSchemaType } from "@recap/api";

const TimeZoneContext = createContext<TimeZoneSchemaType | null>(null);

const TimeZoneProvider = ({
  timeZone,
  children,
}: {
  timeZone: TimeZoneSchemaType;
  children: ReactNode;
}) => {
  return (
    <TimeZoneContext.Provider value={timeZone}>
      {children}
    </TimeZoneContext.Provider>
  );
};

const useTimeZoneContext = () => useContext(TimeZoneContext);

export { TimeZoneProvider, useTimeZoneContext };
