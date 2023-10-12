import z from "zod";
import { contentTypes } from "../content-types";
import { profilations } from "../profilations";
import { getSupportedLanguages } from "i18n-iso-countries";
import { Item } from "../types";
import { tones } from "../sentiment";
export * from "./utils";

const supportedLanguages = getSupportedLanguages();

function validateOptions(values: string[], options: Item[]): boolean {
  return values.every((value) =>
    options.some((option) => option.value === value)
  );
}

export const ScrapedPageAnnotationSchema = z.object({
  contentTypes: z
    .string()
    .array()
    .refine((strings) => validateOptions(strings, contentTypes)),
  categories: z
    .string()
    .array()
    .refine((strings) => validateOptions(strings, profilations)),
  dominantLanguage: z
    .string()
    .refine((value) => supportedLanguages.includes(value)),
  description: z.string(),
  tones: z
    .string()
    .array()
    .refine((strings) => validateOptions(strings, tones)),
  tags: z.string().array(),
});

export type ScrapedPageAnnotation = z.infer<typeof ScrapedPageAnnotationSchema>;

export type FullScrapedPageAnnotation = ScrapedPageAnnotation & {
  courses?: string[];
  title?: string;
};
