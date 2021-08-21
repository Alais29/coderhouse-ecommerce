/**
 *
 * @param string
 * @returns checks if the string is a valid URL
 */
export const isUrl = (string: string): boolean => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm;
  return regex.test(string);
};

/**
 *
 * @param string
 * @returns checks if the string is a valid email
 */
export const isEmail = (string: string): boolean => {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
  return regex.test(string);
};

/**
 *
 * @param string
 * @returns checks if the string is a valid product code
 */
export const isValidCode = (string: string): boolean => {
  const regex = /^ECOM-(?:\d){4}-(?:\d){4}/gm;
  return regex.test(string);
};
