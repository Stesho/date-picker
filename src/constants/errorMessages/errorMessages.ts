export const errorMessages = {
  datepickerFormat: 'Date should be in format dd/mm/yyyy',
  rangepickerFormat: 'Date should be in format dd/mm/yyyy - dd/mm/yyyy',
  datesValidation: (dateKind?: string) =>
    `Invalid ${dateKind ? `${dateKind} ` : ''}date`,
  datesRange: 'Start date cannot be later than finish date',
};
