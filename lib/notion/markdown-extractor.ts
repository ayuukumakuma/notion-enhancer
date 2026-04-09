import TurndownService from "turndown";

const NOTION_PAGE_SELECTORS = [
  ".notion-page-content",
  '[data-block-id][class*="notion-"][class*="-block"]',
  ".notion-scroller.vertical",
];

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

turndown.addRule("notionCheckbox", {
  filter: (node) => node.nodeName === "INPUT" && (node as HTMLInputElement).type === "checkbox",
  replacement: (_content, node) => ((node as HTMLInputElement).checked ? "[x] " : "[ ] "),
});

const findPageContent = (doc: Document): Element | null => {
  for (const selector of NOTION_PAGE_SELECTORS) {
    const el = doc.querySelector(selector);
    if (el) return el;
  }
  return null;
};

export type ExtractResult = { success: true; markdown: string } | { success: false; error: string };

export const extractPageMarkdown = (doc: Document = document): ExtractResult => {
  const content = findPageContent(doc);
  if (!content) {
    return {
      success: false,
      error:
        "Notion のページコンテンツが見つかりませんでした。ページを開いた状態で実行してください。",
    };
  }

  const html = content.innerHTML;
  const markdown = turndown.turndown(html).trim();

  if (!markdown) {
    return { success: false, error: "ページにコンテンツがありません。" };
  }

  return { success: true, markdown };
};
