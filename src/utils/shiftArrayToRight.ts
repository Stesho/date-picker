import { shiftArray } from '@/utils/shiftArray';

export const shiftArrayToRight = <T>(arr: T[], shiftCount: number): T[] =>
  shiftArray(
    arr,
    shiftCount,
    (i: number, n: number, length: number) => (i + n) % length,
  );
