import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import "dayjs/locale/en";
import "dayjs/locale/ja";
import "dayjs/locale/ko";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export { dayjs };
export type { Dayjs } from "dayjs";
