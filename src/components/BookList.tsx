import { books, Book } from "@/data/bibleData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

interface BookListProps {
  onSelectBook: (book: Book) => void;
}

export function BookList({ onSelectBook }: BookListProps) {
  const oldTestament = books.filter((b) => b.testament === "old");
  const newTestament = books.filter((b) => b.testament === "new");

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-6 pr-4">
        <div>
          <h3 className="font-sans font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
            Old Testament
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {oldTestament.map((book) => (
              <button
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="flex items-center justify-between p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-left group"
              >
                <span className="font-sans text-sm text-secondary-foreground">
                  {book.name}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-sans font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
            New Testament
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {newTestament.map((book) => (
              <button
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="flex items-center justify-between p-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-left group"
              >
                <span className="font-sans text-sm text-secondary-foreground">
                  {book.name}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
