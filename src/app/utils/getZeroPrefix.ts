export function getZeroPrefix(number: number) {
  if (number > 9) return number;
  return `0${number}`;
}
