/**
 * The function extracts the plugin UID from a given URL.
 * @param url - The `url` parameter is a string that represents a URL.
 * @returns the UID (Unique Identifier) of a plugin extracted from the given URL.
 */
function extractPluginUID(url) {
    const pattern = /\/SharexApp\/([\w-]+)(?:\/[^/]+)*\/?/i;
    const match = url.match(pattern);
    return match ? match[1] : '';
}

/**
 * The function `convertToDotNotation` converts a nested object into dot notation format.
 * @param obj - The `obj` parameter is an object that you want to convert to dot notation.
 * @param [parentKey] - The `parentKey` parameter is a string that represents the parent key of the
 * current object being processed. It is used to build the dot notation key for nested objects.
 * @returns The function `convertToDotNotation` returns an array of strings in dot notation format.
 * Each string in the array represents a key-value pair in the input object `obj`, where the key is
 * converted to dot notation by concatenating it with its parent keys (if any), and the value is
 * appended after a colon.
 */
function convertToDotNotation(obj, parentKey = "") {
    let result = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const currentKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null) {
                result = result.concat(convertToDotNotation(obj[key], currentKey));
            } else {
                result.push(`${currentKey}:${obj[key]}`);
            }
        }
    }
    return result;
}

module.exports = {extractPluginUID, convertToDotNotation};