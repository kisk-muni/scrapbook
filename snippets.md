# useful snippets

get curated posts function

```sql
create or replace function get_curated_posts() returns table (
  id uuid,
  title text,
  url text,
  published_at timestamp,
  thumbnail_url text,
  description text,
  portfolio_id uuid,
  portfolio_title text,
  portfolio_name text,
  portfolio_feed_url text,
  portfolio_image text
) as $$
SELECT portfolio_posts.id, portfolio_posts.title, portfolio_posts.url, portfolio_posts.published_at, portfolio_posts.thumbnail_url, portfolio_posts.description, portfolios.id as portfolio_id, portfolios.title as portfolio_title, portfolios.name as portfolio_name, portfolios.feed_url as portfolio_feed_url, portfolios.image_url as portfolio_image
FROM portfolio_posts
JOIN discord_message_reactions ON portfolio_posts.discord_message_id = discord_message_reactions.message_id
JOIN portfolios ON portfolio_posts.portfolio_id = portfolios.id
GROUP BY portfolio_posts.id, portfolios.id
HAVING COUNT(DISTINCT discord_message_reactions.discord_user_id) >= 5 OR COUNT(discord_message_reactions.id) filter (where discord_message_reactions.emoji_name = 'upvote') >= 3
ORDER BY portfolio_posts.published_at DESC
LIMIT 40
$$ language sql;
```

## feed processing

create function to fetch portfolio posts

```sql
create or replace function fetch_portfolios_posts() returns table (
  now timestamp,
  id uuid,
  feed_url varchar,
  request_id int
) as $$
SELECT
    now() as time,
    id,
    feed_url,
    net.http_post(
        url:='https://kiggmvgmzoffneyfrvuz.functions.supabase.co/feed-source',
        body:=jsonb_build_object('feed_url', feed_url, 'portfolio_id', id),
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZ2dtdmdtem9mZm5leWZydnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc5MjE1NzYsImV4cCI6MTk4MzQ5NzU3Nn0.74Wy0yL0oWfA5M1koxzpswBUwAwFS8RMPpeugRaWVw4"}'
    ) as request_id
FROM
    portfolios
WHERE feed_url IS NOT NULL
ORDER BY random() limit 17;
$$ language sql;
```
