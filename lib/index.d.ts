export type hueSaturationRelativeLuminanceResult = {
    hex: string;
    RGB255: [number, number, number];
    sRGB: [number, number, number];
};
type SRGBColor = [number, number, number];
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
export declare function hueSaturationRelativeLuminance(inputHue: number, inputSaturation: number, inputRelativeLuminance: number): hueSaturationRelativeLuminanceResult;
/**
 *
 * Calculates and returns the relative luminance of the input RGB values.
 *
 * @param inputSRGB An array of three numbers. They are expected to be within 0 and 1, and are NOT clamped.
 * @return A number, usually ranging between 0 and 1, of the relative luminance of the input RGB values.
 *
 */
export declare function getRelativeLuminance(inputSRGB: [number, number, number]): number;
/**
 *
 * @param inputHue The hue of the color, ranging from 0 inclusively to 360 exclusively. Numbers outside of this range will be modulated within the range.
 * @param inputSaturation The hue of the color, ranging from 0 inclusively to 1 inclusively. Numbers outside of this range will be clamped within the range.
 * @param inputLightness The lightness of the color, ranging from 0 inclusively to 1 inclusively. Numbers outside of this range will be clamped within the range.
 * @returns An array with three numbers, ranging from 0 inclusively to 1 inclusively, corresponding to red, green, and blue sRGB values.
 *
 */
export declare function HSLtoSRGB(inputHue: number, inputSaturation: number, inputLightness: number): SRGBColor;
export default hueSaturationRelativeLuminance;
