import { useState } from "react";
import { browser } from "wxt/browser";

import { extensionDescription, extensionName } from "../../lib/notion-enhancer-metadata";
import { pingBackground, type NotionEnhancerPongMessage } from "../../lib/notion-enhancer-protocol";

type PingState =
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

const initialState: PingState = {
  status: "idle",
  detail:
    "Notion のページを開いてトップバーの「MD コピー」ボタンを使うとページ内容を Markdown でコピーできます。",
};

const formatSuccess = (response: NotionEnhancerPongMessage): string =>
  `Connected to ${response.browser} (MV${response.manifestVersion}).`;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "The popup could not reach the background script.";
};

const getButtonLabel = (status: PingState["status"]): string => {
  if (status === "loading") {
    return "Connecting...";
  }

  return "Ping background";
};

const renderResponse = (state: PingState) => {
  if (!("response" in state)) {
    return undefined;
  }

  return (
    <dl className="status__meta">
      <div>
        <dt>Browser</dt>
        <dd>{state.response.browser}</dd>
      </div>
      <div>
        <dt>Manifest</dt>
        <dd>MV{state.response.manifestVersion}</dd>
      </div>
    </dl>
  );
};

const App = () => {
  const [state, setState] = useState<PingState>(initialState);

  const handlePing = async (): Promise<void> => {
    setState({
      status: "loading",
      detail: "Checking the background connection...",
    });

    try {
      const response = await pingBackground(browser.runtime);
      setState({
        status: "success",
        detail: formatSuccess(response),
        response,
      });
    } catch (error) {
      setState({
        status: "error",
        detail: getErrorMessage(error),
      });
    }
  };

  return (
    <main className="popup-shell">
      <section className="card">
        <p className="eyebrow">Notion Enhancer</p>
        <h1>{extensionName}</h1>
        <p className="description">{extensionDescription}</p>
        <div className={`status status--${state.status}`}>
          <span className="status__label">Status</span>
          <p>{state.detail}</p>
          {renderResponse(state)}
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => {
            void handlePing();
          }}
          disabled={state.status === "loading"}
        >
          {getButtonLabel(state.status)}
        </button>
      </section>
    </main>
  );
};

export default App;
