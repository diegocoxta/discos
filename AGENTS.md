<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Guidance for AI coding agents. Keep it short — this file is always in context.
`CLAUDE.md` imports this file. Setup, env vars and project overview are in
[README.md](README.md); don't duplicate them here.

## Setup & commands

- Package manager: **Yarn 1.x** (not npm). Node 24 (`.nvmrc`).
- `yarn install` — dependencies. Copy `.env.example` to `.env` and fill it in.
- `yarn dev` — dev server. Its `predev` hook uses `open -a` (macOS only).
- `yarn build` — production build. It calls the Discogs API, so it needs the env vars.
- `yarn lint` — ESLint.
- No test suite. Verify with `yarn lint` + `yarn build`, and for behavior run
  the dev server and exercise the route manually.

## Before you finish

Run `yarn lint` and `yarn build`. Both must pass.

## Dependabot

`.github/workflows/dependabot.yml` runs `yarn lint` and `tsc` on Dependabot PRs and squash-merges the minor and patch ones; majors stay manual. An indirect (lockfile-only) dependency has no `update-type:` in its commit, so its type comes from comparing `from X to Y` (same major, and same minor when the major is 0). The cron runs Fridays at 20:17 Bahia (Dependabot opens its weekly PRs on Monday, so their checks have the week to finish and a breaking merge lands on the weekend), off the top of the hour, because GitHub delays or drops scheduled runs at `:00`. Minor and patch updates arrive grouped in one PR (`.github/dependabot.yml`). It doesn't use branch protection or `gh pr merge --auto`: the merge happens inside the job, after the checks. Before merging, the job waits for every other check on the PR (other workflows and Vercel): only a failed one blocks, cancelled is fine. It lists them with `gh pr checks`, which is why the workflow declares `actions`, `checks` and `statuses` read permissions (without them the step fails with "Resource not accessible by integration" and nothing is merged). `typescript` major updates are ignored in `.github/dependabot.yml` until TypeScript 7.1 ships and typescript-eslint and Next support it.

## Architecture

A read-only site over one person's [Discogs](https://www.discogs.com) account. There is no database and no auth. UI text is hardcoded in Brazilian Portuguese (no i18n layer).

- **Data layer:** [`lib/discogs.ts`](lib/discogs.ts) is the only place that talks to the Discogs API. `getResource` fails soft (logs and returns `null`) and `getAllPages` walks pagination, so a Discogs outage or rate limit (429) renders empty pages instead of crashing. Responses are cached for 5 minutes under the `discogs` tag. The user comes from `DISCOGS_USERNAME`; the name, avatar and bio shown across the site come from the Discogs profile (`getProfile`), never hardcoded.
- **Routes** (all under [`app/`](app)):
  - [`page.tsx`](app/page.tsx) — whole collection. [`wishlist/`](app/wishlist/page.tsx) and [`sobre/`](app/sobre/page.tsx) (stats) are the other top-level pages.
  - [`[filter]/[value]/`](app/[filter]/[value]/page.tsx) — `folder`, `artist` and `style` listings, pre-rendered with `generateStaticParams`.
  - [`vinyl/[...slug]/`](app/vinyl/[...slug]/page.tsx) — record detail. The segment count tells the two cases apart: `id/instanceId/title` is a collection copy (shows your notes), `id/title` is a wishlist record (shows store links). [`@modal/(.)vinyl/`](<app/@modal/(.)vinyl/[...slug]/page.tsx>) intercepts it to open the same page in a modal on in-app navigation.
  - [`random/`](app/random/route.ts) and [`wishlist/random/`](app/wishlist/random/route.ts) — dynamic redirects to a random record (`/random?folder=ID` limits it to a folder). They are meant to be printed as QR codes, so they must stay uncached.
  - [`rebuild/`](app/rebuild/route.ts) — token-protected cache purge.
- **Components:** each page composes [`SiteHeader`](components/SiteHeader/index.tsx) (intro + menu) and, on list pages, [`VinylList`](components/VinylList/index.tsx). `VinylList` is a client component that owns search and keeps the query in `?s=`. Record visuals are [`Sleeve`](components/Sleeve/index.tsx) and [`Vinyl`](components/Vinyl/index.tsx).
- **Custom fields:** the collection reads Discogs custom fields by exact English name — `Acquisition Date` (sorting and the "acquired on" date), `Color` (record tint) and `Story` (quote on the detail page). Renaming one in Discogs silently disables the feature. Labels are translated in [`VinylDetails`](components/VinylDetails/index.tsx).
- **Shared helpers:** [`lib/utils.ts`](lib/utils.ts) has `createVinylLink` (the one place that builds `/vinyl/...` URLs), slug helpers and the stats calculation.

## Conventions

- TypeScript everywhere. `@/*` import alias = repo root (see `tsconfig.json`).
- CSS Modules, co-located per component folder (`components/X/index.tsx` +
  `styles.module.css`). No global CSS beyond `app/globals.css`.
- Match the style of surrounding code; keep diffs minimal.
- Don't add dependencies without a clear need.
- Only comment corner cases that would otherwise be hard to understand from
  reading the code alone.
- **Git commits:** [Conventional Commits](https://www.conventionalcommits.org/)
  (`type(scope): subject`).
  - Never add a `Co-Authored-By` trailer (or any other AI attribution) to
    commit messages.

## Gotchas

- Never commit `.env` or hardcode a username, token or personal name. This repo is open source; the Discogs account is configured only through env vars.
- Don't let `/random` or `/wishlist/random` be prerendered or prefetched. The shuffle button uses `<Link prefetch={false}>` for that reason.
- Discogs allows about 60 authenticated requests per minute. During a build, 429s are logged as `[discogs] 429 …` and the affected pages come out empty.
- `Box`, `Swiper`, `Shelf` and `Separator` in `components/` are currently unused.
