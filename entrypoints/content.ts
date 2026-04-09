import { extractPageMarkdown } from "../lib/notion/markdown-extractor";

const BUTTON_ID = "notion-enhancer-copy-md-btn";
const INJECT_SELECTOR = ".notion-topbar-action-buttons, .notion-topbar__action-buttons";

const createCopyButton = (): HTMLButtonElement => {
  const btn = document.createElement("button");
  btn.id = BUTTON_ID;
  btn.textContent = "MD コピー";
  btn.title = "ページ内容を Markdown としてクリップボードにコピー";
  btn.style.cssText = [
    "margin-left: 8px",
    "padding: 4px 10px",
    "border: 1px solid rgba(55,53,47,0.35)",
    "border-radius: 4px",
    "background: transparent",
    "color: inherit",
    "font-size: 14px",
    "cursor: pointer",
    "white-space: nowrap",
  ].join(";");

  btn.addEventListener("mouseenter", () => {
    btn.style.background = "rgba(55,53,47,0.08)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.background = "transparent";
  });

  btn.addEventListener("click", async () => {
    const result = extractPageMarkdown();
    if (!result.success) {
      btn.textContent = "❌ 失敗";
      setTimeout(() => {
        btn.textContent = "MD コピー";
      }, 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(result.markdown);
      btn.textContent = "✅ コピー完了";
    } catch {
      btn.textContent = "❌ 失敗";
    }

    setTimeout(() => {
      btn.textContent = "MD コピー";
    }, 2000);
  });

  return btn;
};

const injectButton = (): boolean => {
  if (document.getElementById(BUTTON_ID)) return true;

  const toolbar = document.querySelector(INJECT_SELECTOR);
  if (!toolbar) return false;

  toolbar.appendChild(createCopyButton());
  return true;
};

const observeAndInject = (): void => {
  if (injectButton()) return;

  const observer = new MutationObserver(() => {
    if (injectButton()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => observer.disconnect(), 15_000);
};

export default defineContentScript({
  matches: ["https://www.notion.so/*", "https://*.notion.site/*"],
  runAt: "document_idle",
  main() {
    observeAndInject();

    document.addEventListener("turbo:load", observeAndInject);
    document.addEventListener("popstate", () => {
      setTimeout(observeAndInject, 500);
    });
  },
});
