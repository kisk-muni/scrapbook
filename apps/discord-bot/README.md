## Scrappy

Scrappy is the Discord bot that posts updates from [scrapbook.kisk.cz](https://scrapbook.kisk.cz/) to our Discord community.

Scrappy is powered by [Discord.js](https://discord.js.org/), [Express.js](https://expressjs.com/),
[Supabase Postgres database](https://supabase.com/) and runs on [Digitalocean’s App Platform](https://www.digitalocean.com/products/app-platform).

## Geting started

At this point we develop Scrappy on production database and make sure that all testing is done in private channel,
so community members don’t notice.

To get into development, please reach out to @eventually-consistent on our [Discord community](https://discord.com/invite/PGugj3BsE9).
You will be provided with access to the database and Discord application.

Useful resources:

- [Discord.js Guide](https://discordjs.guide/) - covers the most common Discord bot scenarios with code examples
- [Next.js Discord Bot](https://github.com/vercel/nextjs-discord-bot) - battle tested Discord.js bot that powers Next.js community and has small codebase
- [Hack Clubs’s Scrappy](https://github.com/hackclub/scrappy) - our spiritual ancestor with lots of social learning infrastructuring work and experience

1. install dependencies

```
npm i
```

2. set environmental variables

```
cp .env.example .env
```

3. run local development server

```
npm run dev
```

## Useful snippets

invoke post synchronization

```bash
curl --request POST \
  --url 'http://localhost:3000/sync-post?env=development' \
  --header 'Authorization: Bearer API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "type": "INSERT",
    "table": "portfolio_posts",
    "schema": "public",
    "record": {
       "created_at": "2022-11-20 19:48:24.495018+00",
       "title": "Reflexe: Connectivism: A Learning Theory for the Digital Age",
       "url": "https://daliborcernocky.wordpress.com/2020/11/22/reflexe-connectivism-a-learning-theory-for-the-digital-age/",
       "description": "Siemens, G. (2015). Connectivism: A Learning Theory for the Digital Age: A knowledge learning theory for the digital age? International Journal &#8230; <a class=\"more-link\" href=\"https://daliborcernocky.wordpress.com/2020/11/22/reflexe-connectivism-a-learning-theory-for-the-digital-age/\">Další</a>",
       "published_at": "2023-02-25 19:43:05+00",
       "id": "non-existing-id",
       "portfolio_id": "bc1cf22a-f2d9-4bcd-8e44-f3286f33b40d",
       "thumbnail_url": "",
       "discord_message_id": ""
     },
     "old_record": null
   }'
```

re-collect message reactions in scrapbook channel

```bash
curl --request POST \
  --url 'http://localhost:3000/collect-old-reactions' \
  --header 'Authorization: Bearer API_KEY' \
  --header 'Content-Type: application/json'
```

## Origin of Scrappy

Scrappy is a Discord sibling of Hack Clubs’s Slack bot [Scrappy](https://github.com/hackclub/scrappy).
