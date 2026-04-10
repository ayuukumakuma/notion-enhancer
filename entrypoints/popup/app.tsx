import { useEffect, useState } from "react";
import { browser } from "wxt/browser";

import {
  getCopyMarkdownButtonEnabled,
  getHeadingMarkerEnabled,
  setCopyMarkdownButtonEnabled,
  setHeadingMarkerEnabled,
} from "../../lib/notion-enhancer-settings";
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

type ToggleSettingStatus = "loading" | "ready" | "saving" | "error";

interface ToggleSettingState {
  status: ToggleSettingStatus;
  enabled: boolean;
  detail: string;
}

interface ToggleCardProps {
  title: string;
  kicker: string;
  enabledLabel: string;
  disabledLabel: string;
  switchLabel: string;
  state: ToggleSettingState;
  onToggle: () => void;
}

const formatSuccess = (response: NotionEnhancerPongMessage): string =>
  `Background connected on ${response.browser} / MV${response.manifestVersion}.`;

const createHeadingMarkerDetail = (enabled: boolean): string =>
  enabled
    ? "見出しマーカーは有効です。現在の Notion タブにもすぐ反映されます。"
    : "見出しマーカーは無効です。現在の Notion タブからもすぐ非表示になります。";

const createCopyMarkdownButtonDetail = (enabled: boolean): string =>
  enabled
    ? "コピーボタンは有効です。現在の Notion タブにもすぐ反映されます。"
    : "コピーボタンは無効です。現在の Notion タブからもすぐ非表示になります。";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Background script に接続できませんでした。";
};

const ToggleCard = ({
  title,
  kicker,
  enabledLabel,
  disabledLabel,
  switchLabel,
  state,
  onToggle,
}: ToggleCardProps) => {
  return (
    <section className={`toggle-card toggle-card--${state.status}`}>
      <div className="section-heading">
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <p className="diagnostic-detail">{state.detail}</p>
      <label className="toggle-row">
        <span className="toggle-copy">{state.enabled ? enabledLabel : disabledLabel}</span>
        <button
          className="toggle-button"
          type="button"
          role="switch"
          aria-checked={state.enabled}
          aria-label={switchLabel}
          onClick={onToggle}
          disabled={state.status === "loading" || state.status === "saving"}
        >
          <span className="toggle-button__track">
            <span className="toggle-button__thumb" />
          </span>
        </button>
      </label>
    </section>
  );
};

const App = () => {
  const [diagnosticState, setDiagnosticState] = useState<DiagnosticState>(initialDiagnosticState);
  const [copyMarkdownButtonState, setCopyMarkdownButtonState] = useState<ToggleSettingState>({
    status: "loading",
    enabled: true,
    detail: "コピーボタン設定を読み込んでいます…",
  });
  const [headingMarkerState, setHeadingMarkerState] = useState<ToggleSettingState>({
    status: "loading",
    enabled: true,
    detail: "見出しマーカー設定を読み込んでいます…",
  });

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async (): Promise<void> => {
      try {
        const [copyMarkdownButtonEnabled, headingMarkerEnabled] = await Promise.all([
          getCopyMarkdownButtonEnabled(browser.storage.local),
          getHeadingMarkerEnabled(browser.storage.local),
        ]);
        if (!isMounted) {
          return;
        }

        setCopyMarkdownButtonState({
          status: "ready",
          enabled: copyMarkdownButtonEnabled,
          detail: createCopyMarkdownButtonDetail(copyMarkdownButtonEnabled),
        });
        setHeadingMarkerState({
          status: "ready",
          enabled: headingMarkerEnabled,
          detail: createHeadingMarkerDetail(headingMarkerEnabled),
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCopyMarkdownButtonState({
          status: "error",
          enabled: true,
          detail: getErrorMessage(error),
        });
        setHeadingMarkerState({
          status: "error",
          enabled: true,
          detail: getErrorMessage(error),
        });
      }
    };

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleHeadingMarkerToggle = async (): Promise<void> => {
    const nextEnabled = !headingMarkerState.enabled;

    setHeadingMarkerState({
      status: "saving",
      enabled: nextEnabled,
      detail: "見出しマーカー設定を保存しています…",
    });

    try {
      await setHeadingMarkerEnabled(browser.storage.local, nextEnabled);
      setHeadingMarkerState({
        status: "ready",
        enabled: nextEnabled,
        detail: createHeadingMarkerDetail(nextEnabled),
      });
    } catch (error) {
      setHeadingMarkerState({
        status: "error",
        enabled: !nextEnabled,
        detail: getErrorMessage(error),
      });
    }
  };

  const handleCopyMarkdownButtonToggle = async (): Promise<void> => {
    const nextEnabled = !copyMarkdownButtonState.enabled;

    setCopyMarkdownButtonState({
      status: "saving",
      enabled: nextEnabled,
      detail: "コピーボタン設定を保存しています…",
    });

    try {
      await setCopyMarkdownButtonEnabled(browser.storage.local, nextEnabled);
      setCopyMarkdownButtonState({
        status: "ready",
        enabled: nextEnabled,
        detail: createCopyMarkdownButtonDetail(nextEnabled),
      });
    } catch (error) {
      setCopyMarkdownButtonState({
        status: "error",
        enabled: !nextEnabled,
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
          トップバーの Markdown コピーと、見出しマーカーの ON/OFF をここから管理できます。
        </div>
      </section>

      <ToggleCard
        title="Markdown コピーボタン"
        kicker="Copy Button"
        enabledLabel="コピーボタン: ON"
        disabledLabel="コピーボタン: OFF"
        switchLabel="コピーボタンを切り替える"
        state={copyMarkdownButtonState}
        onToggle={() => {
          void handleCopyMarkdownButtonToggle();
        }}
      />

      <ToggleCard
        title="見出しマーカー"
        kicker="Heading Marker"
        enabledLabel="見出しマーカー: ON"
        disabledLabel="見出しマーカー: OFF"
        switchLabel="見出しマーカーを切り替える"
        state={headingMarkerState}
        onToggle={() => {
          void handleHeadingMarkerToggle();
        }}
      />

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
