import { courses } from "../courses";

export function findCourses(text: string) {
  const foundCourses = courses.reduce((acc, curr) => {
    const { code, title } = curr;
    const regex = new RegExp(`(${code}|${title})`, "gi");
    const matches = text.match(regex);
    if (matches) {
      acc.push(code);
    }
    return acc;
  }, [] as string[]);
  return foundCourses;
}

export function cleanupTitle(originalTitle: string) {
  return originalTitle ? originalTitle.split(/[-|–]/)[0].trim() : originalTitle;
}
