import { IObject } from 'commons/interfaces';

/**
 * Checks if an item (string, number, array, object) is empty or not
 * @param item
 * @returns returns true if empty, or false if not
 */

export function isEmpty(item: any) {
  if (!!item) {
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
  }
  return true;
}

/**
 * Get cookie value by name
 * @param cookieName name of the cookie to look for
 * @returns cookie value
 */
export function getCookie(cookieName: string) {
  let cookie: IObject = {};
  document.cookie.split(';').forEach(function (el) {
    let [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}

/**
 *
 * @param object
 * @returns the object properties that are empty
 */
export const getEmptyFields = (object: IObject): unknown[] => {
  const keysValues = Object.entries(object);
  const empty: unknown[] = [];

  keysValues.forEach(item => {
    if (isEmpty(item[1])) {
      empty.push(item[0]);
    }
  });

  return empty;
};

/**
 * Make a copy of an object
 * @param obj object to copy
 * @returns copy if the object
 */
export const copyObj = (obj: IObject) => {
  return JSON.parse(JSON.stringify(obj));
};
