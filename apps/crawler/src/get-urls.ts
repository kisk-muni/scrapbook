import { Request, RequestOptions } from "crawlee";
import { supabase } from "shared";

export async function getUrls(
  platforms: string[]
): Promise<(string | Request | RequestOptions)[]> {
  const { data, error } = await supabase.from("portfolios").select(`
      id, 
      platform,
      url
    `);

  if (error) {
    console.error(error);
    throw new Error("Error fetching data from Supabase");
  }

  const urls = data
    .filter(
      (item) => item.url !== null && platforms.includes(item.platform as string)
    )
    .map((item) => {
      return {
        url: item.url,
        label: item.platform,
        userData: { platform: item.platform, portfolioId: item.id },
      };
    }) as {
    url: string;
    label: string;
    userData: { platform: string; portfolioId: string };
  }[];

  return urls;
}
