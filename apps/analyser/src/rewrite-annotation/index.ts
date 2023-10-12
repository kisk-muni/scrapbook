import { getPortfolioPages } from "../get-pages";
import { supabase } from "shared";
import { findCourses, cleanupTitle } from "shared";

export async function rewriteAnnotation() {
  const pages = await getPortfolioPages({ rewriteAnnotation: true });
  console.info(`Running on ${pages.length} pages`);
  const runLog = await pages.map(async (page) => {
    const { id, text, url, scraped_data: scraped, ai_annotation } = page;
    try {
      const title = scraped?.title ? cleanupTitle(scraped?.title) : url;
      const courses = findCourses(title + " " + text);
      const annotationData = (ai_annotation as unknown as { data: any })?.data;
      const rowUpdate = {
        ai_annotation: { ...annotationData },
        data: { ...annotationData, title, courses },
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
  console.log(result);
  console.info("Done");
}
