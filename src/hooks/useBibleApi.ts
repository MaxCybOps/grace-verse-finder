import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BibleVersion {
  id: string;
  name: string;
  nameLocal: string;
  abbreviation: string;
  abbreviationLocal: string;
  description: string;
  language: {
    id: string;
    name: string;
  };
}

export interface BibleBook {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
}

export interface BibleChapter {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  content: string;
  reference: string;
}

export function useBibleVersions() {
  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVersions() {
      try {
        const { data, error } = await supabase.functions.invoke('bible-api', {
          body: { action: 'getBibles' }
        });

        if (error) throw error;
        
        // Filter to popular English versions
        const popularIds = [
          'de4e12af7f28f599-02', // KJV
          '06125adad2d5898a-01', // ASV
          '9879dbb7cfe39e4d-04', // WEB
          'c315fa9f71d4af3a-01', // WEBBE
          '7142879509583d59-04', // ENGGNV
        ];
        
        const allBibles = data?.data || [];
        const filtered = allBibles.filter((b: BibleVersion) => 
          popularIds.includes(b.id) || b.abbreviation === 'KJV' || b.abbreviation === 'ASV' || b.abbreviation === 'WEB'
        );
        
        // If filtered is empty, just take first 10
        setVersions(filtered.length > 0 ? filtered : allBibles.slice(0, 10));
      } catch (err: any) {
        console.error('Error fetching Bible versions:', err);
        setError(err.message || 'Failed to load Bible versions');
      } finally {
        setLoading(false);
      }
    }

    fetchVersions();
  }, []);

  return { versions, loading, error };
}

export function useBibleBooks(bibleId: string | null) {
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bibleId) {
      setBooks([]);
      return;
    }

    async function fetchBooks() {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('bible-api', {
          body: { action: 'getBooks', bibleId }
        });

        if (error) throw error;
        setBooks(data?.data || []);
      } catch (err: any) {
        console.error('Error fetching Bible books:', err);
        setError(err.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [bibleId]);

  return { books, loading, error };
}

export function useBibleChapter(bibleId: string | null, chapterId: string | null) {
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bibleId || !chapterId) {
      setChapter(null);
      return;
    }

    async function fetchChapter() {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('bible-api', {
          body: { action: 'getChapter', bibleId, chapterId }
        });

        if (error) throw error;
        setChapter(data?.data || null);
      } catch (err: any) {
        console.error('Error fetching chapter:', err);
        setError(err.message || 'Failed to load chapter');
      } finally {
        setLoading(false);
      }
    }

    fetchChapter();
  }, [bibleId, chapterId]);

  return { chapter, loading, error };
}
