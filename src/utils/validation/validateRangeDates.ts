import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { parseDateString } from '@/utils/dates/parseDateString';

// date in format dd/mm/yyyy - dd/mm/yyyy
const dateFormatPattern =
  /^(\d{2})\/(\d{2})\/(\d{4}) - (\d{2})\/(\d{2})\/(\d{4})$/;

// validated date in format dd/mm/yyyy. 0 < dd < 32; 0 < mm < 13;
const dateValidationPattern =
  /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;

const separator = ' - ';

interface ValidatedDates {
  startDate?: Date | null;
  finishDate?: Date | null;
  errorMessage: string;
}

export const validateRangeDates = (
  dateString: string,
  minDate?: Date,
  maxDate?: Date,
): ValidatedDates => {
  const [start, finish] = dateString.split(separator);

  if (dateString === '') {
    return {
      startDate: null,
      finishDate: null,
      errorMessage: '',
    };
  }

  if (!dateFormatPattern.test(dateString)) {
    return {
      startDate: null,
      finishDate: null,
      errorMessage: errorMessages.rangepickerFormat,
    };
  }

  if (!dateValidationPattern.test(start)) {
    return {
      startDate: null,
      errorMessage: errorMessages.datesValidation('start'),
    };
  }

  if (!dateValidationPattern.test(finish)) {
    return {
      finishDate: null,
      errorMessage: errorMessages.datesValidation('finish'),
    };
  }

  if (parseDateString(start) > parseDateString(finish)) {
    return {
      errorMessage: errorMessages.datesRange,
    };
  }

  if (minDate && parseDateString(start) < minDate) {
    return {
      startDate: null,
      finishDate: null,
      errorMessage: errorMessages.minRangeDate,
    };
  }

  if (maxDate && parseDateString(finish) > maxDate) {
    return {
      startDate: null,
      finishDate: null,
      errorMessage: errorMessages.maxRangeDate,
    };
  }

  return {
    startDate: parseDateString(start),
    finishDate: parseDateString(finish),
    errorMessage: '',
  };
};
