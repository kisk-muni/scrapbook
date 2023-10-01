# Post search and filtering

- create indexes on portfolio_pages table
- create RPC

```
const { data, error } = await supabase.rpc('echo', { say: '👋' })
```

```
create function echo(say text) returns text as $$
  select say;
$$ language ;
```

pgGroona multicol index
https://github.com/pgroonga/pgroonga/issues/110

## RPC for post search

```
CREATE OR REPLACE FUNCTION search_pages(
  keyword                text            default null,
  courses                text array      default null,
  kinds                  text array      default null,
  profilations           text array      default null,
  tones                  text array      default null,
  languages              text array      default null,
  items_limit            integer         default 1,
  items_offset           integer         default 0
) RETURNS TABLE (
  title                  text,
  url                    text,
  published_at           timestamp,
  data                   jsonb,
  ai_courses             text array,
  ai_type                text,
  ai_profilations        text array,
  ai_tones               text array,
  ai_dominant_language   text
) AS $$
  SELECT
    title,
    url,
    published_at,
    data,
    ai_courses,
    ai_type,
    ai_profilations,
    ai_tones,
    ai_dominant_language
  FROM
    portfolio_pages
  WHERE
        (courses is null OR ai_courses && courses)
    AND (kinds is null OR ai_type = ANY(kinds))
    AND (profilations is null OR profilations && ai_profilations)
    AND (tones is null OR ai_tones && tones)
    AND (languages is null OR ai_dominant_language = ANY(languages))
    AND (keyword is null OR title &@~ keyword OR text &@~ keyword)
  LIMIT items_limit
  OFFSET items_offset
$$ LANGUAGE SQL;

CREATE INDEX idx_ai_courses ON portfolio_pages USING gin(ai_courses);
CREATE INDEX idx_ai_type ON portfolio_pages (ai_type);
CREATE INDEX idx_ai_profilations ON portfolio_pages USING gin(ai_profilations);
CREATE INDEX idx_ai_tones ON portfolio_pages USING gin(ai_tones);
CREATE INDEX idx_ai_dominant_language ON portfolio_pages (ai_dominant_language);
CREATE INDEX idx_title ON portfolio_pages USING pgroonga (title);
CREATE INDEX idx_text ON portfolio_pages USING pgroonga (text);
```

how to call it

```
SELECT * FROM search_pages(null, null, null, null, null, null);
```
