import { annotate as aiAnnotate } from "./ai-annotation";
import { prompt } from "./ai-annotation/prompt";
import { annotate as regexAnnotate } from "./regex-annotation";
import { rewriteAnnotation } from "./rewrite-annotation";

(async () => {
  const config: {
    printPrompt: boolean;
    annotationType: "ai" | "regex" | "rewrite";
  } = {
    printPrompt: true,
    annotationType: "ai",
  };
  if (config.printPrompt) {
    console.log(prompt);
    process.exit(0);
  }
  if (config.annotationType === "ai") await aiAnnotate();
  else if (config.annotationType === "regex") await regexAnnotate();
  else if (config.annotationType === "rewrite") await rewriteAnnotation();
})();
