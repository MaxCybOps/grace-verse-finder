import { Book } from "@/data/bibleData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

interface ChapterSelectorProps {
  book: Book;
  onSelectChapter: (chapter: number) => void;
  onBack: () => void;
}

export function ChapterSelector({ book, onSelectChapter, onBack }: ChapterSelectorProps) {
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

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
              key={chapter}
              onClick={() => onSelectChapter(chapter)}
              className="aspect-square flex items-center justify-center rounded-md bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors font-sans text-sm font-medium"
            >
              {chapter}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
