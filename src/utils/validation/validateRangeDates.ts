import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { parseDateString } from '@/utils/parseDateString';

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

export const validateRangeDates = (dateString: string): ValidatedDates => {
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

  return {
    startDate: parseDateString(start),
    finishDate: parseDateString(finish),
    errorMessage: '',
  };
};
