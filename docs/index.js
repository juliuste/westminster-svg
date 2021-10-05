'use strict'

import h from 'virtual-hyperscript-svg'
import createElement from 'virtual-dom/create-element.js'
import diff from 'virtual-dom/diff.js'
import patch from 'virtual-dom/patch.js'

import patterns from '../src/index.js'

const data = document.querySelector('#demo-data')

const render = () => patterns(JSON.parse(data.value), { hFunction: h })

let tree = render()
let root = createElement(tree)
document.querySelector('#demo-target').appendChild(root)

const rerender = () => {
	const tree2 = render()
	root = patch(root, diff(tree, tree2))
	tree = tree2
}
const callRerender = function () {
	return setTimeout(rerender, 5)
}

data.addEventListener('keydown', function (e) {
	// 8 is the keycode for backspace
	if (e.keyCode === 8) callRerender()
})
data.addEventListener('keypress', function () {
	callRerender()
})
