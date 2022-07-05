export const textCapitalize = (string) => {
  if (!string || string === undefined) {
    return " ";
  }
  return string[0].toUpperCase() + string.slice(1);
};
