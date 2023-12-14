# ergonaddr.js: The Ergon address format for Node.js and web browsers.

[![NPM](https://nodei.co/npm/ergonaddrjs.png)](https://nodei.co/npm/ergonaddrjs/)

JavaScript implementation for CashAddr address format for Ergon.

Compliant with the original CashAddr [specification](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/cashaddr.md) which improves upon [BIP 173](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki).

_Note:_ This is a JavaScript implementation of the CashAddr format specification. If you are looking for a general purpose Bitcoin Cash address translation library, check out the easy-to-use and well-tested [BchAddr.js](https://github.com/ealmansi/bchaddrjs).

## Installation

### Using NPM

```bsh
$ npm install ergonaddrjs
```

### Manually

You may also download the distribution file manually and place it within your third-party scripts directory: [dist/ergonaddrjs-1.0.0.min.js](https://unpkg.com/ergonaddrjs@1.0.0/dist/cashaddrjs-1.0.0.min.js).

## Usage

Convert a `bitcoincash:` prefixed address to an `ergon:` prefixed address

### In Node.js

```javascript
const ergonaddr = require("ergonaddrjs");
const bitcoincashAddress =
  "bitcoincash:qpadrekpz6gjd8w0zfedmtqyld0r2j4qmuj6vnmhp6";
const { prefix, type, hash } = ergonaddr.decode(bitcoincashAddress);
console.log(prefix); // 'bitcoincash'
console.log(type); // 'P2PKH'
console.log(hash); // Uint8Array [ 118, 160, ..., 115 ]
console.log(cashaddr.encode("ergon", type, hash));
// 'ergon:qpadrekpz6gjd8w0zfedmtqyld0r2j4qmunpeyresh'
```

### React

```javascript
import cashaddr from "ergonaddrjs";

function convertBitcoincashToErgon(bitcoincashAddress) {
  /* NOTE 
  This function assumes input parameter 'bitcoincashAddress' is a valid bitcoincash: address
  cashaddr.decode() will throw an error if 'bitcoincashAddress' lacks a prefix 
  */
  const { prefix, type, hash } = cashaddr.decode(bitcoincashAddress);
  const ergonAddress = cashaddr.encode("ergon", type, hash);
  return ergonAddress;
}
```

### Browser

```html
<html>
  <head>
    <script src="https://unpkg.com/ergonaddrjs@1.0.0/dist/cashaddrjs-1.0.0.min.js"></script>
  </head>
  <body>
    <script>
      function convertBitcoincashToErgon(bitcoincashAddress) {
        /* NOTE 
    This function assumes input parameter 'bitcoincashAddress' is a valid bitcoincash: address
    cashaddr.decode() will throw an error if 'bitcoincashAddress' lacks a prefix 
    */
        const { prefix, type, hash } = ergonaddr.decode(bitcoincashAddress);
        const ergonAddress = ergonaddr.encode("ergon", type, hash);
        return ergonAddress;
      }
      const ergonAddress = convertBitcoincashToErgon(
        "bitcoincash:qpadrekpz6gjd8w0zfedmtqyld0r2j4qmuj6vnmhp6"
      );
      console.log(ergonAddress);
      // ergon:qpadrekpz6gjd8w0zfedmtqyld0r2j4qmunpeyresh
    </script>
  </body>
</html>
```

#### Script Tag

You may include a script tag in your HTML and the `ergonaddr` module will be defined globally on subsequent scripts.

```html
<html>
  <head>
    ...
    <script src="https://unpkg.com/ergonaddrjs@1.0.0/dist/cashaddrjs-1.0.0.min.js"></script>
  </head>
  ...
</html>
```

#### jsFiddle

https://jsfiddle.net/zghd6c2y/
