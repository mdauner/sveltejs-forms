export function createObjectWithDefaultValue(defaultValue = '') {
	return new Proxy(
		{},
		{
			get: function (/** @type {any} */ object, property) {
				return Object.prototype.hasOwnProperty.call(object, property)
					? object[property]
					: defaultValue;
			}
		}
	);
}

/**
 * @param {Object} src
 */
export function deepCopy(src) {
	return JSON.parse(JSON.stringify(src));
}
