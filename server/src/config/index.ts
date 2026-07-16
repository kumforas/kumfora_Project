import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    anonKey: process.env.SUPABASE_ANON_KEY,
  },
  auth: {
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
  },
  notion: {
    apiKey: process.env.NOTION_API_KEY,
    feedbackDbId: process.env.NOTION_FEEDBACK_DB_ID!,
    contactDbId: process.env.NOTION_CONTACT_DB_ID!,
    newsletterDbId: process.env.NOTION_NEWSLETTER_DB_ID!,
    ordersDbId: process.env.NOTION_ORDERS_DB_ID!,
    profilesDbId: process.env.NOTION_PROFILES_DB_ID!,
  },
} as const;

export type Config = typeof config;
