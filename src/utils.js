export function createObjectWithDefaultValue(defaultValue = '') {
  return new Proxy(
    {},
    {
      get: function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
          ? object[property]
          : defaultValue;
      },
    }
  );
}

export function deepCopy(src) {
  return JSON.parse(JSON.stringify(src));
}
