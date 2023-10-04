import { Parser } from "next-usequerystate";
import { Item } from "./index";

export function urlSelectParser<X extends Item>(
  possibleValues: X[],
  separator = "-"
): Parser<X[]> {
  return {
    parse: (query: string) => {
      if (query === "") return null;
      return query
        .split(separator)
        .map((value) => {
          const item = possibleValues?.find((i) => i.value === value);
          if (item) return item;
          return;
        })
        .filter((v) => v !== undefined) as X[];
    },
    serialize: (values: X[]) => values.map((v) => v.value).join(separator),
  };
}

export function urlStringParser(): Parser<string | null> {
  return {
    parse: (query: string) => (query === "" ? null : query),
    serialize: (value: string | null) => `${value}`,
  };
}

export function urlBooleanParser(): Parser<boolean> {
  return {
    parse: (query: string) => query === "true",
    serialize: (value: boolean) => (value ? "true" : "false"),
  };
}
