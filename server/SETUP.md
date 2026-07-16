# Kumfora — Supabase & Notion Setup Guide (Step by Step)

## PART 1: Supabase Setup (Database)

### Step 1 — Create a Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** (top right)
3. Sign up with **GitHub** (recommended) or email
4. Verify your email if asked

### Step 2 — Create a New Project

1. Once logged in, you'll see your **Dashboard**
2. Click **"New project"** button
3. Fill in:
   - **Organization**: Select your org (or create one)
   - **Project name**: `kumfora`
   - **Database password**: Choose a strong password (save it somewhere safe — you may need it later)
   - **Region**: Select **Mumbai (ap-south-1)** — closest to India
4. Click **"Create new project"**
5. Wait 1-2 minutes for the project to initialize

### Step 3 — Get Your API Keys

1. Once project is ready, go to **Settings** (gear icon, bottom left) → **API**
2. You'll see two sections:

**Project URL:**
```
https://xxxxx.supabase.co
```
Copy this — this is your `NEXT_PUBLIC_SUPABASE_URL`

**Project API keys** — you'll see two keys:
- **anon public** key (safe for browser) → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** key (secret, server only) → this is your `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ The `service_role` key bypasses all security rules. NEVER put it in frontend code or share it publicly.

### Step 4 — Create the Database Tables

1. In the left sidebar, click **SQL Editor**
2. Click **"New query"** (top right)
3. Open the file `server/schema.sql` in your project
4. **Copy the ENTIRE contents** of that file
5. **Paste** it into the SQL Editor in Supabase
6. Click **"Run"** button (bottom right, or Ctrl+Enter)

You should see `Success. No rows returned` — this means all 4 tables were created.

**Verify the tables exist:**
1. Click **Table Editor** in the left sidebar
2. You should see 4 tables:
   - `feedback`
   - `contact_submissions`
   - `newsletter_subscribers`
   - `orders`

### Step 5 — Update `server/.env`

Open `server/.env` and replace the placeholder values:

```env
# Supabase
SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...YOUR-SERVICE-ROLE-KEY...
```

> Replace `YOUR-PROJECT-ID` with the ID from your project URL (the part between `https://` and `.supabase.co`).

### Step 6 — Test Supabase

1. Run `npm run dev` in the `server/` folder
2. Go to `http://localhost:5000/api/health` — you should see a JSON response
3. Submit a feedback form from the frontend (running on `http://localhost:3000`)
4. Go back to Supabase Dashboard → **Table Editor** → click `feedback`
5. You should see your submission in the table!

---

## PART 2: Notion Setup (Workspace Dashboard)

> **Note:** Supabase alone is enough for your forms to work. Notion is a secondary mirror — it gives you a nice dashboard view of all submissions inside Notion.

### Step 1 — Create a Notion Account (if you don't have one)

1. Go to **https://notion.so**
2. Sign up for free

### Step 2 — Create a Notion Integration (API Connection)

1. Go to **https://www.notion.so/my-integrations**
2. Click **"New integration"**
3. Fill in:
   - **Name**: `Kumfora`
   - **Associated workspace**: Select your Notion workspace
   - **Capabilities**: Make sure **Read content** and **Insert content** are checked
4. Click **"Submit"**
5. You'll see an **Internal Integration Secret** starting with `ntn_`
6. **Copy and save this** — this is your `NOTION_API_KEY`

> ⚠️ This key is like a password. Don't share it or commit it to git.

### Step 3 — Create 4 Databases in Notion

You need to create **4 separate databases** inside Notion. Each one stores a different type of data.

**How to create a database:**
1. Open any page in your Notion workspace (or create a new page called "Kumfora Dashboard")
2. Type `/database` and select **"Table - Full page"** or **"Table view"**
3. This creates an inline database

Create all 4 databases with these exact column names:

---

#### Database 1: Feedback

| Column Name | Column Type | Notes |
|-------------|-------------|-------|
| Name | **Title** | (This is the default first column, rename it to "Name") |
| Email | **Text** | |
| Rating | **Number** | |
| Message | **Text** | |
| Date | **Date** | |

---

#### Database 2: Contact

| Column Name | Column Type | Notes |
|-------------|-------------|-------|
| Name | **Title** | (Rename default column) |
| Email | **Text** | |
| Phone | **Text** | |
| Order Number | **Text** | |
| Topic | **Text** | |
| Message | **Text** | |
| Date | **Date** | |

---

#### Database 3: Newsletter

| Column Name | Column Type | Notes |
|-------------|-------------|-------|
| Email | **Title** | (Rename default column) |
| Date | **Date** | |

---

#### Database 4: Orders

| Column Name | Column Type | Notes |
|-------------|-------------|-------|
| Order ID | **Title** | (Rename default column) |
| Customer | **Text** | |
| Email | **Text** | |
| Phone | **Text** | |
| Address | **Text** | |
| Payment Method | **Text** | |
| Total | **Number** | |
| Status | **Text** | |
| Date | **Date** | |

---

### Step 4 — Connect Your Integration to Each Database

This is the most important step. The integration can't see your databases unless you **share** them with it.

**For EACH of the 4 databases:**

1. Open the database as a **full page** (click "Open as page" or the `<>` button)
2. Click the **"..."** menu (top right of the page)
3. Click **"Connections"** (or **"Add connections"**)
4. Search for **"Kumfora"** (the integration you created)
5. Click **"Confirm"** to give it access

> You need to do this for **all 4 databases** — otherwise Notion sync will fail for that specific database.

### Step 5 — Get the Database ID for Each Database

Each database has a unique 32-character ID in its URL.

**How to find it:**

1. Open a database as a full page
2. Look at the URL in your browser address bar:

```
https://www.notion.so/your-workspace/abc123def456789012345678abcdef01?v=...
                                ↑                              ↑
                            starts here                    ends here
```

3. The **32-character string** between your workspace name and `?v=` is the database ID
4. It's a mix of letters and numbers, like: `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6`

**Copy each one:**

| Database | Variable Name | Your ID |
|----------|--------------|---------|
| Feedback | `NOTION_FEEDBACK_DB_ID` | (paste here) |
| Contact | `NOTION_CONTACT_DB_ID` | (paste here) |
| Newsletter | `NOTION_NEWSLETTER_DB_ID` | (paste here) |
| Orders | `NOTION_ORDERS_DB_ID` | (paste here) |

### Step 6 — Update `server/.env` with Notion Values

```env
# Notion
NOTION_API_KEY=ntn_YOUR-INTEGRATION-SECRET-HERE
NOTION_FEEDBACK_DB_ID=abc123def456789012345678abcdef01
NOTION_CONTACT_DB_ID=abc123def456789012345678abcdef02
NOTION_NEWSLETTER_DB_ID=abc123def456789012345678abcdef03
NOTION_ORDERS_DB_ID=abc123def456789012345678abcdef04
```

---

## PART 3: Final Verification

### Test Everything

1. Run `npm run dev` in the `server/` folder (starts on port 5000)
2. Run `npm run dev` in the `client/` folder (starts on port 3000)
3. Open `http://localhost:3000`

**Test 1 — Feedback:**
- Go to `/feedback`
- Fill and submit the form
- Check: Supabase `feedback` table has the row ✓
- Check: Notion "Feedback" database has a new page ✓

**Test 2 — Contact:**
- Go to `/contact`
- Fill and submit the form
- Check: Supabase `contact_submissions` table ✓
- Check: Notion "Contact" database ✓

**Test 3 — Newsletter:**
- On homepage, scroll to newsletter section
- Enter email and subscribe
- Check: Supabase `newsletter_subscribers` table ✓
- Check: Notion "Newsletter" database ✓

**Test 4 — Checkout + Track:**
- Add items to cart
- Go to `/checkout`
- Complete checkout
- Check: Supabase `orders` table ✓
- Check: Notion "Orders" database ✓
- Copy the order ID shown
- Go to `/track`, enter the order ID
- You should see order status

### Check for Errors

If something doesn't work:

1. Open browser console (F12 → Console tab) for frontend errors
2. Check the terminal where `npm run dev` is running for server errors
3. Common issues:
   - `Invalid supabaseUrl` → Your Supabase env vars are still placeholder values
   - `Notion sync failed` → Check Notion API key and database IDs
   - `401 Unauthorized` → Notion integration not connected to that database (Step 4)
   - `Not found` → Wrong database ID

---

## Complete `.env` (Final Version)

```env
# Supabase
SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...YOUR-SERVICE-ROLE-KEY...

# Notion
NOTION_API_KEY=ntn_YOUR-INTEGRATION-SECRET
NOTION_FEEDBACK_DB_ID=YOUR-32-CHAR-FEEDBACK-DB-ID
NOTION_CONTACT_DB_ID=YOUR-32-CHAR-CONTACT-DB-ID
NOTION_NEWSLETTER_DB_ID=YOUR-32-CHAR-NEWSLETTER-DB-ID
NOTION_ORDERS_DB_ID=YOUR-32-CHAR-ORDERS-DB-ID
```

---

## Architecture Summary

```
User fills form on Kumfora website (client/ - Next.js)
        │
        ▼
Express.js API Routes (server/ - port 5000)
        │
        ├──→ Supabase PostgreSQL (primary storage)
        │
        └──→ Notion Database (secondary mirror / dashboard view)
        
Both save independently:
- If Supabase fails → Notion still saves
- If Notion fails → Supabase still saves
- User sees success as long as at least one works
```
