# envisage
> Assign Environmental Variables to a JavaScript Object.

# basic usage

```js
// in webpack.config.js
const evisage = require("envisage");

const config = {
  mode: "production",
  // ...
};

envisage.assign({ target: config, prefix: "WEBPACK" });

module.exports = config;
```

```bash
WEBPACK_OUTPUT_FILENAME="library.min.js" WEBPACK_WATCH="true" webpack --config webpack.config.js
```

### advanced usage
```js
// modifies target config in place
envisage.assign({
  target: config,

  // only look for environmental variables
  // that start with "WEBPACK..."
  // like WEBPACK_OUTPUT_FILENAME  
  prefix: "WEBPACK",

  // default true
  // convert environmental variable name
  // to lowercase for target object key
  lowercase: true,

  // default true
  // convert boolean string values "true" and "false"
  // to Boolean types for target object value
  convert_boolean: true
});
```
