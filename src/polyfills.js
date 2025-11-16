// src/polyfills.js
// A modern polyfill for browser environments.
// This must be the first import in your app's entry point (e.g., main.jsx).

// 1. Establish a consistent global object reference.
const globalObject =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : {};

// 2. Polyfill 'global' for libraries that expect it.
if (typeof globalObject.global === 'undefined') {
  globalObject.global = globalObject;
}

// 3. Polyfill 'Buffer' using the 'buffer' package.
// The 'import' statement is handled by Vite to load the correct browser-compatible version.
import { Buffer } from 'buffer/';
if (typeof globalObject.Buffer === 'undefined') {
  globalObject.Buffer = Buffer;
}

// 4. Polyfill 'process' for libraries like 'simple-peer'.
if (typeof globalObject.process === 'undefined') {
  globalObject.process = {
    env: { NODE_ENV: 'production' },
    nextTick: (callback, ...args) => {
      setTimeout(() => callback.apply(null, args), 0);
    },
    browser: true,
  };
}

// 5. Handle the Fetch API `Request` object error.
// In some build environments, `fetch` might exist, but its related globals
// (`Request`, `Response`, `Headers`) might not be attached to the global object.
if (globalObject.fetch && typeof globalObject.Request === 'undefined') {
    // In browsers, these are on `window` or `self`.
    const source = typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : globalObject);
    if (source.Request) {
        globalObject.Request = source.Request;
        globalObject.Response = source.Response;
        globalObject.Headers = source.Headers;
    }
}

console.log('✅ Polyfills loaded successfully');
