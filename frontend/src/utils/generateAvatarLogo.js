import { textCapitalize } from "./textCapitalize";

// generate random color from string length
const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringToAvatar = (name, style = {}) => {
  const color = stringToColor(name);
  const firstNameInitials = textCapitalize(name.split(" ")[0][0], true);
  const lastNameInitials = textCapitalize(name.split(" ")[1][0], true);

  const nameInitials = firstNameInitials + lastNameInitials;
  return {
    sx: {
      ...style,
      bgcolor: color,
    },
    children: nameInitials,
  };
};
