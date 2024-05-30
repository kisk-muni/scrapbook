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
GROUP BY portfolio_posts.id, portfolios.id, portfolio_posts.title, portfolio_posts.url, portfolio_posts.published_at, portfolio_posts.thumbnail_url, portfolio_posts.description
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

search pages function

```sql
CREATE OR REPLACE FUNCTION search_pages(
  cohorts          jsonb,
  keywords         text            default null,
  courses          text array      default null,
  kinds            text array      default null,
  profilations     text array      default null,
  tones            text array      default null,
  languages        text array      default null,
  show_private     boolean         default false,
  items_limit      integer         default 1,
  items_offset     integer         default 0
) RETURNS TABLE (
  filtered_portfolio_pages    json
) AS $$
  WITH filtered AS (
    SELECT
      portfolio_pages.id as id,
      data->>'title' as title,
      portfolio_pages.url as url,
      to_timestamp(scraped_data->>'publishedAt', 'YYYY-MM-DD"T"HH24:MI:SS.USZ') as published_at,
      data->'courses' as courses,
      data->'description' as description,
      data->'contentTypes' as content_types,
      data->'categories' as categories,
      data->'tones' as tones,
      data->>'dominantLanguage' as dominant_language,
      jsonb_build_object(
        'image_url', portfolios.image_url,
        'profiles', jsonb_build_object(
          'username', profiles.username,
          'full_name', profiles.full_name,
          'study_start_semester_year', profiles.study_start_semester_year,
          'study_start_semester_kind', profiles.study_start_semester_kind,
          'is_public', profiles.is_public
        )
      ) as portfolios
    FROM
      portfolio_pages
    JOIN portfolios ON portfolio_pages.portfolio_id = portfolios.id
    JOIN profiles ON portfolios.profile_id = profiles.id
    WHERE
      (show_private OR portfolios.is_public)
      AND (scraped_data->>'publishedAt' is null OR to_timestamp(scraped_data->>'publishedAt', 'YYYY-MM-DD"T"HH24:MI:SS.USZ') > '2018-01-01')
      AND (scraped_data->'simplifiedContent'->'text' is not null)
      AND (kinds is null OR data->'contentTypes' ?| kinds)
      AND (courses is null OR data->'courses' ?| courses)
      AND (profilations is null OR data->'categories' ?| profilations)
      AND (tones is null OR data->'tones' ?| tones)
      AND (languages is null OR data->>'dominantLanguage' = ANY(languages))
      AND (keywords is null OR data->>'title' &@~ keywords OR scraped_data->'simplifiedContent'->>'text' &@~ keywords)
      AND (jsonb_array_length(cohorts) = 0 OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(cohorts) AS cohorts_filters
        WHERE (
          cohorts_filters->>'year')::int = profiles.study_start_semester_year
          AND (
            (cohorts_filters->>'kind' is null AND profiles.study_start_semester_kind is null)
            OR (cohorts_filters->>'kind' = profiles.study_start_semester_kind)
          )
      ))
    GROUP BY
      portfolio_pages.id,
      portfolio_pages.url,
      portfolio_pages.scraped_data,
      profiles.username,
      profiles.full_name,
      profiles.study_start_semester_kind,
      profiles.study_start_semester_year,
      profiles.is_public,
      portfolios.image_url
  ),
  filtered_counts_by_period AS (
    SELECT
      date_trunc('month', published_at)::date as filter_period_begin,
      count(*) as pages_count
    FROM filtered
    GROUP BY
      date_trunc('month', published_at)
  ),
  full_filtered_counts_by_period AS (
    SELECT
      filter_period_begin,
      SUM(pages_count)
    FROM (
      SELECT
        filter_period_begin,
        pages_count
      FROM
        filtered_counts_by_period
      UNION
      SELECT
        generate_series(
          date_trunc('month', min(published_at)),
          date_trunc('month', max(published_at)),
          '1 month'
        ) as filter_period_begin,
        0 as pages_count
      FROM
        filtered
    ) all_periods_with_counts
    GROUP BY filter_period_begin
    ORDER BY filter_period_begin NULLS FIRST
  ), requested_page AS (
    SELECT *
    FROM filtered
    ORDER BY published_at DESC NULLS LAST
    LIMIT items_limit
    OFFSET items_offset
  )
  SELECT
    json_build_object(
      'counts', (
        SELECT json_agg(row_to_json(r))
        FROM full_filtered_counts_by_period r
      ),
      'data', (
        SELECT
          json_agg(row_to_json(r))
        FROM requested_page r
      )
    ) as filtered_portfolio_pages
$$ LANGUAGE SQL;
```

index on on portfolio pages

```sql
select * from portfolio_pages where data &@~ 'tech';

ALTER TABLE portfolio_posts ADD COLUMN fts tsvector generated always as (to_tsvector('english', title || ' ' || description || ' ' || url)) stored;

CREATE INDEX portfolio_posts_fts on portfolio_posts using gin (fts);
```
