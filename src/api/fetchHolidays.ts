import { HOLIDAYS_API_KEY } from '@/constants/environment/environment';
import { ALL_HOLIDAYS_URL, BASE_URL } from '@/constants/holidays/endpoints';
import { Holiday } from '@/types/Holiday';

export const fetchHolidays = async (country: string, year: number) => {
  try {
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
        },
      },
    );

    return await ((await holidays.json()) as Promise<Holiday[]>);
  } catch (error) {
    console.error(error);
    return null;
  }
};
