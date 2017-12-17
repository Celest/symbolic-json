const fs = require('fs');

function tryParseJSON (jsonString) {
    try {
        const o = JSON.parse(jsonString);
        if (o && typeof o === 'object') {
            return o;
        }
    } catch (e) {
        // I don't want to crash here.
    }

    return false;
}

/**
 * Loads and identifies the given file.
 *
 * Shamelessly stolen from yenv (see README.md).
 *
 * @param filePath
 * @returns {*}
 */
module.exports = function loadAndIdentify (filePath) {
    // Read the file.
    const contents = fs.readFileSync(
        filePath,
        'utf-8'
    );

    if (!contents) return { content: '', type: null };
    const content = contents.toString();
    const object = tryParseJSON(content);
    const type = object ? 'json' : 'text';
    return { content, type };
};
