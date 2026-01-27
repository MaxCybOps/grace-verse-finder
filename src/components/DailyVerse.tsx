import { getDailyVerse } from "@/data/bibleData";
import { BookOpen } from "lucide-react";

export function DailyVerse() {
  const verse = getDailyVerse();

  return (
    <div className="bg-card rounded-lg p-8 shadow-sm border border-border animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-accent" />
        <span className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wide">
          Verse of the Day
        </span>
      </div>
      <blockquote className="font-serif text-2xl leading-relaxed text-foreground mb-4">
        "{verse.text}"
      </blockquote>
      <cite className="text-accent font-sans font-semibold not-italic">
        — {verse.reference}
      </cite>
    </div>
  );
}
