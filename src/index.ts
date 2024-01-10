export type hueSaturationRelativeLuminanceResult = {
	
	hex: string,
	RGB255: [number, number, number]
	sRGB: [number, number, number]

}

type SRGBColor = [number, number, number]

const RGBLUMINANCEMULTIPLIERS = [0.2126, 0.7152, 0.0722]

/**
 * 
 * Returns an object containing RGB values closely fitting the desired hue, saturation, and relative luminance provided.
 * 
 * @param inputHue The hue of the color, ranging from 0 inclusively to 360 exclusively. Numbers outside of this range will be modulated within the range.
 * @param inputSaturation The hue of the color, ranging from 0 inclusively to 1 inclusively. Numbers outside of this range will be clamped within the range.
 * @param inputRelativeLuminance The desired relative luminance of the color, ranging from 0 inclusively to 1 inclusively. Numbers outside of this range will be clamped within the range.
 * @returns An object containing three ways of recieving the final color result. Use the properties `.hex`, `.RGB255`, `.sRGB`, or to access the final color result.
 * 
 * Check the README.md file included with the package for more information, including examples.
 * You can find the package's README at {@link https://www.npmjs.com/package/hue-saturation-relative-luminance}.
 * 
 */
export function hueSaturationRelativeLuminance(
	inputHue: number,
	inputSaturation: number,
	inputRelativeLuminance: number
): hueSaturationRelativeLuminanceResult {

	//Make sure the hue number is reasonable.
	inputHue %= 360

	//Make sure the hue number is positive.
	if (inputHue < 0) {

		inputHue += 360;

	}

	inputSaturation = clamp(inputSaturation, 0, 1);
	inputRelativeLuminance = clamp(inputRelativeLuminance, 0, 1);

	let min: number = 0;
	let max: number = 1;

	let closestGuess: SRGBColor = [0,0,0];
	let closestDistance: number = 1

	while(max - min > 0.0005) {

		const guess = (max + min) / 2;

		const newSRGB = HSLtoSRGB(inputHue, inputSaturation, guess);

		const newRelativeLuminance = getRelativeLuminance(newSRGB);
		const guessDistance = Math.abs(newRelativeLuminance - inputRelativeLuminance)

		if (guessDistance<closestDistance) {

			closestGuess = newSRGB;
			closestDistance = guessDistance;

		}

		if (newRelativeLuminance===inputRelativeLuminance) {

			break;

		}

		if (newRelativeLuminance>inputRelativeLuminance) {

			max = guess;

		} else {

			min = guess;

		}

	}

	let hexCode = "#";

	closestGuess.forEach((sRGBValue) => {

		let appendHex = Math.round(sRGBValue*255).toString(16);

		if (appendHex.length<2) {

			appendHex = "0" + appendHex;

		}

		hexCode += appendHex;

	})

	return {

		hex: hexCode,
		RGB255: [Math.round(closestGuess[0]*255), Math.round(closestGuess[1]*255), Math.round(closestGuess[2]*255)],
		sRGB: closestGuess


	}

}

/**
 * 
 * Calculates and returns the relative luminance of the input RGB values.
 * 
 * @param inputSRGB An array of three numbers. They are expected to be within 0 and 1, and are NOT clamped.
 * @return A number, usually ranging between 0 and 1, of the relative luminance of the input RGB values.
 * 
 */
export function getRelativeLuminance(inputSRGB: [number, number, number]): number {

	let relativeLuminosity = 0.0;

	inputSRGB.forEach((value, index) => {

		let colorStrength = Math.pow((value+0.055)/1.055, 2.4);

		if (value <= 0.04045) {

			colorStrength = value/12.92;

		}

		relativeLuminosity += colorStrength * RGBLUMINANCEMULTIPLIERS[index]

	})

	return relativeLuminosity;

}

/**
 * 
 * @param inputHue The hue of the color, ranging from 0 inclusively to 360 exclusively. Numbers outside of this range will be modulated within the range.
 * @param inputSaturation The hue of the color, ranging from 0 inclusively to 1 inclusively. Numbers outside of this range will be clamped within the range.
 * @param inputLightness The lightness of the color, ranging from 0 inclusively to 1 inclusively. Numbers outside of this range will be clamped within the range.
 * @returns An array with three numbers, ranging from 0 inclusively to 1 inclusively, corresponding to red, green, and blue sRGB values.
 * 
 */
export function HSLtoSRGB(inputHue: number, inputSaturation: number, inputLightness: number): SRGBColor {

	//Make sure the input hue is within range.
	inputHue %= 360;

	//If the input hue is negative, add 360 to it.
	if (inputHue < 0) {

		inputHue += 360;

	}

	inputSaturation = clamp(inputSaturation, 0, 1);
	inputLightness = clamp(inputLightness, 0, 1);

	const maxColor = (1 - Math.abs(2 * inputLightness - 1)) * inputSaturation;
	const minColor = maxColor * (1 - Math.abs((inputHue/60) % 2 - 1))

	const additiveValue = inputLightness - maxColor/2;

	let SRGB: SRGBColor;

	switch(true) {

		case inputHue >= 300:
			SRGB = [maxColor, 0, minColor]
			break;
		
		case inputHue >= 240:
			SRGB = [minColor, 0, maxColor]
			break;
		
		case inputHue >= 180:
			SRGB = [0, minColor, maxColor]
			break;
		
		case inputHue >= 120:
			SRGB = [0, maxColor, minColor]
			break;
		
		case inputHue >= 60:
			SRGB = [minColor, maxColor, 0]
			break;
		
		default:
			SRGB = [maxColor, minColor, 0]
			break;
		
	}

	SRGB.forEach((value, index) => {

		SRGB[index] = value + additiveValue;

	})

	return SRGB;

}

/**
 * 
 * @param inputNumber {number} The number to be clamped.
 * @param min {number} The minimum returned value of the inputNumber.
 * @param max {number} The maximum returned value of the inputNumber.
 * 
 * @returns The inputNumber, clamped to a minimum of {min} and a maximum of {max}
 *
 */
function clamp(inputNumber: number, min: number, max: number): number {

	return Math.max(Math.min(inputNumber, max), min);

}

export default hueSaturationRelativeLuminance;