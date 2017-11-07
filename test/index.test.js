require('jest');
const path = require('path');
const fs = require('fs');
const stringify = require('virtual-dom-stringify');
const svg = require('..');
const svgson = require('svgson');

const parliament = {
	"headBench": {
		"speaker": {
			"seats": 1,
			"color": "#000"
		}
	},
	"left": {
		"labour": {
			"seats": 1,
			"color": "#dc241f"
		},
		"snp": {
			"seats": 1,
			"color": "#ff0"
		},
		"libdems": {
			"seats": 1,
			"color": "#faa61a"
		},
		"sinnfein": {
			"seats": 1,
			"color": "#080"
		},
		"plaidcymru": {
			"seats": 1,
			"color": "#008142"
		},
		"green": {
			"seats": 1,
			"color": "#6ab023"
		},
		"independent": {
			"seats": 1,
			"color": "#aadfff"
		}
	},
	"crossBench": {
		"dup": {
			"seats": 1,
			"color": "#d46a4c"
		}
	},
	"right": {
		"conservative": {
			"seats": 1,
			"color": "#0087dc"
		}
	}
};
const fixuturesPath = path.join(__dirname, '__fixtures__');
let jsonResult;
let jsonTested;

it('test one seats', () => {
    const svgTested = stringify(svg(parliament));
    svgson(svgTested, {}, r => jsonTested = r);

    //convert svg from HTML file to JSON 
    const initHtml = fs.readFileSync(path.join(fixuturesPath, 'index.html')).toString();
    document.documentElement.innerHTML = initHtml;
    const svgResult = document.getElementById('target').innerHTML;
    svgson(svgResult, {}, r => jsonResult = r);

    expect(jsonTested).toEqual(jsonResult);
})
