# Database layer (Neon + Drizzle) — ready to enable

Portal auth currently uses the in-code demo store in `src/lib/users.ts`. To move
to a real database without changing any route or UI code:

## 1. Install deps
```bash
npm i drizzle-orm @neondatabase/serverless
npm i -D drizzle-kit
```

## 2. Activate the schema/adapter
Rename the scaffolds (drop the `.example`):
```bash
mv src/lib/db/schema.ts.example   src/lib/db/schema.ts
mv src/lib/db/index.ts.example    src/lib/db/index.ts
```

## 3. Configure env
Set `DATABASE_URL` (Neon connection string) and a strong `SESSION_SECRET` in
`.env.local` / Vercel project settings.

## 4. Migrate & seed
Add a `drizzle.config.ts`, then:
```bash
npx drizzle-kit push        # create tables
```
Seed your first users (hash passwords with the same PBKDF2 helper used in
`lib/users.ts`).

## 5. Flip the lookup
In `src/lib/users.ts`, replace the `demoUsers.find(...)` line in
`findUserByEmail` with:
```ts
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
// ...
const rows = await getDb().select().from(users).where(eq(users.email, e)).limit(1);
return rows[0] ?? null;
```
`verifyPassword`, the session cookie, middleware protection, and the dashboards
all stay exactly as-is.

## Upgrade option: Clerk (managed MFA/SSO)
If you'd rather not run auth yourself, swap the login route + middleware for
`@clerk/nextjs` (passkeys, MFA, SSO, bot protection out of the box). The portal
UI components don't change — only the session source does.
