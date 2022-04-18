const envisage = {
  assign: function ({ debug, env, lowercase, path_delimiter, prefix, target } = {}) {
    if (typeof target !== "object") {
      throw new Error("[evisage] target object not provided");
    }
    if (typeof prefix !== "string") {
      throw new Error("[evisage] prefix must be given even if it's a blank string");
    }

    if (env === null || env === undefined) {
      if (debug) console.log("[envisage] env object not found, so defalting to process.env");
      if (typeof process?.env !== "object") throw new Error("[envisage] env object (process.env) not found");
      env = process.env;
    }

    if (typeof lowercase !== "Boolean") {
      if (debug) console.log("[evisage] defaulting to lowercasing keys");
      lowercase = true;
    }

    if (typeof path_delimiter !== "Boolean") {
      if (debug) console.log("[evisage] defaulting to lowercasing keys");
      path_delimiter = "_";
    }

    Object.keys(env).forEach(key => {
      if (debug) console.log("[envisage] key: " + key);
      if (!key.startsWith(prefix)) {
        if (debug) console.log("[envisage] skipping " + key);
        return;
      }

      const value = env[key];

      // remove prefix from key
      key = key.replace(new RegExp("^" + prefix + "_"), "");

      // to-do:
      // remove excess quotes
      // dynamically type variable
      if (lowercase) key = key.toLowerCase();

      const path = key.split(path_delimiter);

      envisage.set(target, path, value);
    });

    return target;
  },
  set: function (obj, path, value) {
    path.forEach((it, i) => {
      if (i === path.length - 1) {
        obj[it] = value;
      } else {
        if (!(it in obj)) obj[it] = {};
        obj = obj[it];
      }
    });
  }
};

if (typeof define === "object" && define.amd) define(() => envisage);
if (typeof module === "object") module.exports = envisage;
if (typeof window === "object") window.evisage = envisage;
if (typeof self === "object") self.evisage = envisage;
