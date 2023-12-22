export const shiftArray = <T>(
  arr: T[],
  shiftCount: number,
  getNewIndex: (i: number, n: number, length: number) => number,
): T[] => {
  const { length } = arr;
  const shiftedArray = [];
  const n = shiftCount % length;

  for (let i = 0; i < length; i++) {
    const newIndex = getNewIndex(i, n, length);
    shiftedArray[newIndex] = arr[i];
  }

  return shiftedArray;
};
