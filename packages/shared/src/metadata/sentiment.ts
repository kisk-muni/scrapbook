import { Item, EmojiItem } from "./types";

export const tones: EmojiItem[] = [
  {
    value: "frustrated-or-unjust",
    label: "frustrovaný",
    emoji: "😣",
  },
  {
    value: "formal",
    label: "formální",
    emoji: "👔",
  },
  {
    value: "scared",
    label: "obávající se",
    emoji: "😟",
  },
  {
    value: "demotivated",
    label: "demotivovaný",
    emoji: "😟",
  },
  {
    value: "sad",
    label: "smutný",
    emoji: "😢",
  },
  {
    value: "informal",
    label: "neformální",
    emoji: "👕",
  },
  {
    value: "positive",
    label: "pozitivní",
    emoji: "🙂",
  },
];

export const tonesByValue = tones.reduce((acc, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {} as Record<string, EmojiItem>);

export const feelings: Item[] = [
  {
    value: "excited",
    label: "vzrušený",
  },
  {
    value: "amazed",
    label: "ohromený",
  },
  {
    value: "joyful",
    label: "radostný",
  },
  {
    value: "grateful",
    label: "vděčný",
  },
  {
    value: "loved",
    label: "milovaný",
  },
  {
    value: "accomplished",
    label: "úspěšný",
  },
  {
    value: "appreciated",
    label: "oceněný",
  },
  {
    value: "thankful",
    label: "vděčný",
  },
  {
    value: "worthy",
    label: "whorty",
  },
  {
    value: "proud",
    label: "pyšný",
  },
  {
    value: "encouraged",
    label: "energetic",
  },
  {
    value: "productive",
    label: "produktivní",
  },
  {
    value: "motivated",
    label: "motivovaný",
  },
  {
    value: "active",
    label: "aktivní",
  },
  {
    value: "refreshed",
    label: "osvěžený",
  },
  {
    value: "active",
    label: "aktivní",
  },
  {
    value: "relaxed",
    label: "odpočatý",
  },
  {
    value: "refreshed",
    label: "osvěžený",
  },
  {
    value: "calm",
    label: "klidný",
  },
  {
    value: "inspired",
    label: "inspirovaný",
  },
  {
    value: "optimistic",
    label: "optimistický",
  },
  {
    value: "supported",
    label: "podpořený",
  },
  {
    value: "chilled",
    label: "chilled",
  },
  {
    value: "avarage",
    label: "průměrně",
  },
  {
    value: "uneventful",
    label: "bez událostí",
  },
  {
    value: "sad",
    label: "smutný",
  },
  {
    value: "lonely",
    label: "osamělý",
  },
  {
    value: "insecure",
    label: "nejistý",
  },
  {
    value: "numb",
    label: "necitlivý",
  },
  {
    value: "tired",
    label: "unavený",
  },
  {
    value: "unmotivated",
    label: "nemotivovaný",
  },
  {
    value: "nervous",
    label: "nervózní",
  },
  {
    value: "bored",
    label: "znuděný",
  },
  {
    value: "impatient",
    label: "netrpělivý",
  },
  {
    value: "worried",
    label: "znepokojený",
  },
  {
    value: "ashamed",
    label: "stydlivý",
  },
  {
    value: "confused",
    label: "zmatený",
  },
  {
    value: "overwhelmed",
    label: "přetížený",
  },
  {
    value: "embarrassed",
    label: "trapný",
  },
  {
    value: "shocked",
    label: "šokovaný",
  },
  {
    value: "meh",
    label: "meh",
  },
  {
    value: "inadequate",
    label: "nedostatečný",
  },
  {
    value: "stressed",
    label: "stresovaný",
  },
  {
    value: "angry",
    label: "naštvaný",
  },
  {
    value: "anxious",
    label: "úzkostlivý",
  },
  {
    value: "disgusted",
    label: "znechucený",
  },
  {
    value: "frustrated",
    label: "frustrace",
  },
  {
    value: "annoyed",
    label: "nepříjemný",
  },
  {
    value: "manic",
    label: "maniakální",
  },
  {
    value: "sick",
    label: "nemocný",
  },
  {
    value: "sick",
    label: "nemocný",
  },
];
