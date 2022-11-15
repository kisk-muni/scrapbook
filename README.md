# KISK Scrapbook

this repo contains site and database definition for https://kisk.vercel.app/

- posts from portfolios are fetched hourly to supabase.com db instance
- a cron job invokes [feed fetch function](./supabase/functions/feed-source/index.ts) on every portfolio from [kisk’s student portfolio list](https://kisk.phil.muni.cz/studenti/portfolia-studentu).

## Origin of Scrapbook

Significant parts of the project are copied from, derived from, or
inspired by [Hack Club’s Scrapbook](https://github.com/hackclub/scrapbook) which is released under MIT License.
