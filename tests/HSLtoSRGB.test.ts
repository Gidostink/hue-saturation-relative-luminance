import {HSLtoSRGB} from "../lib/index.js"

test("Pure Blue", () => {

	const target = 1.0;

	const result = HSLtoSRGB(120,1,0.5)

	expect(result[0]).toBeCloseTo(0);
	expect(result[1]).toBeCloseTo(1);
	expect(result[2]).toBeCloseTo(0);

});

test("Purpleish", () => {

	const target = 1.0;

	const result = HSLtoSRGB(242,0.33,0.43)

	expect(result[0]).toBeCloseTo(0.294117647);
	expect(result[1]).toBeCloseTo(0.28627451);
	expect(result[2]).toBeCloseTo(0.57254902);

});