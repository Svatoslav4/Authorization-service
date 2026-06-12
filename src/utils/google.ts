import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleTokenVerify = async (token: string) => {
    // 1. Додаємо перевірку для тестів через Postman
    if (token === "fake-google-token") {
        return {
            email: "svyat@example.com",
            name: "Svyatoslav",
            picture: "https://example.com/avatar.jpg",
            sub: "1234567890" // це ваш googleId
        };
    }

    // 2. Реальна перевірка для мобільного додатка
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        return ticket.getPayload();
    } catch (error) {
        console.error("Google Token Verification Failed:", error);
        return null;
    }
}