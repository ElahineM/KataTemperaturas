import {TemperatureCalculator} from "./index.js";
import {TemperatureConverter} from "./temperature-converter.js";

import {TEMPERATURE_SCALES} from "./utils.js"

describe("TemperatureCalculator",()=>{
    const converter = new TemperatureConverter();
   const calculator = new TemperatureCalculator(converter);

    it.each(
        [
            [ [{value: 56,scale: TEMPERATURE_SCALES.Celsius}, {value: 99,scale: TEMPERATURE_SCALES.Celsius}], {value:155, scale: TEMPERATURE_SCALES.Celsius} ],
            [ [{value: 22,scale: TEMPERATURE_SCALES.Kelvin}, {value: 10,scale: TEMPERATURE_SCALES.Fahrenheit}], {value:282.92777777777775, scale: TEMPERATURE_SCALES.Kelvin} ],
        ]
    )("should add and return correct value",(temperatures, temperaturesTotal)=>{
        
        expect(calculator.add(temperatures)).toEqual(temperaturesTotal);
    })
})