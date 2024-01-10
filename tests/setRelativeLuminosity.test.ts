import { error } from "console";
import HSRL from "../lib/index.js"
import { getRelativeLuminance } from "../lib/index.js";

test("Pure White to 0.5", () => {

	const target = 0.5;

	const result = HSRL(0, 0, target)
	
	expect(getRelativeLuminance(result.sRGB)).toBeCloseTo(target);

	expect(Math.round(result.sRGB[0] * 255)).toBe(result.RGB255[0])
	
	expect(Math.round(result.sRGB[1] * 255)).toBe(result.RGB255[1])

	expect(Math.round(result.sRGB[2] * 255)).toBe(result.RGB255[2])

	expect(Number.parseInt(result.hex.substring(1,3), 16)).toBe(result.RGB255[0]);

	expect(Number.parseInt(result.hex.substring(3,5), 16)).toBe(result.RGB255[1]);

	expect(Number.parseInt(result.hex.substring(5,7), 16)).toBe(result.RGB255[2]);

});

test("Pure Blue to 1.0", () => {

	const target = 1.0;
	
	const result = HSRL(240, 1, target)
	
	expect(getRelativeLuminance(result.sRGB)).toBeCloseTo(target);

	expect(Math.round(result.sRGB[0] * 255)).toBe(result.RGB255[0])
	
	expect(Math.round(result.sRGB[1] * 255)).toBe(result.RGB255[1])

	expect(Math.round(result.sRGB[2] * 255)).toBe(result.RGB255[2])
	
	expect(Number.parseInt(result.hex.substring(1,3), 16)).toBe(result.RGB255[0]);

	expect(Number.parseInt(result.hex.substring(3,5), 16)).toBe(result.RGB255[1]);

	expect(Number.parseInt(result.hex.substring(5,7), 16)).toBe(result.RGB255[2]);

});

test("Pure Red to 0.7", () => {

	const target = 0.7;

	const result = HSRL(0, 1, target)

	expect(getRelativeLuminance(result.sRGB)).toBeCloseTo(target);

	expect(Math.round(result.sRGB[0] * 255)).toBe(result.RGB255[0])
	
	expect(Math.round(result.sRGB[1] * 255)).toBe(result.RGB255[1])

	expect(Math.round(result.sRGB[2] * 255)).toBe(result.RGB255[2])
	
	expect(Number.parseInt(result.hex.substring(1,3), 16)).toBe(result.RGB255[0]);

	expect(Number.parseInt(result.hex.substring(3,5), 16)).toBe(result.RGB255[1]);

	expect(Number.parseInt(result.hex.substring(5,7), 16)).toBe(result.RGB255[2]);

});

test("Somewhat Cyan to 0.2", () => {

	const target = 0.2;

	const result = HSRL(100, 80, target)

	expect(getRelativeLuminance(result.sRGB)).toBeCloseTo(target);

	expect(Math.round(result.sRGB[0] * 255)).toBe(result.RGB255[0])
	
	expect(Math.round(result.sRGB[1] * 255)).toBe(result.RGB255[1])

	expect(Math.round(result.sRGB[2] * 255)).toBe(result.RGB255[2])
	
	expect(Number.parseInt(result.hex.substring(1,3), 16)).toBe(result.RGB255[0]);

	expect(Number.parseInt(result.hex.substring(3,5), 16)).toBe(result.RGB255[1]);

	expect(Number.parseInt(result.hex.substring(5,7), 16)).toBe(result.RGB255[2]);

});

test("Somewhat Desaturated Red to 0.6", () => {

	const target = 0.6;

	const result = HSRL(0, 0.6, target)

	expect(getRelativeLuminance(result.sRGB)).toBeCloseTo(target);

	expect(Math.round(result.sRGB[0] * 255)).toBe(result.RGB255[0])
	
	expect(Math.round(result.sRGB[1] * 255)).toBe(result.RGB255[1])

	expect(Math.round(result.sRGB[2] * 255)).toBe(result.RGB255[2])
	
	expect(Number.parseInt(result.hex.substring(1,3), 16)).toBe(result.RGB255[0]);

	expect(Number.parseInt(result.hex.substring(3,5), 16)).toBe(result.RGB255[1]);

	expect(Number.parseInt(result.hex.substring(5,7), 16)).toBe(result.RGB255[2]);

});