import {
  supabase,
  ScrapedPageData,
  ScrapedPageAnnotation,
  FullScrapedPageAnnotation,
} from "shared";

export async function getPortfolioPages(options: {
  aiAnnotation?: boolean;
  regexAnnotation?: boolean;
  rewriteAnnotation?: boolean;
  max?: number;
}) {
  let query = supabase.from("portfolio_pages").select(
    `
      id,
      url,
      scraped_data, 
      ai_annotation,
      data
      `
  );
  if (options.aiAnnotation) {
    query = query
      .or("ai_annotation.is.null")
      .not("scraped_data", "is", null)
      .not("scraped_data->simplifiedContent", "is", null)
      .not("scraped_data->simplifiedContent->text", "is", null);
    // .not("ai_annotation->failed", "is", null);
    //.eq("scraped_data->wordpress->>pageTypes", "page");
  }
  if (options.regexAnnotation) {
    query = query.is("data", null);
  }
  if (options.rewriteAnnotation) {
    console.log("rewriteAnnotation is active");
    query = query.not("ai_annotation->data", "is", null);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message);

  // for some reason, the editor doesn't recognize the type of data,
  // when supabase is provided the merged datatype from shared’s schema
  const pages = data as unknown as {
    id: string;
    url: string;
    scraped_data?: ScrapedPageData | null;
    data: FullScrapedPageAnnotation | null;
    ai_annotation?: ScrapedPageAnnotation | null;
  }[];

  return (
    pages
      .filter((page) => {
        // filter out pages where the url contains cernyedtech or solcovad substring
        return (
          !page.url.includes("cernyedtech") && !page.url.includes("solcovad")
        );
      })
      .filter((page) => {
        if (
          options.aiAnnotation &&
          ((page.scraped_data?.platform === "wordpress" &&
            page.scraped_data?.wordpress?.pageTypes?.includes("single")) ||
            ![
              "https://denisawalterova.wordpress.com/2020/06/03/moje-timeline/",
              "https://michaelastenclova.wordpress.com/kisk-2/",
              "https://sarkamatouskova.wordpress.com/pracuji/",
              "https://pavelkovaportfolio.wordpress.com/ostatni/digitalni-kolekce/2/",
              "https://ivanovaal.wordpress.com/tvorba/",
              "https://abulvova.wordpress.com/contact/",
              "https://gerstnerovajana.wordpress.com/contact/",
              "https://wp447937.wordpress.com/contact/",
            ].includes(page.url))
        )
          return true;
        if (options.regexAnnotation) return true;
        return false;
      })
      /* .filter((page) => {
      return page.scraped_data?.platform == "wordpress"
        ? page.scraped_data.wordpress?.pageTypes.includes("single")
        : false;
    }) */
      .map((page) => {
        return {
          id: page.id,
          url: page.url,
          scraped_data: page.scraped_data,
          text: page.scraped_data?.simplifiedContent?.text,
          data: page.data,
          ai_annotation: page.ai_annotation,
        };
      })
      .slice(0, options.max ? options.max : undefined)
  );
}
