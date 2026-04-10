import { browser } from "wxt/browser";

import {
  createCopyMarkdownButtonController,
  registerCopyMarkdownButton,
} from "../lib/notion/copy-markdown-button";
import { registerHeadingMarker } from "../lib/notion/heading-marker";

export default defineContentScript({
  matches: ["https://www.notion.so/*", "https://*.notion.site/*"],
  runAt: "document_idle",
  main() {
    const copyMarkdownButtonController = createCopyMarkdownButtonController();

    void registerCopyMarkdownButton(browser, copyMarkdownButtonController);
    void registerHeadingMarker(browser);

    document.addEventListener("turbo:load", () => {
      copyMarkdownButtonController.refresh();
    });
    window.addEventListener("popstate", () => {
      window.setTimeout(() => {
        copyMarkdownButtonController.refresh();
      }, 500);
    });
  },
});
