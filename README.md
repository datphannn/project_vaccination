# Vaccination Management System

A web application built with **Next.js** for managing vaccination information, chatbot, authentication, and database operations using **Supabase**.

---

# Tech Stack

* **Next.js**
* **Supabase**
* **PostgreSQL**
* **OpenRouter API**
* **Node.js**

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/your-username/vaccination-management.git
cd vaccination-management
```

---

## 2. Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 3. Environment Variables

Create a `.env.local` file in the root folder and add the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

DATABASE_URL=your_postgres_connection

SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

OPENROUTER_API_KEY=your_openrouter_api_key

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

JWT_SECRET=your_jwt_secret
```

⚠️ **Important:** Never commit `.env.local` to GitHub.

Add this to `.gitignore`:

```
.env.local
.env
```

---

## 4. Run development server

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

The page will auto reload when you edit files.

Main entry file:

```
app/page.tsx
```

---

# Project Structure

```
app/
 ├── api/
 ├── components/
 ├── lib/
 ├── page.tsx

public/

.env.local
package.json
```

---

# Deployment

The easiest way to deploy this Next.js app is using **Vercel**.

Steps:

1. Push project to GitHub
2. Import repository into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

---

# Learn More

* Next.js Documentation
  https://nextjs.org/docs

* Supabase Documentation
  https://supabase.com/docs

---

# License

MIT License
