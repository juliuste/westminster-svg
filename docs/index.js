'use strict'

import createElement from 'virtual-dom/create-element.js'
import diff from 'virtual-dom/diff.js'
import patch from 'virtual-dom/patch.js'

const patterns = require('../src/index.js')

const data = document.querySelector('#demo-data')

const render = () => patterns(JSON.parse(data.value))

let tree = render()
let root = createElement(tree)
document.querySelector('#demo-target').appendChild(root)

const rerender = () => {
	const tree2 = render()
	root = patch(root, diff(tree, tree2))
	tree = tree2
}

data.addEventListener('keypress', () => setTimeout(rerender, 5))
