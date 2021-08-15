export const isUrl = (string: string): boolean => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm;
  return regex.test(string);
};

export const isEmail = (string: string): boolean => {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
  return regex.test(string);
};

export const isValidCode = (string: string): boolean => {
  const regex = /^ECOM-(?:\d){4}-(?:\d){4}/gm;
  return regex.test(string);
};