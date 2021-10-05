# westminster-svg

Generate westminster parliament charts as **[_hast_](https://github.com/syntax-tree/hast) virtual DOM SVG**. Design inspired by the [Wikipedia parliament charts](https://github.com/slashme/parliamentdiagram). *Play around with the [__live demo__](https://juliuste.github.io/westminster-svg/)!* For "normal" parliament charts, see **[parliament-svg](https://github.com/juliuste/parliament-svg)**.

[![npm version](https://img.shields.io/npm/v/westminster-svg.svg)](https://www.npmjs.com/package/westminster-svg)
[![License](https://img.shields.io/github/license/juliuste/westminster-svg.svg?style=flat)](license)
[![Contact me](https://img.shields.io/badge/contact-email-turquoise)](mailto:mail@juliustens.eu)

## Installation

**This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be `import`ed instead of `require`d.**

```shell
npm install --save westminster-svg
```

## Usage

```js
const westminsterSVG = require('westminster-svg')

const virtualSvg = westminsterSVG(parliament)
```

**`parliament`** is an object containing party information for all four 'sides' of the parliament: `headBench`, `left`, `crossBench` and `right`. After the [2017 UK general election](https://en.wikipedia.org/wiki/United_Kingdom_general_election,_2017) it should look as follows:

```js
{
	headBench: {
		speaker: {
			seats: 1,
			colour: '#000'
		}
	},
	left: {
		labour: {
			seats: 262,
			colour: '#dc241f',
		},
		snp: {
			seats: 35,
			colour: '#ff0',
		},
		libdems: {
			seats: 12,
			colour: '#faa61a',
		},
		sinnfein: {
			seats: 7,
			colour: '#080',
		},
		plaidcymru: {
			seats: 4,
			colour: '#008142',
		},
		green: {
			seats: 1,
			colour: '#6ab023',
		},
		independent: {
			seats: 1,
			colour: '#aadfff',
		}
	},
	crossBench: {
		dup: {
			seats: 10,
			colour: '#d46a4c',
		}
	},
	right: {
		conservative: {
			seats: 317,
			colour: '#0087dc',
		}
	}
}
```

Please note that the parties will be displayed in the order of their `object` keys from left to right (based on the speaker's viewpoint). Further, each seat SVG element contains the party name in its `class` attribute.

For the given `parliament` object, the rendered result should look like this:

![Example: House of Commons after GE 2017](https://rawgit.com/juliuste/westminster-svg/main/example/westminster.svg)

If you want to convert the [_hast_](https://github.com/syntax-tree/hast) virtual DOM tree to an SVG string, use `hast-util-to-html` (don't get confused by the name, it can also stringify SVG):

```js
import westminsterSVG from 'parliament-svg'
import { toHtml as toSvg } from 'hast-util-to-html'
const virtualSvg = westminsterSVG(parliament)
const svg = toSvg(virtualSvg)
```

Check the [`example` directory](example) for further examples.

### What if I prefer virtual-dom?

If you prefer [`virtual-dom`](https://github.com/Matt-Esch/virtual-dom) over `hast`, e.g. for diffing or patching, you can use [`hast-to-hyperscript`](https://github.com/syntax-tree/hast-to-hyperscript).

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/westminster-svg/issues).
