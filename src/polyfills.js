// src/polyfills.js
// A more robust polyfill for Node.js APIs in browser and server environments.

// 1. Establish a global object reference.
// This is necessary because the global object has different names in different JS environments.
let globalObject;
if (typeof globalThis !== 'undefined') {
  globalObject = globalThis;
} else if (typeof self !== 'undefined') {
  globalObject = self;
} else if (typeof window !== 'undefined') {
  globalObject = window;
} else if (typeof global !== 'undefined') {
  globalObject = global;
} else {
  // A fallback in case no global object is found.
  globalObject = {};
}

// 2. Polyfill 'global' if it's missing. Some libraries expect it.
if (typeof globalObject.global === 'undefined') {
  globalObject.global = globalObject;
}

// 3. Polyfill 'process' for browser environments.
// Libraries like 'simple-peer' might use 'process.nextTick'.
if (typeof globalObject.process === 'undefined') {
  globalObject.process = {
    env: { NODE_ENV: 'production' },
    nextTick: (callback, ...args) => {
      setTimeout(() => {
        callback.apply(null, args);
      }, 0);
    },
    browser: true,
  };
}

// 4. Polyfill 'Buffer' which is a Node.js API.
if (typeof globalObject.Buffer === 'undefined') {
  try {
    const { Buffer } = require('buffer/');
    globalObject.Buffer = Buffer;
  } catch (e) {
    console.error("Buffer polyfill failed.", e);
  }
}

// 5. Handle the Fetch API `Request` object error.
// The error 'Cannot destructure property 'Request' of 'undefined'' suggests that
// some code is doing `const { Request } = globalThis` or similar, and `globalThis`
// (or its equivalent) does not have a `Request` property in the Vercel build environment.
// This ensures that if fetch is available, its related objects are also exposed on the global object.
if (globalObject.fetch && typeof globalObject.Request === 'undefined') {
    globalObject.Request = globalObject.fetch.Request;
    globalObject.Response = globalObject.fetch.Response;
    globalObject.Headers = globalObject.fetch.Headers;
}

console.log('✅ Polyfills loaded successfully');
