import { describe, expect, it } from "vite-plus/test";

import config, { manifest } from "../wxt.config";
import {
  extensionDescription,
  extensionName,
  manifestIconPath,
} from "../lib/notion-enhancer-metadata";

describe("wxt config", () => {
  it("enables React module", () => {
    expect(config.modules).toContain("@wxt-dev/module-react");
  });

  it("sets extension metadata", () => {
    expect(manifest.name).toBe(extensionName);
    expect(manifest.description).toBe(extensionDescription);
    expect(manifest.icons).toMatchObject({
      16: manifestIconPath,
      32: manifestIconPath,
      48: manifestIconPath,
      128: manifestIconPath,
    });
  });

  it("includes clipboardWrite permission", () => {
    expect(manifest.permissions).toContain("clipboardWrite");
  });
});
