export const isChecked = (
  isCurrentMonth: boolean,
  dayNumber: number,
  currentDate: Date | null,
) => !!currentDate && isCurrentMonth && currentDate.getDate() === dayNumber;
