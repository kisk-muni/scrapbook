# KISK Scrapbook

[Scrapbook (scrapbook.kisk.cz)](https://scrapbook.kisk.cz/) is the place where we share our learning journey.
The goal of the scrapbook is to create a place where we will enjoy coming back to find
out what others are working on and support each other.

## Project structure

The project is a monorepo containing following workspaces:

apps:

- [site](./apps/site) - Next.js app for the public website
- [crawler](./apps/crawler) - App for crawling student portfolios for new content and analysis
- [analyser](./apps/analyser) - App for generating metadata for student posts (such as tags, etc.)
- [discord-bot](./apps/discord-bot) - Discord bot for posting new content to discord, collecting reactions etc.

packages:

- [shared](./packages/shared) - Shared code between apps such as database connection, types, etc.
- [tsconfig](./packages/tsconfig) - Shared typescript configuration

## Get started

1. install dependencies

```
npm i
```

2. set environmental variables

```
cp .env.example .env.local
```

3. run local site development server

```
npm run dev-site
```

### Updating database schema

1. login to supabase

```
npx supabase login
```

2. download typings for the latest database schema

```
npm run type-gen
```

## Origin of Scrapbook

Significant parts of the project are copied from, derived from, or
inspired by [Hack Club’s Scrapbook](https://github.com/hackclub/scrapbook)
which is released under MIT License.#
