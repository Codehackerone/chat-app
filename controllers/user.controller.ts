const redirectURI = "/users/googleauth";
import { verify } from "../utils/verifyUser";

export const renderSignin = (req: any, res: any) => {
  res.render("signin");
};


export const signin = async(req: any, res: any) => {
  let token=req.body.token;
  try{
    var user:any=await verify(token);
    res.cookie('session-token',token);
    res.send('success');
  }
  catch(err)
  {
    console.log(err);
  }
};

export const googleauth = (req: any, res: any) => {
  res.send("Google Login Success");
};
