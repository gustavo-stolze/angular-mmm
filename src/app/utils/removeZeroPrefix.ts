export const removeZeroPrefix = (number: number) => {
  if (number > 9) return number;

  let value = number.toString().slice(0, 1);

  return `${Number(value)}`;
};
