import { shiftArray } from '@/utils/shiftArray';

export const shiftArrayToLeft = <T>(arr: T[], shiftCount: number): T[] =>
  shiftArray(
    arr,
    shiftCount,
    (i: number, n: number, length: number) => (i - n + length) % length,
  );
