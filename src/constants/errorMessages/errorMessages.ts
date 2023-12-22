export const errorMessages = {
  datepickerFormat: 'Date should be in format dd/mm/yyyy',
  rangepickerFormat: 'Date should be in format dd/mm/yyyy - dd/mm/yyyy',
  datesValidation: (dateKind?: string) =>
    `Invalid ${dateKind ? `${dateKind} ` : ''}date`,
  datesRange: 'Start date cannot be later than finish date',
  minRangeDate: 'Start date cannot be less than minimum date',
  maxRangeDate: 'Finish date cannot be greater than maximum date',
  minDate: 'Date cannot be less than minimum date',
  maxDate: 'Date cannot be greater than maximum date',
};
