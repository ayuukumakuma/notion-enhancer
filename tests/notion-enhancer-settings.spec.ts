import { describe, expect, it, vi } from "vite-plus/test";

import {
  copyMarkdownButtonEnabledStorageKey,
  defaultNotionEnhancerSettings,
  getCopyMarkdownButtonEnabled,
  getCopyMarkdownButtonEnabledFromChanges,
  getHeadingMarkerEnabled,
  getHeadingMarkerEnabledFromChanges,
  headingMarkerEnabledStorageKey,
  setCopyMarkdownButtonEnabled,
  setHeadingMarkerEnabled,
} from "../lib/notion-enhancer-settings";

describe("notion enhancer settings", () => {
  it("reads the default heading marker setting when storage is empty", async () => {
    const get = vi.fn().mockResolvedValue({});

    await expect(getHeadingMarkerEnabled({ get, set: vi.fn() })).resolves.toBe(
      defaultNotionEnhancerSettings.headingMarkerEnabled,
    );
    expect(get).toHaveBeenCalledWith({
      [headingMarkerEnabledStorageKey]: defaultNotionEnhancerSettings.headingMarkerEnabled,
    });
  });

  it("writes the heading marker setting", async () => {
    const set = vi.fn().mockResolvedValue(undefined);

    await setHeadingMarkerEnabled({ get: vi.fn(), set }, false);

    expect(set).toHaveBeenCalledWith({
      [headingMarkerEnabledStorageKey]: false,
    });
  });

  it("reads the default copy button setting when storage is empty", async () => {
    const get = vi.fn().mockResolvedValue({});

    await expect(getCopyMarkdownButtonEnabled({ get, set: vi.fn() })).resolves.toBe(
      defaultNotionEnhancerSettings.copyMarkdownButtonEnabled,
    );
    expect(get).toHaveBeenCalledWith({
      [copyMarkdownButtonEnabledStorageKey]:
        defaultNotionEnhancerSettings.copyMarkdownButtonEnabled,
    });
  });

  it("writes the copy button setting", async () => {
    const set = vi.fn().mockResolvedValue(undefined);

    await setCopyMarkdownButtonEnabled({ get: vi.fn(), set }, false);

    expect(set).toHaveBeenCalledWith({
      [copyMarkdownButtonEnabledStorageKey]: false,
    });
  });

  it("extracts the updated setting from storage changes", () => {
    expect(
      getHeadingMarkerEnabledFromChanges({
        [headingMarkerEnabledStorageKey]: {
          oldValue: true,
          newValue: false,
        },
      }),
    ).toBe(false);
  });

  it("returns undefined when unrelated storage keys change", () => {
    expect(
      getHeadingMarkerEnabledFromChanges({
        unrelated: {
          oldValue: true,
          newValue: false,
        },
      }),
    ).toBeUndefined();
  });

  it("extracts the updated copy button setting from storage changes", () => {
    expect(
      getCopyMarkdownButtonEnabledFromChanges({
        [copyMarkdownButtonEnabledStorageKey]: {
          oldValue: true,
          newValue: false,
        },
      }),
    ).toBe(false);
  });
});
