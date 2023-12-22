export const deleteEveryNthElement = <T>(
  arr: T[],
  n: number,
  startWith: number,
) => {
  const newArr = [...arr];

  for (let i = startWith - 1; i < arr.length; i += n - 1) {
    newArr.splice(i, 1);
  }

  return newArr;
};
