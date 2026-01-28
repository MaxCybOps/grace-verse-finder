import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BIBLE_API_BASE = 'https://api.scripture.api.bible/v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('BIBLE_API_KEY');
    if (!apiKey) {
      console.error('BIBLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Bible API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, bibleId, bookId, chapterId } = await req.json();
    console.log('Bible API request:', { action, bibleId, bookId, chapterId });

    const headers = {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    };

    let endpoint = '';
    
    switch (action) {
      case 'getBibles':
        // Get English Bibles
        endpoint = `${BIBLE_API_BASE}/bibles?language=eng`;
        break;
      case 'getBooks':
        endpoint = `${BIBLE_API_BASE}/bibles/${bibleId}/books`;
        break;
      case 'getChapters':
        endpoint = `${BIBLE_API_BASE}/bibles/${bibleId}/books/${bookId}/chapters`;
        break;
      case 'getChapter':
        endpoint = `${BIBLE_API_BASE}/bibles/${bibleId}/chapters/${chapterId}?content-type=text&include-verse-numbers=true`;
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    console.log('Fetching from:', endpoint);
    const response = await fetch(endpoint, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API.Bible error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `Bible API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Bible API response received');

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in bible-api function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
