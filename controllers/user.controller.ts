const redirectURI = "/users/googleauth";
import { OAuth2Client } from "google-auth-library";

export const renderSignin = (req: any, res: any) => {
  res.render("signin");
};

export const signin = (req: any, res: any) => {
  res.send("Google Login");
};

export const googleauth = (req: any, res: any) => {
  res.send("Google Login Success");
};
