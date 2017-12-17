const path = require('path');

const loadAndIdentify = require('./loadAndIdentify');

// Link symbol key.
const LINK_SYMBOL = '__';

/**
 * Constructs a circular links error.
 *
 * Shamelessly stolen from yenv (see README.md)
 *
 * @param fileBeingLinked
 * @param linkTrail
 * @returns {Error}
 */
function circularLinksError (fileBeingLinked, linkTrail) {
    const message = `Circular link of "${fileBeingLinked}".\r\n`
                    + 'Link trace:\r\n'
                    + linkTrail.map(f => ` -> ${f}`).join('\r\n');
    return new Error(message);
}

/**
 * Processes link statements
 *
 * Shamelessly stolen from yenv (see README.md)
 *
 * @param parent
 * @param opts
 * @returns {*}
 */
module.exports = function processLinks (parent, opts) {
    // Since this function is recursive, we pass state along in the opts.
    opts.__loadedFiles = opts.__loadedFiles || [];
    opts.__linkTrail = opts.__linkTrail || [];

    opts.__loadedFiles.push(opts.importingFile);
    opts.__linkTrail.unshift(opts.importingFile);

    // Helper to check if we have already loaded the given file.
    const hasLoadedFile = f => opts.__loadedFiles.indexOf(f) > -1;

    const regexp = /__[\w\/\\_\-.]+/gi;
    const links = parent.content.match(regexp);

    if (!links) return parent.type === 'json' ? JSON.parse(parent.content) : parent.content;

    const filesToLink = [].concat(links).reverse().map(f => f.replace(LINK_SYMBOL, '')).map(
        f => {
            return { path: path.resolve(path.dirname(opts.importingFile), f), link: f };
        }
    );

    let processed = parent;
    parent.links = [];
    filesToLink.forEach(p => {

        // Check for circular links.
        if (hasLoadedFile(p.path)) throw circularLinksError(p.path, opts.__linkTrail);

        const loaded = loadAndIdentify(p.path);
        let loadedAndProcessed = processLinks(
            loaded,
            Object.assign(
                {},
                opts,
                {
                    // The linking file is now the one being processed.
                    linkingFile: p,
                    // We have to create a new link trail
                    // based on the current one.
                    __linkTrail: opts.__linkTrail.concat([])
                }
            )
        );
        processed.links.push({ identifier: LINK_SYMBOL + p.link, loadedAndProcessed });
    });

    processed.links.forEach(link => {
        processed.content = processed.content.replace(link.identifier, JSON.stringify(link.loadedAndProcessed));
    });

    return JSON.parse(processed.content);
};
