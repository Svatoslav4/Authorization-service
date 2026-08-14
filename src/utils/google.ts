import { OAuth2Client } from "google-auth-library";

export const GoogleTokenVerify = async (token: string) => {
  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID
    );

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return ticket.getPayload();
  } catch (error) {
    console.error(
      "Google Token Verification Failed:",
      error
    );

    return null;
  }
};