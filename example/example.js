import { toHtml } from 'hast-util-to-html'
import svgify from '../src/index.js'

const westminster = {
	headBench: {
		speaker: {
			seats: 1,
			colour: '#000',
		},
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
		},
	},
	crossBench: {
		dup: {
			seats: 10,
			colour: '#d46a4c',
		},
	},
	right: {
		conservative: {
			seats: 317,
			colour: '#0087dc',
		},
	},
}

process.stdout.write(toHtml(svgify(westminster)))
