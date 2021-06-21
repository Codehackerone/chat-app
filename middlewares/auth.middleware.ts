import { verify } from "../helpers/verifyUser";

export const authorize = () => {
  return async (req:any, res:any, next:any) => {
    try {
      let token = req.cookies["x-session-token"];
      const user = await verify(token);
      req.user = user;
      next();
    } catch (err) {
      res.redirect('/users/signin');
    }
  };
};
