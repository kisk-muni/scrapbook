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
    portfolio_pages.title as title,
    portfolio_pages.url as url,
    published_at,
    ai_courses,
    ai_type,
    ai_profilations,
    ai_tones,
    ai_dominant_language,
    json_build_object(
      'image_url', portfolios.image_url,
      'profiles', json_build_object(
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
    AND (courses is null OR ai_courses && courses)
    AND (kinds is null OR ai_type = ANY(kinds))
    AND (profilations is null OR profilations && ai_profilations)
    AND (tones is null OR ai_tones && tones)
    AND (languages is null OR ai_dominant_language = ANY(languages))
    AND (keyword is null OR portfolio_pages.title &@~ keyword OR portfolio_pages.text &@~ keyword)
    AND json_array_length(cohorts) = 0 OR EXISTS (
      SELECT 1
      FROM json_array_elements(cohorts) AS cohorts_filters
      WHERE (cohorts_filters->>'year')::int = profiles.study_start_semester_year AND ((cohorts_filters->>'kind' is null AND profiles.study_start_semester_kind is null) OR (cohorts_filters->>'kind' = profiles.study_start_semester_kind))
    )
  GROUP BY
    portfolio_pages.title,
    portfolio_pages.url,
    portfolios.image_url,
    profiles.username,
    profiles.full_name,
    profiles.study_start_semester_kind,
    profiles.study_start_semester_year,
    profiles.is_public
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

```
CREATE OR REPLACE FUNCTION search_pages(
  cohorts          jsonb,
  keyword          text        default null,
  courses          text array      default null,
  kinds            text array      default null,
  profilations     text array      default null,
  tones            text array      default null,
  languages        text array      default null,
  show_private     boolean         default false,
  items_limit      integer     default 1,
  items_offset     integer     default 0
) RETURNS TABLE (
  title                  text,
  url                    text,
  published_at           timestamp,
  ai_courses             text array,
  ai_type                text,
  ai_profilations        text array,
  ai_tones               text array,
  ai_dominant_language   text,
  portfolios             jsonb
) AS $$
  SELECT
    portfolio_pages.title as title,
    portfolio_pages.url as url,
    published_at,
    ai_courses,
    ai_type,
    ai_profilations,
    ai_tones,
    ai_dominant_language,
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
    AND (courses is null OR ai_courses && courses)
    AND (kinds is null OR ai_type = ANY(kinds))
    AND (profilations is null OR profilations && ai_profilations)
    AND (tones is null OR ai_tones && tones)
    AND (languages is null OR ai_dominant_language = ANY(languages))
    AND (keyword is null OR portfolio_pages.title &@~ keyword OR portfolio_pages.text &@~ keyword)
    AND jsonb_array_length(cohorts) = 0 OR EXISTS (
      SELECT 1
      FROM jsonb_array_elements(cohorts) AS cohorts_filters
      WHERE (
        cohorts_filters->>'year')::int = profiles.study_start_semester_year
        AND (
          (cohorts_filters->>'kind' is null AND profiles.study_start_semester_kind is null)
          OR (cohorts_filters->>'kind' = profiles.study_start_semester_kind)
        )
    )
  GROUP BY
    portfolio_pages.title,
    portfolio_pages.url,
    portfolios.image_url,
    profiles.username,
    profiles.full_name,
    profiles.study_start_semester_kind,
    profiles.study_start_semester_year,
    profiles.is_public
$$ LANGUAGE SQL;
```
