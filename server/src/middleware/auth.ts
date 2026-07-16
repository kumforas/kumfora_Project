import { Request, Response, NextFunction } from "express";
import { jwtVerify, importJWK, JWTPayload, JWK } from "jose";
import { config } from "../config";

interface CachedJWKS {
  keys: ReturnType<typeof importJWK> extends Promise<infer T> ? T : never;
  fetchedAt: number;
}

let cachedJWKS: CachedJWKS | null = null;
const JWKS_CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function getSupabasePublicKey(kid: string): Promise<any> {
  if (cachedJWKS && Date.now() - cachedJWKS.fetchedAt < JWKS_CACHE_TTL) {
    return cachedJWKS.keys;
  }

  const supabaseUrl = config.supabase.url;
  if (!supabaseUrl) throw new Error("SUPABASE_URL not configured");

  const jwksUrl = `${supabaseUrl}/auth/v1/.well-known/jwks.json`;
  const res = await fetch(jwksUrl);
  if (!res.ok) throw new Error(`Failed to fetch JWKS: ${res.status}`);

  const data = await res.json() as { keys: JWK[] };
  if (!data.keys?.length) throw new Error("No keys in JWKS response");

  cachedJWKS = { keys: null as any, fetchedAt: Date.now() };

  const matchingKey = data.keys.find((k) => k.kid === kid) || data.keys[0];
  const cryptoKey = await importJWK(matchingKey, "ES256");
  cachedJWKS.keys = cryptoKey;
  return cryptoKey;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "Authentication required" });
    return;
  }

  const token = header.slice(7);
  if (!token) {
    res.status(401).json({ success: false, error: "Authentication required" });
    return;
  }

  try {
    const headerPart = token.split(".")[0];
    if (!headerPart) throw new Error("Invalid token format");
    const tokenHeader = JSON.parse(Buffer.from(headerPart, "base64url").toString());
    const kid = tokenHeader.kid || "0";
    const key = await getSupabasePublicKey(kid);
    const { payload } = await jwtVerify(token, key);
    req.user = {
      userId: payload.sub!,
      email: (payload.email as string) || "",
    };
    next();
  } catch {
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = header.slice(7);
  if (!token) {
    next();
    return;
  }

  try {
    const headerPart = token.split(".")[0];
    if (!headerPart) { next(); return; }
    const tokenHeader = JSON.parse(Buffer.from(headerPart, "base64url").toString());
    const kid = tokenHeader.kid || "0";
    const key = await getSupabasePublicKey(kid);
    const { payload } = await jwtVerify(token, key);
    req.user = {
      userId: payload.sub!,
      email: (payload.email as string) || "",
    };
  } catch {
    // Token invalid — proceed without user
  }

  next();
}
