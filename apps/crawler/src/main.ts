import { PlaywrightCrawler, Dataset, KeyValueStore } from "crawlee";
import router from "./routes";
import { getUrls } from "./get-urls";

// import the browser type itself that we want to use
import { chromium } from "playwright-extra";
import stealthPlugin from "puppeteer-extra-plugin-stealth";
import sql from "./sql";

const config: {
  platforms: ("wordpress" | "notion")[];
  upsertDB: boolean;
  saveSnapshots?: boolean;
} = {
  platforms: ["notion"],
  upsertDB: false,
  //saveSnapshots: false,
};

// tell playwright-extra to use the plugin (or plugins) we want
// stealth is a plugin that makes avoid bot detection
chromium.use(stealthPlugin());

// instance of the PlaywrightCrawler class - a crawler
// that automatically loads the URLs in headless Chrome / Playwright.
const crawler = new PlaywrightCrawler({
  launchContext: {
    launcher: chromium,
    launchOptions: {
      headless: true,
    },
  },
  requestHandler: router,

  // stop crawling after several pages
  /*   maxRequestsPerCrawl:
    process.env.environment !== "production" ? 600 : undefined, */

  // called if the page processing failed more than maxRequestRetries+1 times.
  failedRequestHandler({ request, log }) {
    log.error(`Request ${request.url} failed too many times.`);
  },
});

(async () => {
  const urls = await getUrls(config.platforms);
  await crawler.addRequests(urls);

  const start = performance.now();

  // run the crawler and wait for it to finish.
  await crawler.run();

  const dataset = await Dataset.open();
  await KeyValueStore.setValue("OUTPUT", (await dataset.getData()).items);
  // remove items with duplicate url
  const portfolioPages = (await dataset.getData()).items.filter(
    (item, index, array) => array.findIndex((i) => i.url === item.url) === index
  );
  console.log(`Crawler finished in ${(performance.now() - start) / 1000} s.`);

  // bulk update the database
  // data attributes names are transformed into snake_case from camelCase automatically
  if (config.upsertDB) {
    console.log(`Upserting scraped data to database.`);
    await sql`
    insert into portfolio_pages ${sql(portfolioPages)}
    on conflict (url)
      do update set
        data = excluded.data, updated_at = now()
  `;
    console.log(`Database updated.`);
  }
  process.exit();
})();
