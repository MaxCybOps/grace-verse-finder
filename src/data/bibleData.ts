// Bible books data structure
export interface Book {
  id: string;
  name: string;
  chapters: number;
  testament: "old" | "new";
}

export const books: Book[] = [
  // Old Testament
  { id: "genesis", name: "Genesis", chapters: 50, testament: "old" },
  { id: "exodus", name: "Exodus", chapters: 40, testament: "old" },
  { id: "leviticus", name: "Leviticus", chapters: 27, testament: "old" },
  { id: "numbers", name: "Numbers", chapters: 36, testament: "old" },
  { id: "deuteronomy", name: "Deuteronomy", chapters: 34, testament: "old" },
  { id: "joshua", name: "Joshua", chapters: 24, testament: "old" },
  { id: "judges", name: "Judges", chapters: 21, testament: "old" },
  { id: "ruth", name: "Ruth", chapters: 4, testament: "old" },
  { id: "1samuel", name: "1 Samuel", chapters: 31, testament: "old" },
  { id: "2samuel", name: "2 Samuel", chapters: 24, testament: "old" },
  { id: "1kings", name: "1 Kings", chapters: 22, testament: "old" },
  { id: "2kings", name: "2 Kings", chapters: 25, testament: "old" },
  { id: "1chronicles", name: "1 Chronicles", chapters: 29, testament: "old" },
  { id: "2chronicles", name: "2 Chronicles", chapters: 36, testament: "old" },
  { id: "ezra", name: "Ezra", chapters: 10, testament: "old" },
  { id: "nehemiah", name: "Nehemiah", chapters: 13, testament: "old" },
  { id: "esther", name: "Esther", chapters: 10, testament: "old" },
  { id: "job", name: "Job", chapters: 42, testament: "old" },
  { id: "psalms", name: "Psalms", chapters: 150, testament: "old" },
  { id: "proverbs", name: "Proverbs", chapters: 31, testament: "old" },
  { id: "ecclesiastes", name: "Ecclesiastes", chapters: 12, testament: "old" },
  { id: "songofsolomon", name: "Song of Solomon", chapters: 8, testament: "old" },
  { id: "isaiah", name: "Isaiah", chapters: 66, testament: "old" },
  { id: "jeremiah", name: "Jeremiah", chapters: 52, testament: "old" },
  { id: "lamentations", name: "Lamentations", chapters: 5, testament: "old" },
  { id: "ezekiel", name: "Ezekiel", chapters: 48, testament: "old" },
  { id: "daniel", name: "Daniel", chapters: 12, testament: "old" },
  { id: "hosea", name: "Hosea", chapters: 14, testament: "old" },
  { id: "joel", name: "Joel", chapters: 3, testament: "old" },
  { id: "amos", name: "Amos", chapters: 9, testament: "old" },
  { id: "obadiah", name: "Obadiah", chapters: 1, testament: "old" },
  { id: "jonah", name: "Jonah", chapters: 4, testament: "old" },
  { id: "micah", name: "Micah", chapters: 7, testament: "old" },
  { id: "nahum", name: "Nahum", chapters: 3, testament: "old" },
  { id: "habakkuk", name: "Habakkuk", chapters: 3, testament: "old" },
  { id: "zephaniah", name: "Zephaniah", chapters: 3, testament: "old" },
  { id: "haggai", name: "Haggai", chapters: 2, testament: "old" },
  { id: "zechariah", name: "Zechariah", chapters: 14, testament: "old" },
  { id: "malachi", name: "Malachi", chapters: 4, testament: "old" },
  // New Testament
  { id: "matthew", name: "Matthew", chapters: 28, testament: "new" },
  { id: "mark", name: "Mark", chapters: 16, testament: "new" },
  { id: "luke", name: "Luke", chapters: 24, testament: "new" },
  { id: "john", name: "John", chapters: 21, testament: "new" },
  { id: "acts", name: "Acts", chapters: 28, testament: "new" },
  { id: "romans", name: "Romans", chapters: 16, testament: "new" },
  { id: "1corinthians", name: "1 Corinthians", chapters: 16, testament: "new" },
  { id: "2corinthians", name: "2 Corinthians", chapters: 13, testament: "new" },
  { id: "galatians", name: "Galatians", chapters: 6, testament: "new" },
  { id: "ephesians", name: "Ephesians", chapters: 6, testament: "new" },
  { id: "philippians", name: "Philippians", chapters: 4, testament: "new" },
  { id: "colossians", name: "Colossians", chapters: 4, testament: "new" },
  { id: "1thessalonians", name: "1 Thessalonians", chapters: 5, testament: "new" },
  { id: "2thessalonians", name: "2 Thessalonians", chapters: 3, testament: "new" },
  { id: "1timothy", name: "1 Timothy", chapters: 6, testament: "new" },
  { id: "2timothy", name: "2 Timothy", chapters: 4, testament: "new" },
  { id: "titus", name: "Titus", chapters: 3, testament: "new" },
  { id: "philemon", name: "Philemon", chapters: 1, testament: "new" },
  { id: "hebrews", name: "Hebrews", chapters: 13, testament: "new" },
  { id: "james", name: "James", chapters: 5, testament: "new" },
  { id: "1peter", name: "1 Peter", chapters: 5, testament: "new" },
  { id: "2peter", name: "2 Peter", chapters: 3, testament: "new" },
  { id: "1john", name: "1 John", chapters: 5, testament: "new" },
  { id: "2john", name: "2 John", chapters: 1, testament: "new" },
  { id: "3john", name: "3 John", chapters: 1, testament: "new" },
  { id: "jude", name: "Jude", chapters: 1, testament: "new" },
  { id: "revelation", name: "Revelation", chapters: 22, testament: "new" },
];

export interface Verse {
  number: number;
  text: string;
}

export interface DailyVerse {
  reference: string;
  text: string;
}

// Sample daily verses
export const dailyVerses: DailyVerse[] = [
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want.",
  },
  {
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ which strengtheneth me.",
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  },
  {
    reference: "Romans 8:28",
    text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
  },
  {
    reference: "Isaiah 41:10",
    text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
  },
];

// Sample chapter content (Genesis 1 as example)
export const sampleChapters: Record<string, Record<number, Verse[]>> = {
  genesis: {
    1: [
      { number: 1, text: "In the beginning God created the heaven and the earth." },
      { number: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
      { number: 3, text: "And God said, Let there be light: and there was light." },
      { number: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
      { number: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
      { number: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
      { number: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
      { number: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
      { number: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
      { number: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." },
    ],
  },
  john: {
    1: [
      { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
      { number: 2, text: "The same was in the beginning with God." },
      { number: 3, text: "All things were made by him; and without him was not any thing made that was made." },
      { number: 4, text: "In him was life; and the life was the light of men." },
      { number: 5, text: "And the light shineth in darkness; and the darkness comprehended it not." },
      { number: 6, text: "There was a man sent from God, whose name was John." },
      { number: 7, text: "The same came for a witness, to bear witness of the Light, that all men through him might believe." },
      { number: 8, text: "He was not that Light, but was sent to bear witness of that Light." },
      { number: 9, text: "That was the true Light, which lighteth every man that cometh into the world." },
      { number: 10, text: "He was in the world, and the world was made by him, and the world knew him not." },
    ],
  },
  psalms: {
    23: [
      { number: 1, text: "The Lord is my shepherd; I shall not want." },
      { number: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
      { number: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
      { number: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
      { number: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
      { number: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever." },
    ],
  },
};

export function getDailyVerse(): DailyVerse {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dailyVerses[dayOfYear % dailyVerses.length];
}

export function getChapter(bookId: string, chapter: number): Verse[] {
  // Return sample data if available, otherwise generate placeholder
  if (sampleChapters[bookId]?.[chapter]) {
    return sampleChapters[bookId][chapter];
  }
  
  // Generate placeholder verses for demo
  const verseCount = Math.floor(Math.random() * 20) + 10;
  return Array.from({ length: verseCount }, (_, i) => ({
    number: i + 1,
    text: `This is verse ${i + 1} of chapter ${chapter}. In a full implementation, this would contain the actual scripture text from the Bible.`,
  }));
}
