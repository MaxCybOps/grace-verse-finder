import { useState } from "react";
import { Header } from "@/components/Header";
import { DailyVerse } from "@/components/DailyVerse";
import { BookList } from "@/components/BookList";
import { ChapterSelector } from "@/components/ChapterSelector";
import { ChapterView } from "@/components/ChapterView";
import { Book } from "@/data/bibleData";
import { BookOpen } from "lucide-react";

type View = "home" | "chapters" | "reading";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number>(1);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setView("chapters");
  };

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
    setView("reading");
  };

  const handleNavigateChapter = (chapter: number) => {
    if (selectedBook && chapter >= 1 && chapter <= selectedBook.chapters) {
      setSelectedChapter(chapter);
    }
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
    setView("home");
  };

  const handleBackToChapters = () => {
    setView("chapters");
  };

  const handleHomeClick = () => {
    setSelectedBook(null);
    setSelectedChapter(1);
    setView("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onHomeClick={handleHomeClick} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {view === "home" && (
          <div className="space-y-8 animate-fade-in">
            <DailyVerse />

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-xl text-foreground">Select a Book</h2>
              </div>
              <BookList onSelectBook={handleSelectBook} />
            </div>
          </div>
        )}

        {view === "chapters" && selectedBook && (
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <ChapterSelector
              book={selectedBook}
              onSelectChapter={handleSelectChapter}
              onBack={handleBackToBooks}
            />
          </div>
        )}

        {view === "reading" && selectedBook && (
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <ChapterView
              book={selectedBook}
              chapter={selectedChapter}
              onBack={handleBackToChapters}
              onNavigate={handleNavigateChapter}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
