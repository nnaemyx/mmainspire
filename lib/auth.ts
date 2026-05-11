import { jwtVerify, SignJWT } from "jose";

export async function signToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_mmainspire_2026");
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_mmainspire_2026");
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
