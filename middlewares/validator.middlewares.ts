import { userSchema } from "../helpers/schemas";

export const validateUser = () => {
  return async (req: any, res: any, next: any) => {
    console.log(req.body);
    const { error } = userSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el: any) => el.message).join(",");
      req.flash("err", msg);
      res.redirect(req.originalUrl);
    } else {
      next();
    }
  };
};
