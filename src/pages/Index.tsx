import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { DailyVerse } from "@/components/DailyVerse";
import { VersionSelector } from "@/components/VersionSelector";
import { ApiBookList } from "@/components/ApiBookList";
import { ApiChapterSelector } from "@/components/ApiChapterSelector";
import { ApiChapterView } from "@/components/ApiChapterView";
import { BibleAssistant } from "@/components/BibleAssistant";
import { BibleVersion, BibleBook } from "@/hooks/useBibleApi";
import { BookOpen } from "lucide-react";

type View = "home" | "chapters" | "reading";

const STORAGE_KEY = "selectedBibleVersion";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion | null>(null);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<string>("1");

  // Load saved version from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSelectedVersion(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved version");
      }
    }
  }, []);

  const handleSelectVersion = (version: BibleVersion) => {
    setSelectedVersion(version);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(version));
    // Reset selection when version changes
    setSelectedBook(null);
    setSelectedChapterId(null);
    setView("home");
  };

  const handleSelectBook = (book: BibleBook) => {
    setSelectedBook(book);
    setView("chapters");
  };

  const handleSelectChapter = (chapterId: string, chapterNumber: string) => {
    setSelectedChapterId(chapterId);
    setSelectedChapterNumber(chapterNumber);
    setView("reading");
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
    setSelectedChapterId(null);
    setView("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onHomeClick={handleHomeClick} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Version Selector - Always visible */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg text-foreground">Bible Version:</span>
          </div>
          <VersionSelector
            selectedVersion={selectedVersion?.id || null}
            onSelectVersion={handleSelectVersion}
          />
        </div>

        {!selectedVersion ? (
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border text-center">
            <h2 className="font-serif text-2xl text-foreground mb-4">Welcome to Grace Verse Finder</h2>
            <p className="text-muted-foreground mb-6">
              Please select a Bible version above to begin reading scripture.
            </p>
          </div>
        ) : (
          <>
            {view === "home" && (
              <div className="space-y-8 animate-fade-in">
                <DailyVerse />

                <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="font-serif text-xl text-foreground">Select a Book</h2>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({selectedVersion.abbreviationLocal || selectedVersion.abbreviation})
                    </span>
                  </div>
                  <ApiBookList bibleId={selectedVersion.id} onSelectBook={handleSelectBook} />
                </div>
              </div>
            )}

            {view === "chapters" && selectedBook && (
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <ApiChapterSelector
                  bibleId={selectedVersion.id}
                  book={selectedBook}
                  onSelectChapter={handleSelectChapter}
                  onBack={handleBackToBooks}
                />
              </div>
            )}

            {view === "reading" && selectedBook && selectedChapterId && (
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <ApiChapterView
                  bibleId={selectedVersion.id}
                  book={selectedBook}
                  chapterId={selectedChapterId}
                  chapterNumber={selectedChapterNumber}
                  onBack={handleBackToChapters}
                />
              </div>
            )}
          </>
        )}
      </main>
      
      <BibleAssistant />
    </div>
  );
};

export default Index;
