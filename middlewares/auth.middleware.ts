import { verify } from "../utils/verifyUser";

export const authorize=()=>{
    return async (req, res, next) => {
        try{
            let token=req.cookies['session-token'];
            const user=await verify(token);
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