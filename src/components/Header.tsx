import { Book } from "lucide-react";

interface HeaderProps {
  onHomeClick: () => void;
}

export function Header({ onHomeClick }: HeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Book className="w-7 h-7" />
          <h1 className="font-serif text-2xl font-semibold">Holy Bible</h1>
        </button>
      </div>
    </header>
  );
}
