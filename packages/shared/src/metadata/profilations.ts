import { EmojiItem } from "./types";

export enum Profilation {
  Design = "design",
  Analytics = "analytics",
  EdTech = "edtech",
  Librarianship = "librarianship",
}

export const profilations: EmojiItem[] = [
  { value: Profilation.Design, label: "Design", emoji: "🔎" },
  { value: Profilation.Analytics, label: "Data", emoji: "📊" },
  { value: Profilation.EdTech, label: "EdTech", emoji: "🤖" },
  { value: Profilation.Librarianship, label: "Knihovnictví", emoji: "📚" },
];

export const profilationsByValue = profilations.reduce((acc, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {} as Record<string, EmojiItem>);
