'use strict'

import chart from '../src/index.js'
import tape from 'tape'
import { normalize as n } from './util.js'

import expected from './data/uk-2017.js'

const parliament = {
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

tape('2017 UK general election', t => {
	const svg = chart(parliament)
	t.deepEqual(n(svg), n(expected))
	t.end()
})
