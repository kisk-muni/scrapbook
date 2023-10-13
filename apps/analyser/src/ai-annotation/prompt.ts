import { contentTypes, profilations, tones } from "shared";

const schema: SchemaItem[] = [
  {
    parameter: "contentTypes",
    options: contentTypes.map((kind) => kind.value),
  },
  {
    comment:
      "select one or more categories that best matche the topic of the text",
    parameter: "categories",
    options: profilations.map((profilation) => profilation.value),
  },
  {
    comment:
      "write a one sentence descriptive summary of the text in the Czech language",
    parameter: "description",
    valueString: "string",
  },
  ,
  {
    parameter: "dominantLanguage",
    comment:
      "a short i18n code representing the primary language of the document",
    valueString: "string",
  },
  {
    parameter: "tones",
    comment:
      "select one or more tones from the following array that match the post author’s sentiment, emotions and tone in the text.",
    options: tones.map((tone) => tone.value),
  },
  {
    comment:
      "one or more tags to describe the content of the text, the tags must be in czech except for names and words that are generally used without translation eg. transition design",
    parameter: "tags",
    valueString: "string[]",
  },
];

const schemaString = printTypeDefinition(schema);

/*

The prompt is priced by the number of tokens, so we want to keep it as
short as possible. Therefore, we use the shortest possible variable and type names, 
type deficitions and prompt text.
*/
export const prompt = `You are an assistant that classifies university student blog posts based on its content. You can choose multiple classes, if suitable. If you dont have enough information to provide any classification, return empty object. Provide your answer in a json object with the following typescript type:\n${schemaString}

To decide categories, use the following rules: 
design: posts about user needs, service design, design methods, UX, UI;
analytics: posts about data analytics, information management, databases, long term preservation, computer science, visualiyations;
edtech: posts about technology in education, AI, online courses, life long learning, andragogics, pedagogy;
librarianship: posts about library management, literature, reading, books;

To decide contentTypes use the following rules:
about-me: the main topic of this post are the author's long term goals, interests, work experience, motivation for choosing the study programme and future plans;
thesis: posts about a student's bachelor's or master's thesis and progress on it;
end-of-study-reflection: wraping up the whole study before the state exam (státnice/státní závěrečná zkouška/obhajoba/SZZ);
research-result: a research paper or results of applied research; 
opinionated-essay: an essay or a humanities academic text stating an opinion on a topic while citing sources;
content-review: a review of a book, movie, podcast, event, academic article or other content;
course-reflection: a post reflecting one or more courses, what the student learned, what they liked, what they didn't like, what they would change;
tutorial: a post containing instructions or a guide, in steps;
interview: a post containing an interview with someone;
infographics: a short text refering to an image with data visualisation;
creative: a fictional text with artistic intent;
podcast: a short text linking to a podcast episode or sound recording;
study-abroad: a post about a study abroad experience (erasmus, freemover, etc.);
internship: a post about an internship experience (working in a company, library, design firm, agency, or NGOs);`;

type SchemaItem =
  | {
      parameter: string;
      options?: string[];
      comment?: string;
      valueString?: string;
    }
  | undefined;

function printTypeDefinition(keys: SchemaItem[]) {
  const typeDefinition = keys.map((key) => {
    if (!key) return "";
    const { parameter } = key;
    const optionsString = `(${key.options
      ?.map((option) => `${option}`)
      .join(" | ")})[]`;
    return `${key?.comment ? `// ${key?.comment}\n` : ""}${parameter}: ${
      key?.valueString ? key?.valueString : optionsString
    };`;
  });
  typeDefinition.unshift("{");
  typeDefinition.push("}");

  return typeDefinition.join("\n");
}
