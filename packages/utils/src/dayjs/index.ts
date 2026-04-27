import dayjs from "dayjs";

const formatDate = (input: string | Date, pattern = "YYYY-MM-DD HH:mm") => {
  return dayjs(input).format(pattern);
};

export { dayjs, formatDate };
