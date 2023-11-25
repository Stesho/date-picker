export const shiftArrayToLeft = <T>(arr: T[], shiftCount: number): T[] => {
  const { length } = arr;
  const shiftedArray = [];
  const n = shiftCount % length;

  for (let i = 0; i < length; i++) {
    const newIndex = (i - n + length) % length;
    shiftedArray[newIndex] = arr[i];
  }

  return shiftedArray;
};
