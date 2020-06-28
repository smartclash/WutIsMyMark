# WutIsMyMark - WIMM
***A simple data scrapper from KCG Student login webpage***

![NPM Description](https://nodei.co/npm/wutismymark.png)

- [WutIsMyMark - WIMM](#wutismymark---wimm)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
- [Using WIMM](#using-wimm)
  - [An NPM Package](#an-npm-package)
  - [Standalone](#standalone)
- [Packages used](#packages-used)
- [License](#license)

# Installation

## Requirements

- [Nodejs](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Getting started

Clone this repository into your computer
```bash
git clone git@github.com:smartclash/WutIsMyMark.git
```

Go into that directory and install packages using yarn
> **Note:** This will take time as we will be installing chromeium browser in the background
```bash
yarn
```

Now build the project 
```bash
yarn build
```

The project has been built. You can now run it
```bash
node .
```

# Using WIMM

## An NPM Package
This project can be used as a standalone package. It's available at NPM and can be installed into any JS projects
```bash
yarn add wutismymark
```
...and then importing the library into your project
```js
const wimm = require('wutismymark');
wimm.scrape('rollNumberHere', 'DOBHere', <semesterNumber>).then(data => {
    console.log(data);
}).catch(console.error);
```

## Standalone

Go into `src/App.ts` and then into the bottom of the file. Change the rollnumber, password and the semester you want.

Build the project again and then run the project. Methods have been explained above already.

# Packages used

- [Puppeteer](https://pptr.dev/) to scrap website
- [Lodash](https://lodash.com/) to manage arrays and objects
- [Table2Json](https://www.npmjs.com/package/tabletojson) to convert HTML table into JSON

# License

[**MIT**](LICENSE.md)
