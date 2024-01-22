import { holidaysInstance } from '@/api/config';
import { HOLIDAYS_API_KEY } from '@/constants/environment/environment';
import { ALL_HOLIDAYS_URL } from '@/constants/holidays/endpoints';
import { Holiday } from '@/types/Holiday';

export const fetchHolidays = async (country: string, year: number) => {
  console.log('fetchHolidays:', HOLIDAYS_API_KEY);
  const received: Holiday[] = await holidaysInstance.get(
    `${ALL_HOLIDAYS_URL}`,
    {
      params: {
        type: 'major_holiday',
        country,
        year,
      },
    },
  );

  return received;
};
