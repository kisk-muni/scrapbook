import { getPortfolioPages } from "../get-pages";
import { supabase } from "shared";
import { findCourses, cleanupTitle } from "shared";

export async function annotate() {
  const pages = await getPortfolioPages({ regexAnnotation: true, max: 500 });
  console.info(`Running on ${pages.length} pages`);
  const runLog = await pages.map(async (page) => {
    const { id, text, data, url, scraped_data: scraped } = page;
    try {
      const title = scraped?.title ? cleanupTitle(scraped?.title) : url;
      console.log(
        `text is not null or undefined: ${text !== null && text !== undefined}`
      );
      const courses = findCourses(title + " " + text);
      // console.log(`Courses found: ${courses.length}`);
      const rowUpdate = {
        data: { ...data, title, courses },
      };
      await supabase.from("portfolio_pages").update(rowUpdate).eq("id", id);
      return { success: true };
    } catch (error: unknown) {
      console.error(error);
      let message = "";
      if (typeof error === "string") message = error;
      else if (error instanceof Error) message = error.message;
      else if (error instanceof Object) message = JSON.stringify(error);
      const errorLog = {
        page_id: id,
        page_url: page.url,
        message,
      };
      return { success: false, ...errorLog };
    }
  });
  const result = await Promise.all(runLog);
  const stats = await result.reduce(
    (acc, curr) => {
      if (curr?.success) acc.success++;
      if (!curr?.success) acc.error++;
      return acc;
    },
    { success: 0, error: 0 }
  );
  console.info(stats);
  console.info("Done");
}
