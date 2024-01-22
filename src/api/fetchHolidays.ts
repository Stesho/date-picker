import { HOLIDAYS_API_KEY } from '@/constants/environment/environment';
import { ALL_HOLIDAYS_URL, BASE_URL } from '@/constants/holidays/endpoints';
import { Holiday } from '@/types/Holiday';

export const fetchHolidays = async (country: string, year: number) => {
  const searchParams = new URLSearchParams({
    type: 'major_holiday',
    country: country.toString(),
    year: year.toString(),
  });

  const holidays = await fetch(
    `${BASE_URL}${ALL_HOLIDAYS_URL}?${searchParams}`,
    {
      headers: {
        Accept: 'text/json',
        'X-Api-Key': HOLIDAYS_API_KEY,
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    },
  );

  return (await holidays.json()) as Promise<Holiday[]>;
};
