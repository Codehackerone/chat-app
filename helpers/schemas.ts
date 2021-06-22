import BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

export const userSchema = Joi.object({
  user: Joi.object(),
  phone: Joi.string().required().escapeHTML(),
  address: Joi.string().required().escapeHTML(),
  username: Joi.string().required().escapeHTML(),
  dob: Joi.date().required(),
});
