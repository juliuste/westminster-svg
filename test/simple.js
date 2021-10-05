'use strict'

const chart = require('..')
const tape = require('tape')

const expected = require('./data/simple.json')

const parliament = {
	headBench: {
		speaker: {
			seats: 3,
			colour: '#abc',
		},
	},
	left: {
		labour: {
			seats: 200,
			colour: '#d21',
		},
		snp: {
			seats: 30,
			colour: '#ff0',
		},
	},
	crossBench: {
		dup: {
			seats: 30,
			colour: '#d64',
		},
	},
	right: {
		conservative: {
			seats: 200,
			colour: '#08d',
		},
		libdems: {
			seats: 60,
			colour: '#ff0',
		},
	},
}

tape('Simple example', t => {
	const svg = JSON.parse(JSON.stringify(chart(parliament)))
	t.deepEqual(svg, expected)
	t.end()
})
