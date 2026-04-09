---
title: "Type alias: UserManifest – WXT"
source_url: "https://wxt.dev/api/reference/wxt/type-aliases/usermanifest"
fetched_at: "2026-03-06T07:09:09.689083+00:00"
---

Are you an LLM? You can read better optimized documentation at /api/reference/wxt/type-aliases/UserManifest.md for this page in Markdown format

[API](https://wxt.dev/api/reference/index.html) > [wxt](https://wxt.dev/api/reference/wxt.html) > UserManifest

# Type alias: UserManifest [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#type-alias-usermanifest)

> **UserManifest**: `{ [key in keyof Browser.runtime.ManifestV3 as key extends "action" | "background" | "chrome_url_overrides" | "devtools_page" | "manifest_version" | "options_page" | "options_ui" | "permissions" | "sandbox" | "web_accessible_resources" ? never : key]?: Browser.runtime.ManifestV3[key] }` & `object`

Manifest customization available in the `wxt.config.ts` file. You cannot configure entrypoints here, they are configured inline.

## Type declaration [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#type-declaration)

### action [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#action)

> **action**?: `Browser.runtime.ManifestV3`[`"action"`] & `object`

#### Type declaration [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#type-declaration-1)

##### browser_style [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-style)

> **browser_style**?: `boolean`

### browser_action [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-action)

> **browser_action**?: `Browser.runtime.ManifestV2`[`"browser_action"`] & `object`

#### Type declaration [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#type-declaration-2)

##### browser_style [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-style-1)

> **browser_style**?: `boolean`

### browser_specific_settings [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings)

> **browser_specific_settings**?: `object`

### browser_specific_settings.gecko [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko)

> **browser_specific_settings.gecko**?: `object`

### browser_specific_settings.gecko.id [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-id)

> **browser_specific_settings.gecko.id**?: `string`

### browser_specific_settings.gecko.strict_max_version [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-strict-max-version)

> **browser_specific_settings.gecko.strict_max_version**?: `string`

### browser_specific_settings.gecko.strict_min_version [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-strict-min-version)

> **browser_specific_settings.gecko.strict_min_version**?: `string`

### browser_specific_settings.gecko.update_url [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-update-url)

> **browser_specific_settings.gecko.update_url**?: `string`

### browser_specific_settings.gecko_android [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-android)

> **browser_specific_settings.gecko_android**?: `object`

### browser_specific_settings.gecko_android.strict_max_version [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-android-strict-max-version)

> **browser_specific_settings.gecko_android.strict_max_version**?: `string`

### browser_specific_settings.gecko_android.strict_min_version [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-gecko-android-strict-min-version)

> **browser_specific_settings.gecko_android.strict_min_version**?: `string`

### browser_specific_settings.safari [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-safari)

> **browser_specific_settings.safari**?: `object`

### browser_specific_settings.safari.strict_max_version [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-safari-strict-max-version)

> **browser_specific_settings.safari.strict_max_version**?: `string`

### browser_specific_settings.safari.strict_min_version [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-specific-settings-safari-strict-min-version)

> **browser_specific_settings.safari.strict_min_version**?: `string`

### page_action [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#page-action)

> **page_action**?: `Browser.runtime.ManifestV2`[`"page_action"`] & `object`

#### Type declaration [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#type-declaration-3)

##### browser_style [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#browser-style-2)

> **browser_style**?: `boolean`

### permissions [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#permissions)

> **permissions**?: (`Browser.runtime.ManifestPermissions` | `string` & `Record`<`never`, `never`>)[]

### web_accessible_resources [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#web-accessible-resources)

> **web_accessible_resources**?: `string`[] | `Browser.runtime.ManifestV3`[`"web_accessible_resources"`]

## Source [​](https://wxt.dev/api/reference/wxt/type-aliases/usermanifest.html#source)

[packages/wxt/src/types.ts:943](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/types.ts#L943)

---

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
