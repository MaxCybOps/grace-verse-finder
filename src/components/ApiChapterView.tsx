import { useBibleChapter, BibleBook } from "@/hooks/useBibleApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Loader2 } from "lucide-react";

interface ApiChapterViewProps {
  bibleId: string;
  book: BibleBook;
  chapterId: string;
  chapterNumber: string;
  onBack: () => void;
}

export function ApiChapterView({ bibleId, book, chapterId, chapterNumber, onBack }: ApiChapterViewProps) {
  const { chapter, loading, error } = useBibleChapter(bibleId, chapterId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading scripture...</span>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">Failed to load chapter content.</p>
        <button
          onClick={onBack}
          className="text-primary hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // Parse the content - API returns plain text with verse numbers
  const formatContent = (content: string) => {
    // The API returns text with [verse_number] markers
    // Split by verse markers and render
    const versePattern = /\[(\d+)\]/g;
    const parts = content.split(versePattern);
    
    const verses: { number: string; text: string }[] = [];
    for (let i = 1; i < parts.length; i += 2) {
      const verseNum = parts[i];
      const verseText = parts[i + 1]?.trim() || '';
      if (verseText) {
        verses.push({ number: verseNum, text: verseText });
      }
    }

    // If no verses found with markers, just show the content as is
    if (verses.length === 0) {
      return (
        <p className="font-serif text-lg leading-relaxed text-foreground whitespace-pre-wrap">
          {content}
        </p>
      );
    }

    return verses.map((verse, index) => (
      <p key={index} className="font-serif text-lg leading-relaxed text-foreground mb-2">
        <sup className="text-verse-number font-sans text-sm font-bold mr-1">
          {verse.number}
        </sup>
        {verse.text}
      </p>
    ));
  };

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-sans text-sm">Chapters</span>
      </button>

      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-foreground">{book.name}</h2>
        <span className="font-sans text-lg text-muted-foreground">Chapter {chapterNumber}</span>
      </div>

      <ScrollArea className="h-[60vh]">
        <div className="bg-scripture-bg rounded-lg p-6 md:p-8 pr-8">
          <div className="max-w-2xl mx-auto space-y-2">
            {formatContent(chapter.content)}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
