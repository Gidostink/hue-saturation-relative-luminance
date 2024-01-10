# hue-saturation-relative-luminance
hue-saturation-relative-luminance is a package that allows you to control Hue, Saturation, and Relative Luminance as if it where a color space.

This is different than Hue Saturation Lightness (HSL). Rather, it conforms to [W3's definition of Relative Luminance in WCAG22](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance).

## Installation

Using npm:
```shell
npm install hue-saturation-relative-luminance
```

Then, in your Node.js code:
```js
import hueSatLum from 'hue-saturation-relative-luminance';
```

## How to Use This Module

```js
import hueSatLum from 'hue-saturation-relative-luminance';

const desiredHue = 180;
const desiredSaturation = 0.8;
const desiredRelativeLuminance = 0.7;

const result = hueSatLum(desiredHue, desiredSaturation, desiredRelativeLuminance);

console.log(result.hex) // '#65eeee'
console.log(result.sRGB) // [0.3953125, 0.9328125, 0.9328125]
console.log(result.RGB255) // [101, 238, 238]
```

### Type Definitions: 
```ts
function hueSaturationRelativeLuminance(
	inputHue: number, //0-360 (Modulated)
	inputSaturation: number, //0-1 (Clamped)
	inputRelativeLuminance: number //0-1 (Clamped)
): hueSaturationRelativeLuminanceResult

type hueSaturationRelativeLuminanceResult = {
	hex: string, //This is a string containing the hex code of the result.
	RGB255: [number, number, number] //All of these are whole numbers ranging between 0 and 255.
	sRGB: [number, number, number] //All of these are decimal numbers between 0 and 1.
}
```

### Using the Module's Function

Simply use the imported function with the parameters `inputHue`, `inputSaturation`, and `inputRelativeLuminance` to get an object containing RGB values that closely fit the inputs.

`inputHue` is modulated into a range of 0-360 degrees, just like you'd expect color hue to behave.

`inputSaturation` and `inputRelativeLuminance` are both clamped within 0 and 1.

### Using the Function's Returned Object

The function returns an object containing the properties `.hex`, `.RGB255`, and `.sRGB`.

`.hex` is the resulting RGB values as a string, encoded in hexadecimal. It always begins with a `#`, followed by six hexadecimal characters. This is most useful in CSS, or anywhere hexadecimal strings are accepted.

`.RGB255` is the resulting RGB values, all ranging from 0 to 255, rounded to the nearest integer. This is often the format needed for displays to show your color, and is great for both CSS and image manipulation.

`.sRGB` is the resulting RGB values, all between 0 and 1. This is most most percise output, and is great if you need to do additional math or convert the result to a different format.

## Extra Exported Functions
There are 2 functions that are used internally that are exported for convenience.

### getRelativeLuminance(inputSRGB: [number, number, number]): number
```javascript
import { getRelativeLuminance } from 'hue-saturation-relative-luminance';

console.log(getRelativeLuminance([0.3953125, 0.9328125, 0.9328125])) //0.6999244338098827
```
This function takes in an array of three sRGB values (between 0 and 1), then returns the relative luminance of those RGB values. No values are clamped in this process.

### HSLtoSRGB(inputHue: number, inputSaturation: number, inputLightness: number): SRGBColor
```javascript
import { HSLtoSRGB } from 'hue-saturation-relative-luminance';

const desiredHue = 180;
const desiredSaturation = 0.8;
const desiredLightness = 0.7;

console.log(HSLtoSRGB(desiredHue, desiredSaturation, desiredLightness)); //[ 0.4599999999999999, 0.94, 0.94 ]
```
This function takes in a Hue, Saturation, and a Lightness value and returns an array of three sRGB values. The input hue is modulated into a range of 0-360 degrees, just like you'd expect color hue to behave.

## Examples & Usecases

### Guaranteeing Contrast on Text With Custom Colors
```js
import HueSatLum from 'hue-saturation-relative-luminance';

let originalHue = 240; //Assumed to be the hue input by the user. 
let originalSaturation = 1.0; //Assumed to be the saturation input by the user. 

//In our web app, the background of the page is pitch black, so a pure blue will be too hard to read.
//Let's change that.

let result = HueSatLum(originalHue, originalSaturation, 0.5)

console.log(result.hex) // '#b5b5ff'
//This is perfect to insert into the style data of our web app.
``` 

### Guaranteeing Contrast on Text With Custom Colors without Unnessassary Changes.
```js
import HueSatLum from 'hue-saturation-relative-luminance';
import { getRelativeLuminance, HSLtoSRGB } from 'hue-saturation-relative-luminance';

let originalHue = 180; //Assumed to be the hue input by the user. 
let originalSaturation = 1.0; //Assumed to be the saturation input by the user. 

//This time, an aqua color is quite easy to read in our web app's black background. So we don't want to change it.
//Instead, we'll check if it passes a minimum relative luminance level.

function increaseContrastIfLow(inputHue, inputSaturation) {

    let originalColor = HSLtoSRGB(inputHue, inputSaturation, 0.5);

    if (getRelativeLuminance(originalColor) > 0.5) {

        return HueSatLum(inputHue, inputSaturation, getRelativeLuminance(originalColor))

    } else {

        return HueSatLum(inputHue, inputSaturation, 0.5);

    }

}

let result = increaseContrastIfLow(originalHue, originalSaturation)

console.log(result.hex) // '#00ffff'
//This is perfect to insert into the style data of our web app.
```

## Issues
If you find any bugs, problems, or ways to improve this package, consider [creating an issue on GitHub](https://github.com/Gidostink/hue-saturation-relative-luminance/issues). I'll be happy to help!