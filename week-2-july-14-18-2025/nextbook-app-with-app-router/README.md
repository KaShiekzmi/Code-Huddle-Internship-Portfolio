# 📚 NextBook – A Simple Book Review App

A minimal book review platform built with **Next.js**, showcasing SSG, SSR, API routes, authentication, protected pages, and deployment.

---

## 🛠 Tech Used

- **Next.js** – Full-stack React framework
- **TypeScript** – Strongly typed JavaScript
- **Tailwind CSS** – Utility-first CSS framework
- **NextAuth.js** – Authentication with Google provider
- **Vercel** – Deployment platform
- **React Hooks** – State and data management (`useState`, `useEffect`)
- **Middleware** – Route protection via session-based auth
- **API Routes** – Serverless functions for dynamic data
- **getStaticProps / getServerSideProps / getStaticPaths** – Data fetching strategies

---

## 🧪 Steps to Run Locally

### 📦 Prerequisites

- Node.js v18+
- npm or yarn

### 🛠 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/KaShiekzmi/Code-Huddle-Internship-Portfolio/tree/main/week-2-july-14-18-2025/nextbook-a-simple-book-review-app.git

# 2. Install dependencies
npm install

# 3. Create environment variables file
cp .env.example .env.local
```

### ✏️ Example `.env.local` (with dummy values)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-for-dev-use-only

GOOGLE_CLIENT_ID=1234asdmnsod-ef456gh789ijk012lmn.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> 🛡️ **Note**: Never commit real secrets. Always use `.env.local` locally and ensure `.env*` is in `.gitignore`.

```bash
# 4. Start the development server
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## ⚠ Known Issues & Future Improvements

### Known Issues

- Book data and reviews are stored as hardcoded/mock JSON – not persisted in a real database.
- Not actually saving reviews of users.

### Future Improvements

- 🌐 Connect to a real database (e.g., MongoDB or PostgreSQL)
- 🔍 Add search and filtering for books
- ⭐ Enable book rating system
- 📝 Enable authenticated users to submit/edit/delete reviews
- 🔐 Implement role-based access for admin/moderators

---
