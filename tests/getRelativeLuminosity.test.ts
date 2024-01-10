import {getRelativeLuminance} from "../lib/index.js"

test("Pure White", () => {
	const result = getRelativeLuminance([1,1,1])

	expect(result).toBeCloseTo(1);

});

test("Pure Blue", () => {
	const result = getRelativeLuminance([0,0,1])

	expect((1+0.05)/(result+0.05)).toBeCloseTo(8.59);

});