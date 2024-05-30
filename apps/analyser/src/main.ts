import { annotate as aiAnnotate } from "./ai-annotation";
import { prompt } from "./ai-annotation/prompt";
import { annotate as regexAnnotate } from "./regex-annotation";
import { rewriteAnnotation } from "./rewrite-annotation";

(async () => {
  const config: {
    printPrompt: boolean;
    annotationType: "ai" | "regex" | "rewrite";
  } = {
    printPrompt: false,
    annotationType: "ai",
  };
  if (config.printPrompt) {
    console.log(prompt);
    process.exit(0);
  }
  // updates ai_annotation based on scraped_data, does not touch scraped_data
  if (config.annotationType === "ai") await aiAnnotate();
  // updates data based on scraped_data, does not touch scraped_data
  else if (config.annotationType === "regex") await regexAnnotate();
  // opens up ->ai_annotation.data and stores it in root of ->ai_annotation
  else if (config.annotationType === "rewrite") await rewriteAnnotation();
})();
