'use strict'

const chart = require('..')
const tape = require('tape')

const expected = require('./data/uk-2017.json')

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
	const svg = JSON.parse(JSON.stringify(chart(parliament)))
	t.deepEqual(svg, expected)
	t.end()
})
