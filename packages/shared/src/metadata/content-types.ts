export enum ContentType {
  AboutMe = "about-me",
  Thesis = "thesis",
  ContentReview = "content-review",
  Research = "research-result",
  Essay = "opinionated-essay",
  CourseReflection = "course-reflection",
  EndOfStudyReflection = "end-of-study-reflection",
  Tutorial = "tutorial",
  Interview = "interview",
  Infographics = "infographics",
  Internship = "internship",
  Abroad = "study-abroad",
  CreativeWriting = "creative",
  Podcast = "podcast",
}

export const contentTypes: { value: string; label: string }[] = [
  { value: "thesis", label: "Závěrečná diplomová práce" },
  {
    value: "end-of-study-reflection",
    label: "Reflexe studia před státnicí",
  },
  { value: "content-review", label: "Recenze" },
  { value: "research-result", label: "Výzkum" },
  { value: "opinionated-essay", label: "Esej" },
  { value: "course-reflection", label: "Reflexe kurzu" },
  { value: "tutorial", label: "Návod" },
  { value: "interview", label: "Rozhovor" },
  { value: "creative", label: "Kreativní psaní" },
  { value: "infographics", label: "Infografika" },
  { value: "podcast", label: "Podcast" },
  { value: "about-me", label: "O mně" },
  { value: "study-abroad", label: "Studium v zahraničí" },
  { value: "internship", label: "Stáž" },
];

export const contentTypesByValue = contentTypes.reduce((acc, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {} as Record<string, { value: string; label: string }>);
