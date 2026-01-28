import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BibleBook } from "@/hooks/useBibleApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Chapter {
  id: string;
  number: string;
  bookId: string;
}

interface ApiChapterSelectorProps {
  bibleId: string;
  book: BibleBook;
  onSelectChapter: (chapterId: string, chapterNumber: string) => void;
  onBack: () => void;
}

export function ApiChapterSelector({ bibleId, book, onSelectChapter, onBack }: ApiChapterSelectorProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChapters() {
      try {
        const { data, error } = await supabase.functions.invoke('bible-api', {
          body: { action: 'getChapters', bibleId, bookId: book.id }
        });

        if (error) throw error;
        // Filter out intro chapters
        const chapterList = (data?.data || []).filter((c: Chapter) => c.number !== 'intro');
        setChapters(chapterList);
      } catch (err: any) {
        console.error('Error fetching chapters:', err);
        setError(err.message || 'Failed to load chapters');
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [bibleId, book.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading chapters...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Failed to load chapters. Please try again.
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-sans text-sm">Back to books</span>
      </button>

      <h2 className="font-serif text-2xl text-foreground mb-4">{book.name}</h2>

      <ScrollArea className="h-[50vh]">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-4">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id, chapter.number)}
              className="aspect-square flex items-center justify-center rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors font-sans text-sm font-medium"
            >
              {chapter.number}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
