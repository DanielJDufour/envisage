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
  process.env["WEBPACK_WATCH"] = "true";

  const config = {
    target: "web"
  };
  const result = envisage.assign({
    target: config,
    prefix: "WEBPACK"
  });
  eq(result, {
    watch: true,
    output: {
      filename: "main.js"
    },
    target: "web"
  });
});

test("config port", ({ eq }) => {
  process.env["CONFIG_SERVER_PORT"] = "5678";
  process.env["CONFIG_SERVER_DECIMAL"] = "0.1";
  const config = {
    server: {
      port: 1234,
      decimal: "0.456"
    }
  };
  const result = envisage.assign({
    target: config,
    prefix: "CONFIG"
  });
  eq(result, {
    server: {
      port: 5678,
      decimal: "0.1"
    }
  });
});
