import {TemperatureConverter} from "./temperature-converter.js"
import {TemperatureCalculator} from "./index";
import { OPERATIONS, TEMPERATURE_SCALES } from "./utils.js";


describe("TemperatureCalculator",()=>{
    const converter = new TemperatureConverter();
    const calculator = new TemperatureCalculator(converter);

    it.each(
        [
            [ [{value: 56, scale: TEMPERATURE_SCALES.Kelvin}, {value: 99, scale: TEMPERATURE_SCALES.Kelvin}], {value: 155, scale: TEMPERATURE_SCALES.Kelvin} ],
            [ [{value: 30, scale: TEMPERATURE_SCALES.Celsius}, {value: 104, scale: TEMPERATURE_SCALES.Fahrenheit}], {value: 70, scale: TEMPERATURE_SCALES.Celsius} ],
            [ [{value: 100, scale: TEMPERATURE_SCALES.Fahrenheit}, {value: 400, scale: TEMPERATURE_SCALES.Kelvin}, {value: 5, scale: TEMPERATURE_SCALES.Celsius}], {value: 401.33000000000004, scale: TEMPERATURE_SCALES.Fahrenheit} ]

        ])("should add %o and return %s",(temperatures, expectedTemperature)=>{
            const operationResult = calculator.operate({temperatures, operation: OPERATIONS.Add});

            expect(operationResult).toEqual(expectedTemperature);
        })
    

})