# symbolic-json

[![npm version](https://badge.fury.io/js/symbolic-json.svg)](https://badge.fury.io/js/symbolic-json)
[![Dependency Status](https://david-dm.org/Celest/symbolic-json.svg)](https://david-dm.org/Celest/symbolic-json)
[![Build Status](https://travis-ci.org/Celest/symbolic-json.svg?branch=master)](https://travis-ci.org/Celest/symbolic-json)
[![Coverage Status](https://coveralls.io/repos/github/Celest/symbolic-json/badge.svg?branch=master)](https://coveralls.io/github/Celest/symbolic-json?branch=master)

# Credits

This library is inspired by [yenv][0] composition, the yaml environment manage stuff library.

# Installation

```bash
npm install --save symbolic-json
```

*Requires node v4.x or above.*

# Usage

Declaring a 'symbolic link' in a file (eg. `pages.json`):

```json
{
  "header": __header.html,
  "body": __content/body.html
}
```

Reading the file:

```js
const symbolicJSON = require('symbolic-json');

// Reference the json file
const jsonContent = symbolicJSON('pages.json');

// File will now have hydrated content from the symbolic links
console.log(jsonContent);
```

# Symbolic Links

You can link to text, json, or html files recursively with the `__` operator.

```json
{
  "body": __content/body.html,
  "tags": __content/tags.json,
  "description": __content/description.txt
}
```

Links are relative to the file being parsed.

```
+---content.json
+---content
|   +---body.html
|   +---tags.json
|   +---tags.description.txt
```

# Changelog

Please see [CHANGELOG.md][1]

# Author

Jon West - [@ddproxy][2]

[0]: https://github.com/jeffijoe/yenv
[1]: CHANGELOG.md
[2]: https://github.com/ddproxy