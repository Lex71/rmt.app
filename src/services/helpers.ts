import { addMinutes, format } from "date-fns";

export const addTime = (
  time: string = "20:30",
  minutes: number = 15
): string => {
  // const timeString = "20:30";
  const date = new Date();
  date.setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1])); // Set the time to 20:30

  const newDate = addMinutes(date, minutes);
  return format(newDate, "HH:mm");
};
