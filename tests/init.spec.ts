import { describe, expect, it } from "vite-plus/test";

import { initializeProject } from "../scripts/init";

describe("initializeProject", () => {
  it("throws when the project is already initialized (template package name not found)", async () => {
    await expect(initializeProject({ projectName: "test", format: false })).rejects.toThrow(
      "does not appear to be the template",
    );
  });
});
