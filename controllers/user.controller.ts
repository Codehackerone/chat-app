const redirectURI = "/users/googleauth";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const renderSignin = (req: any, res: any) => {
  res.render("signin");
};

const verify=async(token:any)=>{
  const ticket=await client.verifyIdToken({
    idToken:token,
    audience:process.env.GOOGLE_CLIENT_ID,
  })
  const payload=ticket.getPayload();
  const userid=payload['sub'];
}

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
