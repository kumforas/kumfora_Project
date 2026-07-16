import { Client } from "@notionhq/client";
import { NOTION_DB_IDS } from "./client";

let client: Client | null = null;

export function getNotion(): Client {
  if (client) return client;

  const key = process.env.NOTION_API_KEY;
  if (!key || key.startsWith("your-")) {
    throw new Error(
      "Notion env var not configured. Set NOTION_API_KEY in .env"
    );
  }

  client = new Client({ auth: key });
  return client;
}

function title(text: string) {
  return { title: [{ text: { content: text } }] };
}

function richText(text: string) {
  return { rich_text: [{ text: { content: text } }] };
}

function number(val: number) {
  return { number: val };
}

function date(val: string) {
  return { date: { start: val } };
}

function phone_number(val: string) {
  return { phone_number: val };
}

function isNotionConfigured(): boolean {
  const key = process.env.NOTION_API_KEY;
  const ids = Object.values(NOTION_DB_IDS);
  return (
    !!key &&
    !key.startsWith("your-") &&
    ids.every((id) => id && !id.startsWith("your-"))
  );
}

export async function syncFeedbackToNotion(data: {
  name: string;
  email: string;
  rating: number;
  message: string;
  created_at: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isNotionConfigured()) {
    return { success: false, error: "Notion not configured" };
  }

  try {
    const notion = getNotion();
    await notion.pages.create({
      parent: { database_id: NOTION_DB_IDS.feedback },
      properties: {
        Name: title(data.name),
        Email: richText(data.email),
        Rating: number(data.rating),
        Message: richText(data.message),
        Date: date(data.created_at),
      },
    });
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Notion sync failed (feedback):", msg);
    return { success: false, error: msg };
  }
}

export async function syncContactToNotion(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  order_number: string | null;
  topic: string;
  message: string;
  created_at: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isNotionConfigured()) {
    return { success: false, error: "Notion not configured" };
  }

  try {
    const notion = getNotion();
    await notion.pages.create({
      parent: { database_id: NOTION_DB_IDS.contact },
      properties: {
        Name: title(`${data.first_name} ${data.last_name}`),
        Email: richText(data.email),
        Phone: phone_number(data.phone),
        "Order Number": richText(data.order_number ?? ""),
        Topic: richText(data.topic),
        Message: richText(data.message),
        Date: date(data.created_at),
      },
    });
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Notion sync failed (contact):", msg);
    return { success: false, error: msg };
  }
}

export async function syncNewsletterToNotion(data: {
  email: string;
  created_at: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isNotionConfigured()) {
    return { success: false, error: "Notion not configured" };
  }

  try {
    const notion = getNotion();
    await notion.pages.create({
      parent: { database_id: NOTION_DB_IDS.newsletter },
      properties: {
        Email: title(data.email),
        Date: date(data.created_at),
      },
    });
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Notion sync failed (newsletter):", msg);
    return { success: false, error: msg };
  }
}

export async function syncOrderToNotion(data: {
  order_id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: string;
  total: number;
  status: string;
  created_at: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isNotionConfigured()) {
    return { success: false, error: "Notion not configured" };
  }

  try {
    const notion = getNotion();
    await notion.pages.create({
      parent: { database_id: NOTION_DB_IDS.orders },
      properties: {
        "Order ID": title(data.order_id),
        Customer: richText(`${data.first_name} ${data.last_name}`),
        Email: richText(data.email),
        Phone: phone_number(data.phone),
        Address: richText(
          `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`
        ),
        "Payment Method": richText(data.payment_method),
        Total: number(data.total),
        Status: richText(data.status),
        Date: date(data.created_at),
      },
    });
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Notion sync failed (order):", msg);
    return { success: false, error: msg };
  }
}

export async function syncProfileToNotion(data: {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isNotionConfigured()) {
    return { success: false, error: "Notion not configured" };
  }

  try {
    const notion = getNotion();
    await notion.pages.create({
      parent: { database_id: NOTION_DB_IDS.profiles },
      properties: {
        Name: title(`${data.first_name} ${data.last_name}`.trim() || "Unnamed User"),
        "User ID": richText(data.user_id),
        Phone: phone_number(data.phone),
        Joined: date(data.created_at),
      },
    });
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Notion sync failed (profile):", msg);
    return { success: false, error: msg };
  }
}
