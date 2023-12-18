export const weeksInMonth = (year: number, month: number) => {
  const maxDays = new Date(year, month + 1, 0).getDate() + 1;
  const firstDayInMonth = new Date(year, month, 1).getDay();
  const lastDayInMonth = firstDayInMonth + maxDays - 1;

  return Math.floor(lastDayInMonth / 7) + 1;
};
