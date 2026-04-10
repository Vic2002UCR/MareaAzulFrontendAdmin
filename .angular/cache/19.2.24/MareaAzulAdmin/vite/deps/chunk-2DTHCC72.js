import {
  InjectionToken
} from "./chunk-SRNMBPXD.js";

// node_modules/@angular/common/fesm2022/xhr-BfNfxNDv.mjs
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(";")) {
    const eqIndex = cookie.indexOf("=");
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ""] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
var PLATFORM_BROWSER_ID = "browser";
var PLATFORM_SERVER_ID = "server";
function isPlatformBrowser(platformId) {
  return platformId === PLATFORM_BROWSER_ID;
}
function isPlatformServer(platformId) {
  return platformId === PLATFORM_SERVER_ID;
}
var XhrFactory = class {
};

// node_modules/@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs
var DOCUMENT = new InjectionToken(ngDevMode ? "DocumentToken" : "");

export {
  parseCookieValue,
  PLATFORM_BROWSER_ID,
  PLATFORM_SERVER_ID,
  isPlatformBrowser,
  isPlatformServer,
  XhrFactory,
  DOCUMENT
};
/*! Bundled license information:

@angular/common/fesm2022/xhr-BfNfxNDv.mjs:
@angular/common/fesm2022/dom_tokens-rA0ACyx7.mjs:
  (**
   * @license Angular v19.2.20
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
<<<<<<<< Updated upstream:.angular/cache/19.2.24/MareaAzulAdmin/vite/deps/chunk-2DTHCC72.js
//# sourceMappingURL=chunk-2DTHCC72.js.map
========
//# sourceMappingURL=chunk-2UTZ6EIC.js.map
>>>>>>>> Stashed changes:.angular/cache/19.2.24/MareaAzulAdmin/vite/deps/chunk-2UTZ6EIC.js
