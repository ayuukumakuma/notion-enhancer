import { useState } from "react";
import { browser } from "wxt/browser";

import { extensionDescription, extensionName } from "../../lib/notion-enhancer-metadata";
import { pingBackground, type NotionEnhancerPongMessage } from "../../lib/notion-enhancer-protocol";

type DiagnosticState =
  | {
      status: "idle" | "loading";
      detail: string;
    }
  | {
      status: "success";
      detail: string;
      response: NotionEnhancerPongMessage;
    }
  | {
      status: "error";
      detail: string;
    };

const initialDiagnosticState: DiagnosticState = {
  status: "idle",
  detail: "必要なら background 接続を確認できます。",
};

const guideSteps = [
  "Notion のページを開く",
  "右上トップバーの「Markdownをコピー」を押す",
  "GitHub や Obsidian にそのまま貼り付ける",
];

const outputHighlights = [
  "見出し、リスト、リンク、コードブロックを Markdown 化",
  "Notion の to-do を task list へ寄せて出力",
  "装飾用の hidden ノードや不要な UI を除外",
];

const formatSuccess = (response: NotionEnhancerPongMessage): string =>
  `Background connected on ${response.browser} / MV${response.manifestVersion}.`;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Background script に接続できませんでした。";
};

const App = () => {
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>(initialDiagnosticState);

  const handleDiagnosticCheck = async (): Promise<void> => {
    setDiagnosticState({
      status: "loading",
      detail: "Background 接続を確認しています…",
    });

    try {
      const response = await pingBackground(browser.runtime);
      setDiagnosticState({
        status: "success",
        detail: formatSuccess(response),
        response,
      });
    } catch (error) {
      setDiagnosticState({
        status: "error",
        detail: getErrorMessage(error),
      });
    }
  };

  return (
    <main className="popup-shell">
      <section className="hero-card">
        <p className="eyebrow">Notion to Markdown</p>
        <h1>{extensionName}</h1>
        <p className="description">{extensionDescription}</p>
        <div className="hero-note">
          ページ上のトップバーボタンから、その場で Markdown をコピーする運用を前提にしています。
        </div>
      </section>

      <section className="info-card">
        <div className="section-heading">
          <p className="section-kicker">Flow</p>
          <h2>使い方</h2>
        </div>
        <ol className="guide-list">
          {guideSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="info-card">
        <div className="section-heading">
          <p className="section-kicker">Output</p>
          <h2>変換の方針</h2>
        </div>
        <ul className="highlight-list">
          {outputHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={`diagnostic-card diagnostic-card--${diagnosticState.status}`}>
        <div className="section-heading">
          <p className="section-kicker">Diagnostic</p>
          <h2>拡張の状態確認</h2>
        </div>
        <p className="diagnostic-detail">{diagnosticState.detail}</p>
        {"response" in diagnosticState ? (
          <dl className="status-meta">
            <div>
              <dt>Browser</dt>
              <dd>{diagnosticState.response.browser}</dd>
            </div>
            <div>
              <dt>Manifest</dt>
              <dd>MV{diagnosticState.response.manifestVersion}</dd>
            </div>
          </dl>
        ) : null}
        <button
          className="secondary-button"
          type="button"
          onClick={() => {
            void handleDiagnosticCheck();
          }}
          disabled={diagnosticState.status === "loading"}
        >
          {diagnosticState.status === "loading" ? "確認中…" : "Background を確認"}
        </button>
      </section>
    </main>
  );
};

export default App;
