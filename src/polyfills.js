// src/polyfills.js
// This file MUST be the first import in your application's entry point.

// 1. Establish a reliable global object reference.
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

// 5. Definitive polyfill for Fetch API globals.
// This addresses the core issue where libraries expect these to be on the global object.
// We explicitly check for their existence on the 'source' (window/self) and assign them to the global object.
const source = typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {});

if (source.fetch && typeof globalObject.fetch === 'undefined') {
    globalObject.fetch = source.fetch;
}

if (source.Request && typeof globalObject.Request === 'undefined') {
    globalObject.Request = source.Request;
}

if (source.Response && typeof globalObject.Response === 'undefined') {
    globalObject.Response = source.Response;
}

if (source.Headers && typeof globalObject.Headers === 'undefined') {
    globalObject.Headers = source.Headers;
}

console.log('✅ Polyfills loaded and configured successfully.');
