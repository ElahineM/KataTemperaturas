import {TEMPERATURE_SCALES} from "./utils.js";

export class TemperatureConverter{

    #scalesMappers = {
        [TEMPERATURE_SCALES.Kelvin]: this.#celsiusToKelvin,
        [TEMPERATURE_SCALES.Fahrenheit]: this.#celsiusToFahrenheit,
        [TEMPERATURE_SCALES.Celsius]: (temperature) => temperature
    }

    convertTemperature({newScale, temperature}){
        const celsiusTemperature = this.#toCelsius(temperature);
        return this.#scalesMappers[newScale](celsiusTemperature);
    }


    #toCelsius(temperature){
        const celsiusMappers = {
            [TEMPERATURE_SCALES.Kelvin]: (kelvins) => kelvins - 273.15,
            [TEMPERATURE_SCALES.Fahrenheit]: (fahrenheits) => (fahrenheits -32) / 1.8
        }

        const mapper = celsiusMappers[temperature.scale];
        const value = mapper ? mapper(temperature.value) : temperature.value;
        return {scale: TEMPERATURE_SCALES.Celsius, value };
    }

    #celsiusToKelvin(temperature){
        const value = temperature.value + 273.15;
        return {value, scale: TEMPERATURE_SCALES.Kelvin};
    }

    #celsiusToFahrenheit(temperature){
        const value = temperature.value * 1.8 + 32;
        return {value, scale: TEMPERATURE_SCALES.Fahrenheit};
    }
}