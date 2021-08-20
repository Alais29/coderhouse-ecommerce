/**
 * 
 * @param item string, number, array, or object
 * @returns Determines if the item passed as argument is empty or not
 */
export const isEmpty = (item: string | number | unknown): boolean => {
  switch (typeof item) {
    case 'string':
      if (item !== '' && item !== 'null' && item !== 'undefined') {
        return false;
      }
      return true;
    case 'number':
      return false;
    case 'object':
      if (JSON.stringify(item) === '{}' || JSON.stringify(item) === '[]') {
        return true;
      }
      return false;
  }
  return true;
};