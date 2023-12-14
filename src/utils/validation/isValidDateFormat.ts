// validated date in format dd/mm/yyyy
const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;

export const isValidDateFormat = (dateString: string) =>
  dateString === '' || datePattern.test(dateString);
