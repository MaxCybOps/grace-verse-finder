import { Book, getChapter, Verse } from "@/data/bibleData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterViewProps {
  book: Book;
  chapter: number;
  onBack: () => void;
  onNavigate: (chapter: number) => void;
}

export function ChapterView({ book, chapter, onBack, onNavigate }: ChapterViewProps) {
  const verses: Verse[] = getChapter(book.id, chapter);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-sans text-sm">Chapters</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate(chapter - 1)}
            disabled={chapter <= 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate(chapter + 1)}
            disabled={chapter >= book.chapters}
            className="h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-foreground">{book.name}</h2>
        <span className="font-sans text-lg text-muted-foreground">Chapter {chapter}</span>
      </div>

      <ScrollArea className="h-[60vh]">
        <div className="bg-scripture-bg rounded-lg p-6 md:p-8 pr-8">
          <div className="max-w-2xl mx-auto space-y-4">
            {verses.map((verse) => (
              <p key={verse.number} className="font-serif text-lg leading-relaxed text-foreground">
                <sup className="text-verse-number font-sans text-sm font-bold mr-1">
                  {verse.number}
                </sup>
                {verse.text}
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
