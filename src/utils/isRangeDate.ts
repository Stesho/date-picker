export const isRangeDate = (
  startDate: Date | null,
  finishDate: Date | null,
  date: Date,
  isCurrentMonth: boolean,
) => {
  if (!startDate || !finishDate || !isCurrentMonth) {
    return false;
  }

  return date > startDate && date < finishDate;
};
