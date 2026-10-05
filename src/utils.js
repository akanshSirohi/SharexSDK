/**
 * The function extracts the plugin UID from a given URL.
 * @param url - The `url` parameter is a string that represents a URL.
 * @returns the UID (Unique Identifier) of a plugin extracted from the given URL.
 */
function extractPluginUID(url) {
    const pattern = /\/SharexApp\/([\w.-]+)(?:\/[^/]+)*\/?/i;
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

function connectionOptions(options, location) {
    const development = options.development;
    const debug = options.debug;
    let server, token = '', packageName;
    if (development !== undefined) {
        if (development !== true && (!development || typeof development !== 'object')) throw new Error('development must be true or an options object');
        packageName = development.package_name || options.package_name;
        if (development.server_url !== undefined) {
            if (typeof development.server_url !== 'string') throw new Error('development.server_url must be a ShareX HTTP URL');
            server = new URL(development.server_url);
            token = development.token || new URLSearchParams(server.hash.slice(1)).get('sharex-dev-token') || '';
            if (!/^[a-f0-9]{64}$/.test(token)) throw new Error('Copy the development connection from ShareX settings');
        }
    } else if (debug !== undefined) {
        if (!debug || typeof debug !== 'object' || typeof debug.host !== 'string' || !debug.port) {
            throw new Error('debug must have a property called host and port');
        }
        const host = debug.host.includes(':') && !debug.host.startsWith('[') ? `[${debug.host}]` : debug.host;
        server = new URL(`${debug.secure ? 'https' : 'http'}://${host}:${debug.port}`);
        token = debug.token || '';
        packageName = debug.package_name || options.package_name || 'debug';
        if (token && !/^[a-f0-9]{64}$/.test(token)) throw new Error('Invalid development token');
    } else {
        if (!location) throw new Error('Create SharexSDK in the browser, or provide development.server_url');
        server = new URL(location.href || `${location.protocol}//${location.hostname}:${location.port || (location.protocol === 'https:' ? 443 : 80)}${location.pathname}`);
        packageName = options.package_name || extractPluginUID(location.pathname).replaceAll('-', '.');
    }
    if (development !== undefined && !packageName) throw new Error('development.package_name is required');
    if (server && (!['http:', 'https:'].includes(server.protocol) || server.username || server.password)) throw new Error('ShareX server must use HTTP or HTTPS');
    if (typeof packageName !== 'string' || packageName.length > 128 || !/^[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*$/.test(packageName)) {
        throw new Error('A valid plugin package_name is required');
    }
    if (server) {
        const port = Number(server.port || (server.protocol === 'https:' ? 443 : 80));
        if (!Number.isInteger(port) || port < 1 || port > 65534) throw new Error('ShareX HTTP port must be between 1 and 65534');
        const socket = new URL(`${server.protocol === 'https:' ? 'wss' : 'ws'}://${server.hostname}:${port + 1}/`);
        if (token) {
            socket.pathname = '/__sharex_dev';
            socket.searchParams.set('token', token);
            socket.searchParams.set('package', packageName);
            packageName = `dev.${packageName}`;
        }
        server = socket.href;
    }
    return { socketUrl: server || null, packageName, sessionKey: `sharex_sdk_uuid:${server || 'development'}:${packageName}` };
}

module.exports = {extractPluginUID, convertToDotNotation, connectionOptions};
