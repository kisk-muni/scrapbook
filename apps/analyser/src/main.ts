import { annotate as aiAnnotate } from "./ai-annotation";
import { annotate as regexAnnotate } from "./regex-annotation";
import { rewriteAnnotation } from "./rewrite-annotation";

(async () => {
  const config: {
    annotationType: "ai" | "regex" | "rewrite";
  } = {
    annotationType: "rewrite",
  };
  if (config.annotationType === "ai") await aiAnnotate();
  else if (config.annotationType === "regex") await regexAnnotate();
  else if (config.annotationType === "rewrite") await rewriteAnnotation();
})();
