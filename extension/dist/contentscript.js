(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const extension = require('extensionizer');

// Insert flag into window object to denote Cashtab is available and active as a browser extension
// Could use a div or other approach for now, but emulate MetaMask this way so it is extensible to other items
// Try window object approach
let cashTabInject = document.createElement('script');
cashTabInject.src = extension.runtime.getURL('script.js');
cashTabInject.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(cashTabInject);

// Process page messages
// Chrome extensions communicate with web pages through the DOM
// Page sends a message to itself, chrome extension intercepts it
var port = extension.runtime.connect({ name: 'cashtabPort' });

window.addEventListener(
    'message',
    function (event) {
        if (typeof event.data.text !== 'undefined') {
            console.log('Message received:', event.data.text);
            console.log(`Content script received an event`, event);
        }

        // We only accept messages from ourselves
        if (event.source != window) return;

        if (event.data.type && event.data.type == 'FROM_PAGE') {
            port.postMessage(event.data);
        }
    },
    false,
);

// Listen for msgs from background.js
extension.runtime.onMessage.addListener(message => {
    // Parse message for address
    if (message && message.address) {
        // Send as message that webpage can listen for
        return window.postMessage(
            {
                type: 'FROM_CASHTAB',
                address: message.address,
            },
            '*',
        );
    }
    return true;
});

},{"extensionizer":3}],2:[function(require,module,exports){
const apis = [
  'alarms',
  'bookmarks',
  'browserAction',
  'commands',
  'contextMenus',
  'cookies',
  'downloads',
  'events',
  'extension',
  'extensionTypes',
  'history',
  'i18n',
  'idle',
  'notifications',
  'pageAction',
  'runtime',
  'storage',
  'tabs',
  'webNavigation',
  'webRequest',
  'windows',
]

const hasChrome = typeof chrome !== 'undefined'
const hasWindow = typeof window !== 'undefined'
const hasBrowser = typeof browser !== 'undefined'

function Extension () {
  const _this = this

  apis.forEach(function (api) {

    _this[api] = null

    if (hasChrome) {
      try {
        if (chrome[api]) {
          _this[api] = chrome[api]
        }
      } catch (e) {
      }
    }

    if (hasWindow) {
      try {
        if (window[api]) {
          _this[api] = window[api]
        }
      } catch (e) {
      }
    }

    if (hasBrowser) {
      try {
        if (browser[api]) {
          _this[api] = browser[api]
        }
      } catch (e) {
      }
      try {
        _this.api = browser.extension[api]
      } catch (e) {
      }
    }
  })

  if (hasBrowser) {
    try {
      if (browser && browser.runtime) {
        this.runtime = browser.runtime
      }
    } catch (e) {
    }

    try {
      if (browser && browser.browserAction) {
        this.browserAction = browser.browserAction
      }
    } catch (e) {
    }
  }

}

module.exports = Extension

},{}],3:[function(require,module,exports){
/* Extension.js
 *
 * A module for unifying browser differences in the WebExtension API.
 *
 * Initially implemented because Chrome hides all of their WebExtension API
 * behind a global `chrome` variable, but we'd like to start grooming
 * the code-base for cross-browser extension support.
 *
 * You can read more about the WebExtension API here:
 * https://developer.mozilla.org/en-US/Add-ons/WebExtensions
 */

const Extension = require('./extension-instance')
module.exports = new Extension()

},{"./extension-instance":2}]},{},[1]);
