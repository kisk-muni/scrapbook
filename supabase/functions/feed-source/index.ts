// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.0.2';
import { parseFeed } from 'https://deno.land/x/rss/mod.ts';

async function sourceFeed(
  supabase: any,
  feed_url: string,
  portfolio_id: number
) {
  const response = await fetch(feed_url);
  const xml = await response.text();
  const { entries } = await parseFeed(xml);

  // [cernockyd] naive wordpress support
  // fields can be eventually accessed using DublinCore and MediaRss enums
  const parsed = entries.map((item) => ({
    portfolio_id,
    title: item?.title?.value,
    url: item?.links[0]?.href,
    published_at: item?.published,
    content: item?.content?.value,
    description: item?.description?.value,
  }));

  const { data, error } = await supabase
    .from('portfolio_posts')
    .upsert(parsed, {
      ignoreDuplicates: true,
      onConflict: 'url',
    })
    .select();

  if (error)
    throw new Error(`Error upserting portfolio posts: '${error.message}'.`);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}

serve(async (req) => {
  const { method, headers } = req;
  try {
    if (method !== 'POST') throw new Error('Invalid method.');
    const auth = headers.get('Authorization');
    if (!auth) throw new Error('Authorization not provided');
    const body = await req.json();
    const { feed_url, portfolio_id } = body;
    if (!feed_url) throw new Error('Feed url not provided.');
    if (!portfolio_id) throw new Error('Portfolio id not provided.');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: auth },
        },
      }
    );
    return sourceFeed(supabase, feed_url, portfolio_id);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/feed-source' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"feed_url":"https://veronikabatelkova.cz/feed/", "portfolio_id": 3}'
