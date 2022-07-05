export const textCapitalize = (string, first = false) => {
  if (!string) {
    return " ";
  } else if (first === true) {
    return string[0].toUpperCase();
  }
  return string[0].toUpperCase() + string.slice(1);
};
