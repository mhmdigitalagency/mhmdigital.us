# MHM Digital Platform

Seattle-based digital growth agency platform — marketing website, e-commerce, customer dashboards, admin CMS, and print order management.

## Tech Stack

- **Next.js 16** (App Router) + React 19
- **Prisma 7** + PostgreSQL
- **Better Auth** (email, OAuth, magic link)
- **Stripe** (checkout + webhooks)
- **Tailwind CSS 4** + shadcn/ui
- **Nodemailer** (transactional email)

## Database Setup

### 1. Create `.env.local`

```bash
cp .env.example .env.local
```

Edit `.env.local` and set a real **`POSTGRES_URL`** (not placeholders):

```bash
# Local PostgreSQL example
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/mhm_digital

# Neon example
POSTGRES_URL=postgresql://user:pass@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Supabase example
POSTGRES_URL=postgresql://postgres:pass@db.xxxx.supabase.co:5432/postgres
```

> **Vercel:** Copy `POSTGRES_URL` from your Vercel project → Settings → Environment Variables.

### 2. Run migrations and seed

```bash
npm run db:migrate   # Apply all migrations
npm run db:seed      # Seed services, packages, CMS defaults
# Or both at once:
npm run db:setup
```

### Troubleshooting

| Error | Fix |
|-------|-----|
| `datasource.url property is required` | Create `.env.local` with `POSTGRES_URL` |
| `getaddrinfo EAI_AGAIN base` | Your URL contains a placeholder hostname — set a real database host |
| `Can't reach database server` | Check DB is running and URL/credentials are correct |

## Local Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in all required values (see Environment Variables below)

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Seed database (services, packages, CMS defaults)
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [`.env.example`](./.env.example) for the full list. Required variables:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Auth session secret (32+ chars) |
| `BETTER_AUTH_URL` | App URL for auth callbacks |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `SMTP_*` / `NODEMAILER_*` | Email delivery |
| `ADMIN_EMAILS` | Semicolon-separated admin bootstrap emails |

## Authentication & Roles

### Customer Roles
- `USER` — Individual customer → `/dashboard`
- `COMPANY_ADMIN` — Company administrator → `/dashboard/company`
- `COMPANY_MEMBER` — Company team member → `/dashboard/company`

### Staff Roles (Admin Dashboard)
- `SUPER_ADMIN`, `ADMIN`, `MANAGER`, `SALES`, `CUSTOMER_SERVICE`, `PROJECT_MANAGER`, `DESIGNER`, `DEVELOPER`, `MARKETING`, `PRINT_PRODUCTION`, `ACCOUNTING`

Staff users redirect to `/admin` after login. Emails in `ADMIN_EMAILS` receive `SUPER_ADMIN` on registration.

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/print-services` | Print catalog |
| `/quote` | Quote request form |
| `/dashboard` | Customer dashboard |
| `/admin` | Admin dashboard (staff only) |
| `/connexion` | Login |
| `/inscription` | Individual registration |
| `/inscription/company` | Company registration |

## Admin Dashboard

Manage leads, customers, projects, print orders, quotes, invoices, CMS content (stats, testimonials, portfolio, FAQ, blog), and promotional popup settings.

## Customer Dashboard

Track projects, quotes, invoices, print orders, files, messages, and appointments.

## Print Order Workflow

1. Customer creates order → `DRAFT` or `QUOTE_REQUESTED` (bulk)
2. Upload artwork → `AWAITING_FILES` / `ARTWORK_REVIEW`
3. Proof generated → `PROOF_READY` → customer approves → `APPROVED`
4. Production → `IN_PRODUCTION` → `QUALITY_CHECK`
5. Fulfillment → `SHIPPED` / `READY_FOR_PICKUP` → `DELIVERED` → `COMPLETED`

## Testing

```bash
npm run test        # Unit tests (Vitest)
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm run build       # Production build
```

## Deployment (Vercel)

1. Connect repository to Vercel
2. Set all environment variables from `.env.example`
3. Configure Stripe webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
4. Run `npx prisma migrate deploy` against production database
5. Deploy

## Security Notes

- Test/debug endpoints removed from production
- Admin and dashboard routes protected by middleware + server-side RBAC
- Stripe webhook signature verification enabled
- Server-side price validation on checkout
- Rate limiting on login/signup
- File upload type and size validation

## Troubleshooting

- **Prisma client errors**: Run `npx prisma generate`
- **Auth redirect loops**: Verify `BETTER_AUTH_URL` matches your domain
- **Stripe webhook failures**: Check `STRIPE_WEBHOOK_SECRET` and endpoint URL
- **Email not sending**: Verify SMTP credentials and `SMTP_FROM`
