# KISK Scrapbook

this repo contains site and database definition for https://kisk.vercel.app/

- the site is powered by [next.js 13](https://nextjs.org/) which is currently in beta and its features are not stable. this project was partly created to test the new version of the framework, provide feedback to its developers and form opinion on it.
- posts from portfolios are fetched hourly to supabase.com db instance
- a cron job invokes [feed fetch function](./supabase/functions/feed-source/index.ts) on every portfolio from [kisk’s student portfolio list](https://kisk.phil.muni.cz/studenti/portfolia-studentu).

## Origin of Scrapbook

Significant parts of the project are copied from, derived from, or
inspired by [Hack Club’s Scrapbook](https://github.com/hackclub/scrapbook) which is released under MIT License.
