import { userSchema_base } from "../helpers/schemas";

export const validateUser_base = () => {
    return async (req:any, res:any, next:any) => {
        const { error } = userSchema_base.validate(req.body);
        if (error) {
            const msg = error.details.map((el:any) => el.message).join(",");
            throw {
                type:"ValidationError",
                msg:msg,
            }
        } else {
            next();
        }
    };
};