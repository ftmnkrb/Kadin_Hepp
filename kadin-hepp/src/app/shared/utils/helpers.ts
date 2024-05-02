export function convertFirebaseResponse<T, U>(response: T): U[] {
  const array: U[] = [];

  for (const key in response) {
    if (Object.prototype.hasOwnProperty.call(response, key)) {
      array.push({ ...response[key], id: key } as U);
    }
  }

  return array;
}
