import { getPortfolioPages } from "../get-pages";
import OpenAI from "openai";
import {
  supabase,
  ScrapedPageAnnotationSchema,
  cleanupTitle,
  findCourses,
  ScrapedPageData,
  FullScrapedPageAnnotation,
} from "shared";
import { prompt } from "./prompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Page = {
  id: string;
  url: string;
  scraped_data: ScrapedPageData | null | undefined;
  text: string | null | undefined;
  data: FullScrapedPageAnnotation | null;
};

export async function annotate() {
  const annotatePage = async (page: Page) => {
    const { id, text, scraped_data, url } = page;
    const title = page.data?.title
      ? page.data.title
      : scraped_data?.title
      ? cleanupTitle(scraped_data?.title)
      : undefined;
    if (!text) {
      return { success: false, message: "No text to annotate" };
    }
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: title + " " + text?.slice(0, 15000 - prompt.length),
        },
      ],
      model: "gpt-3.5-turbo-16k",
      temperature: 0.2, // should make predictions more deterministic
    });

    const openaiResponse = completion.choices[0].message.content || null;

    try {
      if (!openaiResponse) throw new Error("No response from OpenAI");
      const parsed = ScrapedPageAnnotationSchema.parse(
        JSON.parse(openaiResponse)
      );
      const regexAnnotation: {
        courses?: string[];
        title?: string;
      } = {
        courses: page.data?.courses ? page.data.courses : findCourses(text),
      };
      if (title) regexAnnotation.title = title;

      const data = {
        data: {
          ...page.data,
          ...parsed,
          ...regexAnnotation,
        },
        ai_annotation: parsed,
        annotated_at: new Date().toISOString(),
      };
      await supabase.from("portfolio_pages").update(data).eq("id", id);
      return { success: true, url: page.url };
    } catch (error: unknown) {
      await supabase
        .from("portfolio_pages")
        .update({
          ai_annotation: { failed: true },
          annotated_at: new Date().toISOString(),
        })
        .eq("id", id);
      let message = "";
      if (typeof error === "string") message = error;
      else if (error instanceof Error) message = error.message;
      else if (error instanceof Object) message = JSON.stringify(error);
      const errorLog = {
        page_id: id,
        page_url: page.url,
      };
      //await supabase.from("ai_annotation_log").insert(errorLog);
      return { success: false, ...errorLog };
    }
  };

  const annotatePages = async (
    list: Page[]
  ): Promise<{ success: boolean }[]> => {
    const annotations: { success: boolean }[] = [];

    const annotationPromises = list.map(async (page, i) => {
      const result = await annotatePage(page);
      annotations.push(result); // Collect the result
      console.log(result);
    });

    // run on parallel
    await Promise.all(annotationPromises);

    return annotations;
  };

  // check if await getPortfolioPages returns array of length > 0, if so, call await annotatePages on the first 100 pages
  // repeat until all pages are annotated, wait 1 minute between each call
  while (true) {
    const pages = await getPortfolioPages({ aiAnnotation: true });
    if (pages.length > 0) {
      console.log(`${pages.length} more pages to annotate`);
      const forstats = await annotatePages(pages?.slice(0, 3));
      const stats = await forstats.reduce(
        (acc, curr) => {
          if (curr?.success) acc.success++;
          if (!curr?.success) acc.error++;
          return acc;
        },
        { success: 0, error: 0 }
      );
      console.info(stats);
      console.info("Done with this batch");
    } else {
      console.info("No pages to annotate");
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  console.info("Done");
}
