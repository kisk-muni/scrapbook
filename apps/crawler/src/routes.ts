import {
  Dataset,
  createPlaywrightRouter,
  parseOpenGraph,
  Request,
} from "crawlee";
import parsePostContent from "./parse-post-content";

import {
  SimplifiedContent,
  ScrapedPageData,
  SimplifiedElement,
  WordpressPageType,
  wpPageTypes,
  cleanupTitle,
} from "shared";
import { CheerioAPI } from "cheerio";

const router = createPlaywrightRouter();

/* function createUrlRegExp(url: string) {
  // Escape special characters in the URL
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create the RegExp pattern to match the URL
  const pattern = `^${escapedUrl}$`;

  // Create and return the RegExp object
  return new RegExp(pattern);
} */

async function getEntry(request: Request) {
  const url = request.url.startsWith("/")
    ? new URL(request.url, request.userData.portfolioUrl).href
    : request.url;

  return {
    url: url,
    portfolioId: request.userData.portfolioId,
  };
}

async function getMeta(
  $: CheerioAPI,
  _request: Request,
  config?: { getOG: boolean; description?: boolean }
) {
  return {
    title: $("title").text().trim() || null,
    description: config?.description
      ? $("meta[name=description]").attr("content")?.trim()
      : undefined,
    keywords:
      $("meta[name=keywords]")
        .attr("content")
        ?.split(",")
        .map((k) => k.trim()) || [],
    og: config?.getOG ? parseOpenGraph($) : undefined,
  };
}

router.addDefaultHandler(
  async ({ request, log, parseWithCheerio, enqueueLinks }) => {
    log.info(`Reached with default handler ${request.url}...`);
    const $ = await parseWithCheerio();

    // save metadata
    await Dataset.pushData(getMeta($, request));

    await enqueueLinks({
      strategy: "same-hostname",
      // regexps: [createUrlRegExp(request.userData.portfolioUrl)],
      baseUrl: request.userData.portfolioUrl,
      selector: "a",
      label: request.label,
      userData: request.userData,
    });
  }
);

router.addHandler(
  "wordpress",
  async ({
    page,
    request,
    enqueueLinks,
    // saveSnapshot,
    parseWithCheerio,
    log,
  }) => {
    log.info(`Processing ${request.url}...`);
    const $ = await parseWithCheerio();

    // wordpress pages have a body class that indicates the page type
    // we will detect it to save the page type as a metadata
    // docs: https://developer.wordpress.org/reference/functions/get_body_class/
    // filter body classes to get page only the allowed page type classes
    const pageTypes = ($("body")
      .attr("class")
      ?.split(" ")
      .filter((c) => (wpPageTypes as unknown as string[]).includes(c)) ||
      []) as unknown as WordpressPageType[];
    const isSingle = pageTypes.includes("single");
    const isPage = pageTypes.includes("page");

    // initialize post content obj to be filled later and stored as scraped data
    let postContent: SimplifiedContent | undefined = {
      text: null,
      aggregate: {
        charactersCount: null,
        wordsCount: null,
        links: [],
        iframes: [],
        images: [],
        tagsCount: {},
      },
    };

    // wordpress post content may have one of two classes
    let content = $(".entry-content");
    if (!content.length) content = $(".post-content");

    const toParseContent = isPage || (isSingle && content.length);

    // parse post html into simplified tree
    if (toParseContent)
      parsePostContent(
        content[0] as unknown as SimplifiedElement,
        postContent,
        request.userData.portfolioUrl
      );

    // get rest of aggregated data
    if (postContent.text !== null) {
      postContent.aggregate.charactersCount = postContent.text.length;
      const words = postContent.text?.match(/\p{L}+/gu);
      postContent.aggregate.wordsCount = words?.length || null;
    }

    const meta = await getMeta($, request);
    const entry = await getEntry(request);

    /* // cleanup title
    if (meta.title) {
      meta.title = cleanupTitle(meta.title);
    } */

    const published = $("meta[property='article:published_time']")
      .attr("content")
      ?.trim();
    const updated = $("meta[property='article:modified_time']")
      .attr("content")
      ?.trim();

    // merge all scraped data into one object
    const data: ScrapedPageData = {
      ...meta,
      publishedAt: published ? new Date(published).toISOString() : null || null,
      updatedAt: updated ? new Date(updated).toISOString() : null || null,
      platform: "wordpress",
      wordpress: {
        pageTypes: pageTypes,
      },
      simplifiedContent: toParseContent ? postContent : null,
    };

    // save scraped data
    await Dataset.pushData({
      ...entry,
      data,
    });

    // hide ads and popups
    /* try {
      await page.addStyleTag({
        content: `
        html { margin-top: 0!important; scroll-padding-top: 0!important; }
        #marketingbar { display: none!important; }
        #cmp-app-container { display: none!important; }
        .wordads-ad-wrapper { display: none!important; }
        #actionbar { display: none!important; }
      `,
      });
    } catch (error) {
      console.log("Unable to add style tag.");
    }
    const key = request.url.replace(/[:/]/g, "_"); */

    // save screenshot and html
    // await saveSnapshot({ key, saveHtml: true });

    await enqueueLinks({
      selector: "a",
      // pass the same label and user data to the next crawl
      label: request.label,
      userData: request.userData,
      // regexps: [createUrlRegExp(request.userData.portfolioUrl)],
      strategy: "same-hostname",
      baseUrl: request.userData.portfolioUrl,
      // filter out links that redirect to other domains, admin-only pages, etc.
      exclude: [
        /\/wordpress\.com\//,
        /\/wp-admin\//,
        /\/wp-login\.php/,
        /\/wp-content\//,
        /\/wp-includes\//,
        /\?share=/,
        /\?like_comment=/,
        /\?replytocom=/,
        /\?like_comment=/,
      ],
    });
  }
);

router.addHandler(
  "notion",
  async ({
    page,
    request,
    enqueueLinks,
    // saveSnapshot,
    parseWithCheerio,
    log,
  }) => {
    log.info(`Processing ${request.url}...`);

    await page.waitForSelector("a");

    // if notion page
    //   .notion-page-content
    //   .notion-text-block notion-column_list-block notion-toggle-block notion-image-block

    const $ = await parseWithCheerio();
    // save metadata
    const meta = await getMeta($, request, {
      getOG: false,
      description: false,
    });
    const entry = await getEntry(request);
    // initialize post content obj to be filled later and stored as scraped data
    let postContent: SimplifiedContent | undefined = {
      text: null,
      aggregate: {
        charactersCount: null,
        wordsCount: null,
        links: [],
        iframes: [],
        images: [],
        tagsCount: {},
      },
      tree: null,
    };

    // ## notion collection filter
    // data-block-id= .notion-selectable .notion-collection_view_page-block
    // .notion-collection-view-tab-button span
    //
    // ## collection body
    // .notion-scroller .notion-collection-view-body
    //   .notion-table-view
    //     data-block-id= .notion-selectable .notion-collection_view_page-block
    //
    // ## collection view
    // data-block-id= .notion-selectable .notion-collection_view_page-block
    //
    // ## table item
    // data-block-id= .notion-selectable .notion-page-block .notion-collection-item
    //

    // ff3962ff-07d1-4d7b-8aa3-96821a02a2db
    // ff3962ff07d14d7b8aa396821a02a2db

    // locate notion page content
    let content = $(".notion-page-content");

    // parse post html into simplified tree
    if (content.length)
      parsePostContent(
        content[0] as unknown as SimplifiedElement,
        postContent,
        request.userData.portfolioUrl
      );

    // get rest of aggregated data
    if (postContent.text !== null) {
      postContent.aggregate.charactersCount = postContent.text.length;
      const words = postContent.text?.match(/\p{L}+/gu);
      postContent.aggregate.wordsCount = words?.length || null;
    }

    const data: ScrapedPageData = {
      ...meta,
      platform: "notion",
      updatedAt: null,
      publishedAt: null,
      simplifiedContent: content.length ? postContent : null,
    };

    await Dataset.pushData({
      data,
      ...entry,
    });

    // hide ads and popups
    /*     try {
      await page.addStyleTag({
        content: `
        .notion-overlay-container { display: none!important; }
      `,
      });
    } catch (error) {
      console.log("Unable to add style tag.");
    }
    const key = request.url.replace(/[:/]/g, "_"); */

    // save screenshot and html
    // await saveSnapshot({ key, saveHtml: true });

    await enqueueLinks({
      // regexps: [createUrlRegExp(request.userData.portfolioUrl)],
      selector: "a",
      strategy: "same-hostname",
      baseUrl: request.userData.portfolioUrl,
      label: request.label,
      userData: request.userData,
      exclude: [],
    });
  }
);

router.addHandler(
  "wix",
  async ({
    page,
    request,
    enqueueLinks,
    //saveSnapshot,
    parseWithCheerio,
    log,
  }) => {
    log.info(`Processing ${request.url}...`);
    const $ = await parseWithCheerio();

    // save metadata
    await Dataset.pushData(getMeta($, request));

    // hide ads and popups
    try {
      await page.addStyleTag({
        content: `
        #WIX_ADS { display: none!important; }
      `,
      });
    } catch (error) {
      console.log("Unable to add style tag.");
    }
    const key = request.url.replace(/[:/]/g, "_");

    // save screenshot and html
    // await saveSnapshot({ key, saveHtml: true });

    await enqueueLinks({
      // regexps: [createUrlRegExp(request.userData.portfolioUrl)],
      strategy: "same-hostname",
      baseUrl: request.userData.portfolioUrl,
      selector: "a",
      label: request.label,
      userData: request.userData,
    });
  }
);

export default router;
