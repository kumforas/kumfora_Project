import { config } from "../../config";

export const NOTION_DB_IDS = {
  feedback: config.notion.feedbackDbId,
  contact: config.notion.contactDbId,
  newsletter: config.notion.newsletterDbId,
  orders: config.notion.ordersDbId,
  profiles: config.notion.profilesDbId,
};
