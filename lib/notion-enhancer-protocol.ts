export const notionEnhancerPingType = "notion-enhancer:ping";
export const notionEnhancerPongType = "notion-enhancer:pong";

export interface NotionEnhancerPingMessage {
  type: typeof notionEnhancerPingType;
}

export interface NotionEnhancerPongMessage {
  type: typeof notionEnhancerPongType;
  browser: string;
  manifestVersion: number;
}

interface RuntimeMessenger {
  sendMessage: (message: NotionEnhancerPingMessage) => Promise<unknown>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && Object(value) === value;

export const createPingMessage = (): NotionEnhancerPingMessage => ({
  type: notionEnhancerPingType,
});

export const createPongMessage = (
  browser: string,
  manifestVersion: number,
): NotionEnhancerPongMessage => ({
  type: notionEnhancerPongType,
  browser,
  manifestVersion,
});

export const isPingMessage = (value: unknown): value is NotionEnhancerPingMessage =>
  isRecord(value) && value.type === notionEnhancerPingType;

export const isPongMessage = (value: unknown): value is NotionEnhancerPongMessage =>
  isRecord(value) &&
  value.type === notionEnhancerPongType &&
  typeof value.browser === "string" &&
  typeof value.manifestVersion === "number";

export const pingBackground = async (
  runtime: RuntimeMessenger,
): Promise<NotionEnhancerPongMessage> => {
  const response = await runtime.sendMessage(createPingMessage());

  if (!isPongMessage(response)) {
    throw new Error("Unexpected response from the background script.");
  }

  return response;
};
