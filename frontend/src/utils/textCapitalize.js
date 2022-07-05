export const textCapitalize = (string, isAvatar = false) => {
  if (!string || string === undefined) {
    return " ";
  } else if (isAvatar === true) {
    return string[0].toUpperCase();
  }
  return string[0].toUpperCase() + string.slice(1);
};
