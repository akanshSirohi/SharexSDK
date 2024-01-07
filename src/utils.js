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

module.exports = {extractPluginUID};