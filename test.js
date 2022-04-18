const test = require("flug");
const envisage = require("./envisage.js");

test("basic", ({ eq }) => {
  const target = {};
  const env = {
    PREFIX_TEST: "test value"
  };
  const result = envisage.assign({ target, prefix: "PREFIX", env });
  eq(result, { test: "test value" });
});

test("webpack override", ({ eq }) => {
  const config = {
    output: {
      filename: "geocanvas.min.js"
    },
    target: "web"
  };
  const result = envisage.assign({
    debug: false,
    target: config,
    prefix: "WEBPACK",
    env: { WEBPACK_OUTPUT_FILENAME: "bundle.min.js" }
  });
  eq(result, {
    output: {
      filename: "bundle.min.js"
    },
    target: "web"
  });
});

test("webpack new path", ({ eq }) => {
  const config = {
    target: "web"
  };
  const result = envisage.assign({
    target: config,
    prefix: "WEBPACK",
    env: { WEBPACK_OUTPUT_FILENAME: "bundle.min.js" }
  });
  eq(result, {
    output: {
      filename: "bundle.min.js"
    },
    target: "web"
  });
});

test("webpack from env", ({ eq }) => {
  process.env["WEBPACK_OUTPUT_FILENAME"] = "main.js";

  const config = {
    target: "web"
  };
  const result = envisage.assign({
    target: config,
    prefix: "WEBPACK"
  });
  eq(result, {
    output: {
      filename: "main.js"
    },
    target: "web"
  });
});
