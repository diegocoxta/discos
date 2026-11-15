# discos.

A personal vinyl collection site powered by your [Discogs](https://www.discogs.com) account. It shows your collection and wishlist as a browsable shelf, with search, folders, a detail page for each record, and a "random record" button.

Live at [discos.diegocoxta.com](https://discos.diegocoxta.com).

## Why

Discogs is great for cataloging, but its interface isn't the nicest way to browse a collection. This project exists for two reasons:

- **A more modern UI** to view my collection, with sleeves front and center instead of tables.
- **A shuffle button** to pick what to listen to today. It's also available as a plain URL (`/random`), so it can live behind a QR code next to the turntable.

## Features

- **Collection and wishlist**, read live from the Discogs API and cached for one hour.
- **Search** by title, artist, genre, style or year. The query lives in the URL (`/?s=rosalia`), so a search can be shared.
- **Folders** from your Discogs collection, plus artist and style routes.
- **Record details** in a modal (or a full page when opened directly): tracklist, styles, and your own copy's notes, such as acquisition date, sleeve condition and vinyl color.
- **Wishlist notes** and search links for stores, for records you still want to buy.
- **Random record** at `/random` (optionally `/random?folder=ID`) and `/wishlist/random`. Handy as a QR code taped to your turntable.
- **Stats page** (`/sobre`) with your top artists, styles and favorite decade.
- Profile name, avatar and bio come from your Discogs profile.

The interface is written in Brazilian Portuguese. There is no i18n layer, so strings live in the components.

## Getting started

You need Node 24 (see [.nvmrc](.nvmrc)) and Yarn 1.x (`corepack enable yarn`).

```bash
git clone https://github.com/diegocoxta/discos.git
cd discos
yarn install
cp .env.example .env
```

Fill in `.env`:

| Variable           | Required | Description                                                                                                           |
| ------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `DISCOGS_USERNAME` | yes      | The Discogs user whose collection and wishlist are shown. Must be public.                                             |
| `DISCOGS_TOKEN`    | yes      | A personal access token, generated at [discogs.com/settings/developers](https://www.discogs.com/settings/developers). |
| `REBUILD_TOKEN`    | no       | Secret that enables `/rebuild?token=…`, which clears the Discogs cache on demand.                                     |
| `SITE_URL`         | no       | Public URL of the site, used for absolute links in share previews.                                                    |

Then start the dev server:

```bash
yarn dev
```

`yarn dev` also opens Chrome through `open -a`, which only works on macOS. Elsewhere, run `yarn next dev` instead.

## Using your Discogs data

The site reads these custom fields from your Discogs collection, matched by exact name. Create them under _Collection → Edit fields_ in Discogs and mark them as public to show them on the detail page:

| Field              | Used for                                                         |
| ------------------ | ---------------------------------------------------------------- |
| `Acquisition Date` | Sorting the collection and the "acquired on" date on each card.  |
| `Color`            | Tinting the sleeve and vinyl in the record's color (a hex code). |
| `Story`            | A short personal note, shown as a quote on the detail page.      |

Other public fields (for example `Acquisition Location`, `Sleeve Condition` and `Media Condition`) are listed as they are. Without these fields, everything still works, just with less detail.

Notes on wishlist items show up on the wishlist cards.

## Scripts

| Command      | What it does                |
| ------------ | --------------------------- |
| `yarn dev`   | Development server.         |
| `yarn build` | Production build.           |
| `yarn start` | Serve the production build. |
| `yarn lint`  | ESLint.                     |

The build fetches data from Discogs to pre-render folders, artists and styles, so `DISCOGS_USERNAME` and `DISCOGS_TOKEN` must be set at build time too. Discogs limits authenticated requests to about 60 per minute. If a build hits the limit (HTTP 429), the affected pages render empty until the cache refreshes. Re-run the build or call `/rebuild`.

## Deploying

The project is a standard Next.js app and runs on [Vercel](https://vercel.com) without extra setup. Set the environment variables above in your project settings. To refresh data right after you change something in Discogs, open `/rebuild?token=YOUR_REBUILD_TOKEN`.

## Tech stack

[Next.js](https://nextjs.org) (App Router) with React 19 and the React Compiler, TypeScript, CSS Modules, [Fuse.js](https://www.fusejs.io) for search and [lucide-react](https://lucide.dev) for icons.

## Contributing

Issues and pull requests are welcome. This is a personal project, so I may decline changes that don't fit how I use it. Before opening a PR:

- Run `yarn lint` and `yarn build`. Both must pass.
- Use [Conventional Commits](https://www.conventionalcommits.org/) (`type(scope): subject`).
- Keep diffs small and match the style of the surrounding code.

See [AGENTS.md](AGENTS.md) for an overview of how the code is organized.

## Disclaimer

This project is not affiliated with or endorsed by Discogs. Record data and cover images are served by the Discogs API and are subject to the terms in the [Discogs API documentation](https://www.discogs.com/developers). Do not use this project to republish Discogs data in ways those terms forbid.

## License

[MIT](LICENSE)
