import { describe, expect, it } from "vite-plus/test";
import { JSDOM } from "jsdom";

import { extractPageMarkdown } from "../lib/notion/markdown-extractor";

const makeDoc = (bodyHtml: string): Document => {
  const { window } = new JSDOM(`<!doctype html><body>${bodyHtml}</body>`);
  return window.document;
};

describe("extractPageMarkdown", () => {
  it("returns error when no Notion content element is found", () => {
    const doc = makeDoc("<div>no notion here</div>");
    const result = extractPageMarkdown(doc);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toContain("見つかりません");
    }
  });

  it("extracts content from .notion-page-content", () => {
    const doc = makeDoc('<div class="notion-page-content"><h1>Hello</h1><p>World</p></div>');
    const result = extractPageMarkdown(doc);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.markdown).toContain("Hello");
      expect(result.markdown).toContain("World");
    }
  });

  it("converts headings to markdown syntax", () => {
    const doc = makeDoc('<div class="notion-page-content"><h1>Title</h1><h2>Sub</h2></div>');
    const result = extractPageMarkdown(doc);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.markdown).toContain("# Title");
      expect(result.markdown).toContain("## Sub");
    }
  });

  it("converts unordered lists", () => {
    const doc = makeDoc('<div class="notion-page-content"><ul><li>foo</li><li>bar</li></ul></div>');
    const result = extractPageMarkdown(doc);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.markdown).toContain("-   foo");
      expect(result.markdown).toContain("-   bar");
    }
  });

  it("returns error when content element is empty", () => {
    const doc = makeDoc('<div class="notion-page-content"></div>');
    const result = extractPageMarkdown(doc);
    expect(result.success).toBe(false);
  });
});
