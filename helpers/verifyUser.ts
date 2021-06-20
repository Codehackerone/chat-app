import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verify = async (token: any) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const user: object = {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  };
  return user;
};
