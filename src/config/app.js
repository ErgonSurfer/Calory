// Copyright (c) 2023 The Bitcoin developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.
import mainLogo from 'assets/logo_primary.png';
import tokenLogo from 'assets/logo_secondary.png';

// App settings not adjustable by the user
const appConfig = {
    name: 'ergon',
    ticker: 'ⵟ',
    logo: mainLogo,
    legacyPrefix: 'bitcoincash',
    coingeckoId: 'ecash',
    defaultFee: 0.1,
    dustSats: 5,
    etokenSats: 5.46,
    cashDecimals: 8,
    tokenName: 'eToken',
    tokenTicker: 'eToken',
    tokenLogo: tokenLogo,
    notificationDurationShort: 3,
    notificationDurationLong: 5,
    localStorageMaxCharacters: 24,
    monitorExtension: false,
};

export default appConfig;
