import { verify } from "../utils/verifyUser";

export const authorize=()=>{
    return async (req, res, next) => {
        let token=req.cookies['session-token'];
        try{
            const user=verify(token);
            req.user=user;
            next();
        }
        catch(err)
        {
            console.log(err);
            res.send("Error: "+err);
        }
    }
}