"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
exports.userSchema = void 0;
var joi_1 = __importDefault(require("joi"));
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var extension = function (joi) {
  return {
    type: "string",
    base: joi.string(),
    messages: {
      "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
      escapeHTML: {
        validate: function (value, helpers) {
          var clean = sanitize_html_1["default"](value, {
            allowedTags: [],
            allowedAttributes: {},
          });
          if (clean !== value)
            return helpers.error("string.escapeHTML", { value: value });
          return clean;
        },
      },
    },
  };
};
var Joi = joi_1["default"].extend(extension);
exports.userSchema = Joi.object({
  user: Joi.object(),
  phone: Joi.string().required().escapeHTML(),
  address: Joi.string().required().escapeHTML(),
  username: Joi.string().required().escapeHTML(),
  dob: Joi.date().required(),
});
//# sourceMappingURL=schemas.js.map
