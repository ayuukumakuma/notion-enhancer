import { describe, expect, it, vi } from "vite-plus/test";
import { JSDOM } from "jsdom";

import {
  createHeadingMarkerController,
  registerHeadingMarker,
  type HeadingMarkerApi,
} from "../lib/notion/heading-marker";

const createDocument = (): Document => {
  const { window } = new JSDOM(
    "<!doctype html><html><head></head><body><main><h1>Title</h1></main></body></html>",
  );

  return window.document;
};

describe("heading marker controller", () => {
  it("adds and removes the style element", () => {
    const document = createDocument();
    const controller = createHeadingMarkerController(document);

    controller.setEnabled(true);
    expect(document.getElementById("notion-enhancer-heading-marker-style")).not.toBeNull();

    controller.setEnabled(false);
    expect(document.getElementById("notion-enhancer-heading-marker-style")).toBeNull();
  });
});

describe("registerHeadingMarker", () => {
  it("applies the stored setting and reacts to storage updates", async () => {
    const document = createDocument();
    const get = vi.fn().mockResolvedValue({ headingMarkerEnabled: true });
    const addListener = vi.fn();
    const removeListener = vi.fn();
    const api: HeadingMarkerApi = {
      storage: {
        local: {
          get,
          set: vi.fn(),
        },
        onChanged: {
          addListener,
          removeListener,
        },
      },
    };

    const dispose = await registerHeadingMarker(api, document);
    expect(document.getElementById("notion-enhancer-heading-marker-style")).not.toBeNull();
    expect(addListener).toHaveBeenCalledTimes(1);

    const handleStorageChange = addListener.mock.calls[0]?.[0] as (
      changes: Record<string, { oldValue?: unknown; newValue?: unknown }>,
      areaName: string,
    ) => void;

    handleStorageChange(
      {
        headingMarkerEnabled: {
          oldValue: true,
          newValue: false,
        },
      },
      "local",
    );

    expect(document.getElementById("notion-enhancer-heading-marker-style")).toBeNull();

    dispose();
    expect(removeListener).toHaveBeenCalledWith(handleStorageChange);
  });
});
