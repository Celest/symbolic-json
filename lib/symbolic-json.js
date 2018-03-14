const loadAndIdentify = require('./loadAndIdentify');
const processLinks = require('./processLinks');
const path = require('path');

/**
 *
 * @param filePath
 * @param opts
 * @returns {*}
 */
module.exports = function symbolicJSON (filePath, opts) {
    opts = Object.assign({
        envObject: process.env,
        cwd: process.cwd()
    }, opts || {});

    filePath = path.resolve(opts.cwd, filePath);
    const file = loadAndIdentify(filePath)

    return processLinks(
        file,
        Object.assign(
            {},
            opts,
            {
                importingFile: filePath
            }
        )
    );
};
