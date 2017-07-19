'use strict'

const svg = require('virtual-hyperscript-svg')
const roundTo = require('lodash.round')
const max = require('lodash.max')
const min = require('lodash.min')
const maxBy = require('lodash.maxby')
const sortBy = require('lodash.sortby')
const sumBy = require('lodash.sumby')
const toArray = require('lodash.toarray')
const reverse = require('lodash.reverse')

const proportion = 1.1 * Math.PI

const radius = 0.42
const middleSpace = 2/3

const round = (x) => roundTo(x, 8)

const countSeatsInSide = (side) =>
	sumBy(toArray(side), (p) => p.seats)

const calculateWingRows = (parliament) => {
	const averageWingSize = sumBy([parliament.left, parliament.right], countSeatsInSide) / 2
	const rows = Math.ceil(Math.sqrt(averageWingSize / proportion))
	return rows
}

const calculateHeight = (wingRows) => 2*wingRows + middleSpace * 2 + 1 // this should - in theory - use 'headColumns' instead of the +1, but that shouldn't really matter for usual parliament sizes

const calculateCrossRows = (cross, wingRows) => {
	const crossSeats = countSeatsInSide(cross)
	const maxColumns = max([1, Math.floor(calculateHeight(wingRows)-0.75)])
	let currentRows = 1
	while(Math.ceil(crossSeats/currentRows) > maxColumns) currentRows++
	return currentRows
}

const calculateHeadColumns = (head, maxWingColumns) => {
	const headSeats = countSeatsInSide(head)
	const maxRows = Math.floor(maxWingColumns * 0.9)
	let currentColumns = 1
	while(Math.ceil(headSeats/currentColumns) > maxRows) currentColumns++
	return currentColumns
}

const calculateMissingDimension = (side, knownDimension) => {
	const seats = countSeatsInSide(side)
	return Math.ceil(seats / knownDimension)
}

const generateHeadPoints = (headSeats, headRows, headColumns, startingPoint) => {
	const points = []
	for(let row = 0; row < headRows; row++){
		for(let column = 0; column < headColumns; column++){
			let modifier
			if(row === headRows - 1) modifier = ((headColumns - (headSeats % headColumns)) % headColumns) / 2 // center last row if necessary
			else modifier = 0
			points.push([
				startingPoint[0] + row,
				startingPoint[1] + column + modifier
			])
			if(points.length === headSeats) return reverse(points)
		}
	}
}

const generateWingPoints = (wingSeats, wingRows, wingColumns, startingPoint, yDirection) => {
	const points = []
	for(let column = 0; column < wingColumns; column++){
		for(let row = 0; row < wingRows; row++){
			points.push([
				startingPoint[0] + column,
				startingPoint[1] + (row * yDirection)
			])
			if(points.length === wingSeats) return points
		}
	}
}

const generateCrossPoints = (crossSeats, crossRows, crossColumns, startingPoint) => {
	const points = []
	for(let row = 0; row < crossRows; row++){
		for(let column = 0; column < crossColumns; column++){
			let modifier
			if(row === crossRows - 1) modifier = ((crossRows - (crossSeats % crossRows)) % crossRows) / 2
			else modifier = 0
			points.push([
				startingPoint[0] + row,
				startingPoint[1] + column + modifier
			])
			if(points.length === crossSeats) return sortBy(points, (p) => p[1])
		}
	}
}

const fillPoint = (point, party, colour) => ({
	x: round(point[0]),
	y: round(point[1]),
	r: radius,
	fill: colour,
	class: party
})

const fillSidePoints = (sidePoints, side) => {
	const filledPoints = []
	let start = 0
	for(let party in side){
		for(let i = 0; i < side[party].seats; i++){
			filledPoints.push(fillPoint(sidePoints[start+i], party, side[party].colour))
		}
		start += side[party].seats
	}
	return filledPoints
}

const generateChart = (parliament) => {

	const wingRows = calculateWingRows(parliament)
	const leftWingColumns = calculateMissingDimension(parliament.left, wingRows)
	const rightWingColumns = calculateMissingDimension(parliament.right, wingRows)

	// console.error(wingRows, leftWingColumns, rightWingColumns)

	const crossRows = calculateCrossRows(parliament.crossBench, wingRows)
	const crossColumns = calculateMissingDimension(parliament.crossBench, crossRows)

	// console.error(crossRows, crossColumns)

	const headColumns = calculateHeadColumns(parliament.headBench, max([leftWingColumns, rightWingColumns]))
	const headRows = calculateMissingDimension(parliament.headBench, headColumns)

	// console.error(headColumns, headRows)

	const headSeats = countSeatsInSide(parliament.headBench)
	const leftWingSeats = countSeatsInSide(parliament.left)
	const rightWingSeats = countSeatsInSide(parliament.right)
	const crossSeats = countSeatsInSide(parliament.crossBench)

	// console.error(headSeats, leftWingSeats, rightWingSeats, crossSeats)

	const headStart = [0, -(headColumns-1)/2]
	const leftWingStart = [1, headStart[1]-middleSpace-1]
	const rightWingStart = [1, headStart[1]+(headColumns-1)+middleSpace+1]
	const crossStart = [1+max([leftWingColumns, rightWingColumns])+1, -(crossColumns-1)/2]

	// console.error(headStart, leftWingStart, rightWingStart, crossStart)

	const padding = 0.5

	const left = headStart[0] - 0.5 - padding
	const top = leftWingStart[1] - (wingRows-1) - 0.5 - padding
	const right = crossStart[0] + (crossRows-1) + 0.5 + padding
	const bottom = rightWingStart[1] + (wingRows-1) + 0.5 + padding
	const width = right - left
	const height = bottom - top

	// console.error(left, top, right, bottom, width, height)

	const headPoints = generateHeadPoints(headSeats, headRows, headColumns, headStart)
	const leftWingPoints = generateWingPoints(leftWingSeats, wingRows, leftWingColumns, leftWingStart, -1)
	const rightWingPoints = generateWingPoints(rightWingSeats, wingRows, rightWingColumns, rightWingStart, 1)
	const crossPoints = generateCrossPoints(crossSeats, crossRows, crossColumns, crossStart)

	const points = []

	points.push(...fillSidePoints(headPoints, parliament.headBench))
	points.push(...fillSidePoints(leftWingPoints, parliament.left))
	points.push(...fillSidePoints(rightWingPoints, parliament.right))
	points.push(...fillSidePoints(crossPoints, parliament.crossBench))

	return {points, dimensions: {
		left, top, right, bottom, width, height
	}}
}

const pointToSVG = (point) => svg('circle', {
	cx: point.x,
	cy: point.y,
	r: point.r,
	fill: point.fill,
	class: point.party
})

const generate = (parliament) => {
	const chart = generateChart(parliament)
	const elements = chart.points.map(pointToSVG)
	const document = svg('svg', {
		viewBox: [chart.dimensions.left, chart.dimensions.top, chart.dimensions.width, chart.dimensions.height].join(',')
	}, elements)
	return document
}

module.exports = generate
