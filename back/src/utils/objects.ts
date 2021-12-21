import { IObject } from 'common/interfaces/others';
import { isEmpty } from './others';

/**
 * Get the empty properties in an object
 * @param object
 * @param exceptions array of object properties that can bypass the validation
 * @returns returns the object properties that are empty
 */
export const getEmptyFields = (
  object: IObject,
  exceptions: string[],
): unknown[] => {
  const keysValues = Object.entries(object);
  const empty: unknown[] = [];

  keysValues.forEach(item => {
    if (isEmpty(item[1]) && !exceptions.includes(item[0])) {
      empty.push(item[0]);
    }
  });

  return empty;
};
