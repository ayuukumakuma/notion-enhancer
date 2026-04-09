import { defineConfig } from "wxt";

import {
  extensionDescription,
  extensionName,
  manifestIconPath,
} from "./lib/notion-enhancer-metadata";

export const manifest = {
  name: extensionName,
  description: extensionDescription,
  icons: {
    16: manifestIconPath,
    32: manifestIconPath,
    48: manifestIconPath,
    128: manifestIconPath,
  },
  permissions: ["clipboardWrite"] as const,
};

const config = defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest,
});

export default config;
