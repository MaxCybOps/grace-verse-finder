import { useBibleBooks, BibleBook } from "@/hooks/useBibleApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

interface ApiBookListProps {
  bibleId: string;
  onSelectBook: (book: BibleBook) => void;
}

export function ApiBookList({ bibleId, onSelectBook }: ApiBookListProps) {
  const { books, loading, error } = useBibleBooks(bibleId);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading books...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Failed to load books. Please try again.
      </div>
    );
  }

  // Split into Old and New Testament (approximate split at Matthew)
  const matthewIndex = books.findIndex(b => b.id.includes('MAT'));
  const oldTestament = matthewIndex > 0 ? books.slice(0, matthewIndex) : books.slice(0, 39);
  const newTestament = matthewIndex > 0 ? books.slice(matthewIndex) : books.slice(39);

  const BookButton = ({ book }: { book: BibleBook }) => (
    <button
      onClick={() => onSelectBook(book)}
      className="text-left px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors font-sans text-sm"
    >
      {book.name}
    </button>
  );

  return (
    <Tabs defaultValue="old" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="old">Old Testament</TabsTrigger>
        <TabsTrigger value="new">New Testament</TabsTrigger>
      </TabsList>

      <TabsContent value="old">
        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pr-4">
            {oldTestament.map((book) => (
              <BookButton key={book.id} book={book} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="new">
        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 pr-4">
            {newTestament.map((book) => (
              <BookButton key={book.id} book={book} />
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
