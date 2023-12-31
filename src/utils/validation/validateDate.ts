import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { parseDateString } from '@/utils/dates/parseDateString';
import { isValidDateFormat } from '@/utils/validation/isValidDateFormat';

// validated date in format dd/mm/yyyy. 0 < dd < 32; 0 < mm < 13;
const dateValidationPattern =
  /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;

interface ValidatedDate {
  currentDate: Date | null;
  errorMessage: string;
}

export const validateDate = (
  dateString: string,
  minDate?: Date,
  maxDate?: Date,
): ValidatedDate => {
  if (dateString === '') {
    return {
      currentDate: null,
      errorMessage: '',
    };
  }

  if (!isValidDateFormat(dateString)) {
    return {
      currentDate: null,
      errorMessage: errorMessages.datepickerFormat,
    };
  }

  if (!dateValidationPattern.test(dateString)) {
    return {
      currentDate: null,
      errorMessage: errorMessages.datesValidation(''),
    };
  }

  if (minDate && parseDateString(dateString) < minDate) {
    return {
      currentDate: null,
      errorMessage: errorMessages.minDate,
    };
  }

  if (maxDate && parseDateString(dateString) > maxDate) {
    return {
      currentDate: null,
      errorMessage: errorMessages.maxDate,
    };
  }

  return {
    currentDate: parseDateString(dateString),
    errorMessage: '',
  };
};
