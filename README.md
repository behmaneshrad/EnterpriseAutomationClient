# EnterpriseAutomation Client

Next.js front end for the [EnterpriseAutomation API](https://github.com/behmaneshrad/EnterpriseAutomationApi): sign in with Keycloak, submit requests (leave, equipment), follow them step by step, and — for admins — define approval workflows.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · NextAuth v4 (Keycloak OIDC) · React Hook Form + Zod · Axios · react-hot-toast

> **Status: working prototype.** The UI is in Persian (right-to-left, Yekan font). Some screens still use sample data and one module is missing from the repository — see [Known issues](#known-issues).

The application lives in [`enterprise-automation-ui/`](enterprise-automation-ui).

## Features
- **Keycloak sign-in** through NextAuth. The access, refresh and ID tokens are copied from the Keycloak account into the NextAuth JWT/session; roles come from `realm_access.roles`.
- **Role-based routing** — `src/lib/roleAccess.ts` maps roles (`admin`, `approver`, `hr`, `finance`, `employer`) to route prefixes; `middleware.ts` redirects unauthenticated users to `/login` and users without access to `/unauthorized`. The first role in the token is the one used.
- **Requests** — a creation page with per-type forms (leave, equipment) validated by Zod schemas, a details page for one request, and a success page.
- **Approvals timeline** — `ActionTimeLine` and `ActionButton` components render the actions on a request.
- **Admin workflow designer** — `/admin/workflow` with a form for workflow definitions and their steps, plus a timeline view.
- **Typed forms** — schemas in `src/schemas`, shared UI kit in `src/components/ui` (toast provider, status card).

## Project structure
```
enterprise-automation-ui/
  middleware.ts          route protection (next-auth/middleware + roleAccess)
  src/app/               login, dashboard, request (list/new/[id]/success), admin/workflow, profile, unauthorized, api/auth
  src/components/        layout (Header, Sidebar, RoleRedirector), request forms/table, workflow form/timeline, ui kit
  src/lib/               api.ts (Axios instance), auth.ts (NextAuth options), roleAccess.ts
  src/schemas/           Zod schemas for request and workflow forms
  src/services/          workflow API calls
  src/context/           AuthContext (session + user in localStorage)
```

## Getting started
Prerequisites: Node.js 20+, Yarn 1.x, a running instance of the API and a Keycloak realm with a confidential client (see the API repository).

1. Create `enterprise-automation-ui/.env.local` (git-ignored — never commit it):
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<random string, e.g. output of: openssl rand -base64 32>
   KEYCLOAK_WELLKNOWN_URL=http://localhost:8085/realms/<your-realm>/.well-known/openid-configuration
   KEYCLOAK_CLIENT_ID=<your Keycloak client id>
   KEYCLOAK_CLIENT_SECRET=<your Keycloak client secret>
   NEXT_PUBLIC_API_URL=<API base URL, used by src/lib/api.ts>
   NEXT_PUBLIC_API_BASE_URL=<API base URL, used by src/services/workflows.ts>
   ```
2. Install and run:
   ```bash
   cd enterprise-automation-ui
   yarn install        # yarn.lock is committed
   yarn dev            # http://localhost:3000
   ```
   Scripts: `dev`, `build`, `start`, `lint`.

## Known issues
- **Missing module:** `src/app/request/[id]/page.tsx`, `RequestFormEquipment.tsx` and `RequestFormLeave.tsx` import `@/lib/axiosApi`, which is not in the repository (only `src/lib/api.ts` is). Until it is added, `next build` fails on those files.
- **Sample data:** the request list page (`src/app/request/page.tsx`) shows hard-coded rows and has no status filter yet.
- **Two API base-URL variables** (`NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_BASE_URL`) should be unified.
- **Token storage:** the Axios interceptor reads tokens from `localStorage`; moving to the server-side session (or an httpOnly cookie) would be safer.
- No automated tests yet.

## Roadmap
- [ ] Add/unify the Axios client and make `yarn build` green; add a CI workflow (`yarn lint`, `yarn build`)
- [ ] Replace the sample request list with the API, add status filters and pagination
- [ ] Playwright test for the approval flow
- [ ] i18n (Persian/English) and a typed API client generated from the OpenAPI spec

## License
No license file yet — all rights reserved by default. Open an issue if you want to reuse the code.
