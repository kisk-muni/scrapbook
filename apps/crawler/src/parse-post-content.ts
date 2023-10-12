import { customQueryHandlerNames } from "puppeteer";
import { Request } from "crawlee";
import { SimplifiedContent, SimplifiedElement } from "./types/base";

/**
 * Check if URL is relative, if so, compose the return string with baseUrl, otherwise return the url as is.
 */
function normalizeURL(url: string, baseUrl: string) {
  try {
    const normalized = url.startsWith("/") ? new URL(baseUrl + url).href : url;
    return normalized;
  } catch (error) {
    console.log("normalizeURL error", error, url, baseUrl);
  }
  return url;
}

const headingElems = ["h1", "h2", "h3", "h4", "h5", "h6"];
const blockElems = [
  ...["div", "p", "blockquote", "ul", "ol", "quote"],
  ...headingElems,
];

export default function parsePostContent(
  el: SimplifiedElement,
  postContent: SimplifiedContent,
  portfolioUrl: string,
  parent?: string
): SimplifiedElement | null {
  const { tagName, type, attribs, children } = el;
  if (
    attribs?.class &&
    ["wordads-ad-wrapper", "inline-ad-slot"].includes(attribs.class)
  )
    return null;
  if (tagName === "script") return null;
  if (tagName === "style") return null;
  const chlds = (children as SimplifiedElement[])
    ?.map((c) =>
      parsePostContent(
        c,
        postContent,
        portfolioUrl,
        tagName ? tagName : undefined
      )
    )
    .filter((c) => c !== null) as SimplifiedElement[];
  const containsText =
    chlds?.some((c) => c.text !== null || c.containsText) ||
    (type === "text" && (el as unknown as Text).data != null);
  if (tagName)
    postContent.aggregate.tagsCount[tagName] =
      (postContent.aggregate.tagsCount[tagName] || 0) + 1;
  if (tagName === "a" && attribs?.href)
    postContent.aggregate.links.push(normalizeURL(attribs.href, portfolioUrl));
  if (tagName === "iframe" && attribs?.src && attribs?.src.includes("notion"))
    postContent.aggregate.iframes.push(normalizeURL(attribs.src, portfolioUrl));
  if (tagName === "img" && attribs?.src)
    postContent.aggregate.iframes.push(normalizeURL(attribs.src, portfolioUrl));
  if (blockElems.includes(tagName) && !blockElems.includes(parent)) {
    postContent.text += "\n\n";
  }
  if (["li"].includes(tagName)) {
    postContent.text += "\n- ";
  }
  if (type === "text" && (el as unknown as Text).data != null) {
    if (postContent.text === null) postContent.text = "";
    postContent.text += (el as unknown as Text).data.trim();
  }
  delete attribs?.style;
  if (!containsText) return null;
  return {
    tagName,
    type,
    attribs,
    text: (el as unknown as Text).data,
    children: chlds?.filter((c) => c.containsText),
    containsText,
  };
}
