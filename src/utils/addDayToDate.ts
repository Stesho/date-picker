export const addDayToDate = (date: Date, daysCount: number) => {
  date.setDate(date.getDate() + daysCount);
  return date;
};
