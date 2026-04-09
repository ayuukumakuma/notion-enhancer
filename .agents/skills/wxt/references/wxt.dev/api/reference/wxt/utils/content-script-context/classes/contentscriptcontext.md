---
title: "Class: ContentScriptContext – WXT"
source_url: "https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext"
fetched_at: "2026-03-06T07:09:09.689083+00:00"
---

Are you an LLM? You can read better optimized documentation at /api/reference/wxt/utils/content-script-context/classes/ContentScriptContext.md for this page in Markdown format

[API](https://wxt.dev/api/reference/index.html) > [wxt/utils/content-script-context](https://wxt.dev/api/reference/wxt/utils/content-script-context/index.html) > ContentScriptContext

# Class: ContentScriptContext [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#class-contentscriptcontext)

Implements [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). Used to detect and stop content script code when the script is invalidated.

It also provides several utilities like `ctx.setTimeout` and `ctx.setInterval` that should be used in content scripts instead of `window.setTimeout` or `window.setInterval`.

To create context for testing, you can use the class's constructor:

ts

```
import { ContentScriptContext } from 'wxt/utils/content-scripts-context';

test('storage listener should be removed when context is invalidated', () => {
  const ctx = new ContentScriptContext('test');
  const item = storage.defineItem('local:count', { defaultValue: 0 });
  const watcher = vi.fn();

  const unwatch = item.watch(watcher);
  ctx.onInvalidated(unwatch); // Listen for invalidate here

  await item.setValue(1);
  expect(watcher).toBeCalledTimes(1);
  expect(watcher).toBeCalledWith(1, 0);

  ctx.notifyInvalidated(); // Use this function to invalidate the context
  await item.setValue(2);
  expect(watcher).toBeCalledTimes(1);
});
```

## Contents [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#contents)

- [Implements](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#implements)
- [Constructors](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#constructors)
  - [new ContentScriptContext(contentScriptName, options)](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#new-contentscriptcontextcontentscriptname-options)
- [Properties](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#properties)
  - [abortController](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#abortcontroller)
  - [contentScriptName](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#contentscriptname)
  - [id](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#id)
  - [locationWatcher](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#locationwatcher)
  - [options](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#options)
  - [SCRIPT_STARTED_MESSAGE_TYPE](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#script-started-message-type)
- [Accessors](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#accessors)
  - [isInvalid](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#isinvalid)
  - [isValid](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#isvalid)
  - [signal](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#signal)
- [Methods](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#methods)
  - [abort()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#abort)
  - [addEventListener()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#addeventlistener)
  - [block()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#block)
  - [listenForNewerScripts()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#listenfornewerscripts)
  - [notifyInvalidated()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#notifyinvalidated)
  - [onInvalidated()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#oninvalidated)
  - [requestAnimationFrame()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#requestanimationframe)
  - [requestIdleCallback()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#requestidlecallback)
  - [setInterval()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#setinterval)
  - [setTimeout()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#settimeout)
  - [stopOldScripts()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#stopoldscripts)
  - [verifyScriptStartedEvent()](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#verifyscriptstartedevent)

## Implements [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#implements)

- `AbortController`

## Constructors [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#constructors)

### new ContentScriptContext(contentScriptName, options) [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#new-contentscriptcontext-contentscriptname-options)

> **new ContentScriptContext**(`contentScriptName`, `options`?): [`ContentScriptContext`](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html)

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters)

▪ **contentScriptName**: `string`

▪ **options?**: `Omit`<[`ContentScriptDefinition`](https://wxt.dev/api/reference/wxt/type-aliases/contentscriptdefinition.html), `"main"`>

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source)

[packages/wxt/src/utils/content-script-context.ts:52](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L52)

## Properties [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#properties)

### abortController [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#abortcontroller)

> **`private`** **abortController**: `AbortController`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-1)

[packages/wxt/src/utils/content-script-context.ts:49](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L49)

---

### contentScriptName [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#contentscriptname)

> **`private`** **`readonly`** **contentScriptName**: `string`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-2)

[packages/wxt/src/utils/content-script-context.ts:53](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L53)

---

### id [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#id)

> **`private`** **id**: `string`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-3)

[packages/wxt/src/utils/content-script-context.ts:48](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L48)

---

### locationWatcher [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#locationwatcher)

> **`private`** **locationWatcher**: `object`

#### Type declaration [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#type-declaration)

##### run() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#run)

Ensure the location watcher is actively looking for URL changes. If it's already watching, this is a noop.

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-4)

[packages/wxt/src/utils/content-script-context.ts:50](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L50)

---

### options [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#options)

> **`readonly`** **options**?: `Omit`<[`ContentScriptDefinition`](https://wxt.dev/api/reference/wxt/type-aliases/contentscriptdefinition.html), `"main"`>

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-5)

[packages/wxt/src/utils/content-script-context.ts:54](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L54)

---

### SCRIPT_STARTED_MESSAGE_TYPE [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#script-started-message-type)

> **`private`** **`static`** **SCRIPT_STARTED_MESSAGE_TYPE**: `string`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-6)

[packages/wxt/src/utils/content-script-context.ts:44](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L44)

## Accessors [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#accessors)

### isInvalid [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#isinvalid)

> **`get`** **isInvalid**(): `boolean`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-7)

[packages/wxt/src/utils/content-script-context.ts:71](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L71)

---

### isValid [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#isvalid)

> **`get`** **isValid**(): `boolean`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-8)

[packages/wxt/src/utils/content-script-context.ts:78](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L78)

---

### signal [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#signal)

> **`get`** **signal**(): `AbortSignal`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-9)

[packages/wxt/src/utils/content-script-context.ts:63](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L63)

## Methods [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#methods)

### abort() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#abort)

> **abort**(`reason`?): `void`

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-1)

▪ **reason?**: `any`

#### Implementation of [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#implementation-of)

AbortController.abort

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-10)

[packages/wxt/src/utils/content-script-context.ts:67](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L67)

---

### addEventListener() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#addeventlistener)

#### addEventListener(target, type, handler, options) [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#addeventlistener-target-type-handler-options)

> **addEventListener**<`TType`>(`target`, `type`, `handler`, `options`?): `void`

Call `target.addEventListener` and remove the event listener when the context is invalidated.

Listeners can be canceled by calling the normal `removeEventListener` function.

Includes additional events useful for content scripts:

- `"wxt:locationchange"` - Triggered when HTML5 history mode is used to change URL. Content scripts are not reloaded when navigating this way, so this can be used to reset the content script state on URL change, or run custom code.

##### Type parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#type-parameters)

▪ **TType** extends keyof [`WxtWindowEventMap`](https://wxt.dev/api/reference/wxt/utils/content-script-context/interfaces/wxtwindoweventmap.html)

##### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-2)

▪ **target**: `Window`

▪ **type**: `TType`

▪ **handler**: (`event`) => `void`

▪ **options?**: `AddEventListenerOptions`

##### Returns [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#returns)

##### Example [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#example)

ts

```
ctx.addEventListener(document, 'visibilitychange', () => {
    // ...
  });
  ctx.addEventListener(window, 'wxt:locationchange', () => {
    // ...
  });
```

##### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-11)

[packages/wxt/src/utils/content-script-context.ts:203](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L203)

#### addEventListener(target, type, handler, options) [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#addeventlistener-target-type-handler-options-1)

> **addEventListener**<`TType`>(`target`, `type`, `handler`, `options`?): `void`

##### Type parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#type-parameters-1)

▪ **TType** extends keyof `DocumentEventMap`

##### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-3)

▪ **target**: `Document`

▪ **type**: `TType`

▪ **handler**: (`event`) => `void`

▪ **options?**: `AddEventListenerOptions`

##### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-12)

[packages/wxt/src/utils/content-script-context.ts:209](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L209)

#### addEventListener(target, params) [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#addeventlistener-target-params)

> **addEventListener**<`TTarget`>(`target`, ...`params`): `void`

##### Type parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#type-parameters-2)

▪ **TTarget** extends `EventTarget`

##### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-4)

▪ **target**: `TTarget`

▪ ...**params**: `Parameters`<`TTarget`[`"addEventListener"`]>

##### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-13)

[packages/wxt/src/utils/content-script-context.ts:215](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L215)

---

### block() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#block)

> **block**<`T`>(): `Promise`<`T`>

Return a promise that never resolves. Useful if you have an async function that shouldn't run after the context is expired.

#### Type parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#type-parameters-3)

▪ **T**

#### Returns [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#returns-1)

#### Example [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#example-1)

ts

```
const getValueFromStorage = async () => {
    if (ctx.isInvalid) return ctx.block();

    // ...
  };
```

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-14)

[packages/wxt/src/utils/content-script-context.ts:112](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L112)

---

### listenForNewerScripts() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#listenfornewerscripts)

> **listenForNewerScripts**(): `void`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-15)

[packages/wxt/src/utils/content-script-context.ts:281](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L281)

---

### notifyInvalidated() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#notifyinvalidated)

> **notifyInvalidated**(): `void`

Abort the abort controller and execute all `onInvalidated` listeners.

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-16)

[packages/wxt/src/utils/content-script-context.ts:244](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L244)

---

### onInvalidated() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#oninvalidated)

> **onInvalidated**(`cb`): () => `void`

Add a listener that is called when the content script's context is invalidated.

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-5)

▪ **cb**: () => `void`

#### Returns [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#returns-2)

A function to remove the listener.

> > (): `void`
>
> ##### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-17)
>
> [packages/wxt/src/utils/content-script-context.ts:96](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L96)

#### Example [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#example-2)

ts

```
browser.runtime.onMessage.addListener(cb);
  const removeInvalidatedListener = ctx.onInvalidated(() => {
    browser.runtime.onMessage.removeListener(cb);
  });
  // ...
  removeInvalidatedListener();
```

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-18)

[packages/wxt/src/utils/content-script-context.ts:96](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L96)

---

### requestAnimationFrame() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#requestanimationframe)

> **requestAnimationFrame**(`callback`): `number`

Wrapper around `window.requestAnimationFrame` that automatically cancels the request when invalidated.

Callbacks can be canceled by calling the normal `cancelAnimationFrame` function.

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-6)

▪ **callback**: `FrameRequestCallback`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-19)

[packages/wxt/src/utils/content-script-context.ts:153](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L153)

---

### requestIdleCallback() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#requestidlecallback)

> **requestIdleCallback**(`callback`, `options`?): `number`

Wrapper around `window.requestIdleCallback` that automatically cancels the request when invalidated.

Callbacks can be canceled by calling the normal `cancelIdleCallback` function.

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-7)

▪ **callback**: `IdleRequestCallback`

▪ **options?**: `IdleRequestOptions`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-20)

[packages/wxt/src/utils/content-script-context.ts:169](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L169)

---

### setInterval() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#setinterval)

> **setInterval**(`handler`, `timeout`?): `number`

Wrapper around `window.setInterval` that automatically clears the interval when invalidated.

Intervals can be cleared by calling the normal `clearInterval` function.

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-8)

▪ **handler**: () => `void`

▪ **timeout?**: `number`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-21)

[packages/wxt/src/utils/content-script-context.ts:124](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L124)

---

### setTimeout() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#settimeout)

> **setTimeout**(`handler`, `timeout`?): `number`

Wrapper around `window.setTimeout` that automatically clears the interval when invalidated.

Timeouts can be cleared by calling the normal `setTimeout` function.

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-9)

▪ **handler**: () => `void`

▪ **timeout?**: `number`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-22)

[packages/wxt/src/utils/content-script-context.ts:138](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L138)

---

### stopOldScripts() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#stopoldscripts)

> **stopOldScripts**(): `void`

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-23)

[packages/wxt/src/utils/content-script-context.ts:251](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L251)

---

### verifyScriptStartedEvent() [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#verifyscriptstartedevent)

> **verifyScriptStartedEvent**(`event`): `boolean`

#### Parameters [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#parameters-10)

▪ **event**: `CustomEvent`<`any`>

#### Source [​](https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/contentscriptcontext.html#source-24)

[packages/wxt/src/utils/content-script-context.ts:273](https://github.com/wxt-dev/wxt/blob/55dc263dc99932008006dade6dd9fb7891b7d04e/packages/wxt/src/utils/content-script-context.ts#L273)

---

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
