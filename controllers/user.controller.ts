const redirectURI = "/users/googleauth";
import { verify } from "../utils/verifyUser";

export const renderSignin = (req: any, res: any) => {
  res.render("signin");
};


export const signin = (req: any, res: any) => {
  let token=req.body.token;
  verify(token)
    .then(()=>{
      res.cookie('session-token',token);
      res.send('success');
    })
    .catch(console.error);
};

export const googleauth = (req: any, res: any) => {
  res.send("Google Login Success");
};
