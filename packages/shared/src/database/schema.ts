// import type { MergeDeep } from "type-fest";
import type { Database as DatabaseGenerated } from "./schema-generated";
/* import { ScrapedPageData } from "../metadata/scrape";
import { ScrapedPageAnnotation } from "../metadata/annotation"; */

/* export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        portfolio_pages: {
          Row: {
            scraped_data?: ScrapedPageData | null;
            ai_annotation?: ScrapedPageAnnotation | null;
          };
          Insert: {
            scraped_data?: ScrapedPageData | null;
            ai_annotation?: ScrapedPageAnnotation | null;
          };
          Update: {
            scraped_data?: ScrapedPageData | null;
            ai_annotation?: ScrapedPageAnnotation | null;
          };
        };
      };
      Functions: {
        search_pages: {
          Returns: {
            id: string;
            title: string;
            url: string;
            published_at: string;
            courses: string[];
            content_types: string[];
            profilations: string[];
            tones: string[];
            dominant_language: string;
            portfolios: DatabaseGenerated["public"]["Tables"]["portfolios"]["Row"] & {
              profiles: DatabaseGenerated["public"]["Tables"]["profiles"]["Row"];
            };
          };
        };
      };
    };
  }
>; */

export type Tables<T extends keyof DatabaseGenerated["public"]["Tables"]> =
  DatabaseGenerated["public"]["Tables"][T]["Row"];

export type Functions<
  T extends keyof DatabaseGenerated["public"]["Functions"]
> = DatabaseGenerated["public"]["Functions"][T];

export type SearchPages = {
  Args: DatabaseGenerated["public"]["Functions"]["search_pages"]["Args"];
  Returns: {
    filtered_portfolio_pages: {
      counts: {
        filter_period_begin: string | null;
        sum: string;
      }[];
      data: {
        id: string;
        title: string;
        url: string;
        published_at: string;
        description: string;
        courses: string[];
        content_types: string[];
        categories: string[];
        tones: string[];
        dominant_language: string;
        portfolios: {
          analytics_access: boolean | null;
          full_name: string | null;
          id: string;
          is_public: boolean;
          study_start_semester_kind: string | null;
          study_start_semester_year: number | null;
          updated_at: string | null;
          username: string | null;
          image_url: string | null;
          profiles: {
            analytics_access: boolean | null;
            full_name: string | null;
            id: string;
            is_public: boolean;
            study_start_semester_kind: string | null;
            study_start_semester_year: number | null;
            updated_at: string | null;
            username: string | null;
          };
        };
      }[];
    };
  }[];
};
