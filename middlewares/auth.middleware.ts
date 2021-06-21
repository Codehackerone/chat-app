import { verify } from "../helpers/verifyUser";
import { checkGoogleUser } from "../services/user.service";

export const authorize = () => {
  return async (req:any, res:any, next:any) => {
    try {
      let token = req.cookies["x-session-token"];
      if(!token){
        res.send('Token Expired');
        return;
      }
      const user:any = await verify(token);
      if(!user){
        res.send('Cant Find User');
        return;
      }
      let gUser:any=await checkGoogleUser(user._id);
      if(!gUser){
        res.send('User not registered');
        return;
      }
      else if(gUser.status==='reg_incomplete'){
        res.send('Registration Incomplete');
        return;
      }
      else if(gUser.status==='unverified'){
        res.send('This application is in beta. Contact the developer to give you special access');
        return;
      }
      else if(gUser.status==='banned'){
        res.send('You are banned!');
        return;
      }
      req.body.user = gUser;
      next();
    } catch (err) {
      res.redirect('/users/signin');
    }
  };
};
