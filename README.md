# kisk portfolios

this repo contains site and database definition for https://kisk.vercel.app/

- posts from portfolios are fetched hourly to supabase.com db instance
- a cron job invokes [feed fetch function](./supabase/functions/feed-source/index.ts) on every portfolio from [kisk’s student portfolio list](https://kisk.phil.muni.cz/studenti/portfolia-studentu).
