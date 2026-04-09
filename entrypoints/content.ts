import { extractPageMarkdown } from "../lib/notion/markdown-extractor";

const BUTTON_ID = "notion-enhancer-copy-md-btn";
const INJECT_SELECTOR = ".notion-topbar-action-buttons, .notion-topbar__action-buttons";

type ButtonState = "idle" | "copying" | "success" | "extract-error" | "clipboard-error";

const BUTTON_LABELS: Record<ButtonState, string> = {
  idle: "Markdownをコピー",
  copying: "Markdownを抽出中…",
  success: "コピー完了",
  "extract-error": "抽出できませんでした",
  "clipboard-error": "コピーに失敗しました",
};

const BUTTON_TITLES: Record<ButtonState, string> = {
  idle: "このページの内容をMarkdownとしてクリップボードにコピー",
  copying: "ページ内容をMarkdownへ変換しています",
  success: "Markdownをクリップボードへコピーしました",
  "extract-error": "ページ内のNotionコンテンツを抽出できませんでした",
  "clipboard-error": "クリップボードへの書き込みに失敗しました",
};

const BUTTON_STYLE = {
  idle: {
    background: "rgba(255, 255, 255, 0.74)",
    borderColor: "rgba(55, 53, 47, 0.16)",
    color: "#2f3437",
  },
  copying: {
    background: "rgba(35, 131, 226, 0.12)",
    borderColor: "rgba(35, 131, 226, 0.35)",
    color: "#175b98",
  },
  success: {
    background: "rgba(15, 123, 108, 0.12)",
    borderColor: "rgba(15, 123, 108, 0.28)",
    color: "#0f6b5f",
  },
  "extract-error": {
    background: "rgba(224, 98, 80, 0.12)",
    borderColor: "rgba(224, 98, 80, 0.28)",
    color: "#b23d2f",
  },
  "clipboard-error": {
    background: "rgba(224, 98, 80, 0.12)",
    borderColor: "rgba(224, 98, 80, 0.28)",
    color: "#b23d2f",
  },
} satisfies Record<ButtonState, { background: string; borderColor: string; color: string }>;

const applyButtonState = (button: HTMLButtonElement, state: ButtonState): void => {
  const style = BUTTON_STYLE[state];

  button.dataset.state = state;
  button.textContent = BUTTON_LABELS[state];
  button.title = BUTTON_TITLES[state];
  button.disabled = state === "copying";
  button.style.background = style.background;
  button.style.borderColor = style.borderColor;
  button.style.color = style.color;
};

const createCopyButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  let resetTimer: number | undefined;

  button.id = BUTTON_ID;
  button.type = "button";
  button.style.cssText = [
    "margin-left: 8px",
    "padding: 6px 12px",
    "border: 1px solid rgba(55,53,47,0.16)",
    "border-radius: 999px",
    "background: rgba(255,255,255,0.74)",
    "color: #2f3437",
    "font-size: 13px",
    "font-weight: 600",
    "line-height: 1.2",
    "cursor: pointer",
    "white-space: nowrap",
    "transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease, opacity 120ms ease",
  ].join(";");

  const queueReset = (): void => {
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      applyButtonState(button, "idle");
    }, 2200);
  };

  button.addEventListener("mouseenter", () => {
    if (button.dataset.state === "idle") {
      button.style.background = "rgba(255, 255, 255, 0.92)";
    }
  });

  button.addEventListener("mouseleave", () => {
    if (button.dataset.state === "idle") {
      button.style.background = BUTTON_STYLE.idle.background;
    }
  });

  button.addEventListener("click", async () => {
    applyButtonState(button, "copying");

    const result = extractPageMarkdown();
    if (!result.success) {
      applyButtonState(button, "extract-error");
      queueReset();
      return;
    }

    try {
      await navigator.clipboard.writeText(result.markdown);
      applyButtonState(button, "success");
    } catch {
      applyButtonState(button, "clipboard-error");
    }

    queueReset();
  });

  applyButtonState(button, "idle");

  return button;
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

  window.setTimeout(() => observer.disconnect(), 15_000);
};

export default defineContentScript({
  matches: ["https://www.notion.so/*", "https://*.notion.site/*"],
  runAt: "document_idle",
  main() {
    observeAndInject();

    document.addEventListener("turbo:load", observeAndInject);
    window.addEventListener("popstate", () => {
      window.setTimeout(observeAndInject, 500);
    });
  },
});
