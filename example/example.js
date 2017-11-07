const stringify = require('virtual-dom-stringify')
const svgify = require('../index')

const westminster = {
	headBench: {
		speaker: {
			seats: 1,
			color: '#000'
		}
	},
	left: {
		labour: {
			seats: 262,
			color: '#dc241f',
		},
		snp: {
			seats: 35,
			color: '#ff0',
		},
		libdems: {
			seats: 12,
			color: '#faa61a',
		},
		sinnfein: {
			seats: 7,
			color: '#080',
		},
		plaidcymru: {
			seats: 4,
			color: '#008142',
		},
		green: {
			seats: 1,
			color: '#6ab023',
		},
		independent: {
			seats: 1,
			color: '#aadfff',
		}
	},
	crossBench: {
		dup: {
			seats: 10,
			color: '#d46a4c',
		}
	},
	right: {
		conservative: {
			seats: 317,
			color: '#0087dc',
		}
	}
}

process.stdout.write(stringify(svgify(westminster)))
