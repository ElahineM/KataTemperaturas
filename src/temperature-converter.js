import {TEMPERATURE_SCALES} from "./utils.js";

export class TemperatureConverter{
    scalesDictionary = {
        [TEMPERATURE_SCALES.Kelvin]:this.#celsiusToKelvin,
        [TEMPERATURE_SCALES.Fahrenheit]: this.#celsiusToFahrenheit,
    }

    convertTemperature({temperature, newScale}){
        const celsiusTemperature = this.#toCelsius(temperature); 
        return newScale !== TEMPERATURE_SCALES.Celsius ? this.scalesDictionary[newScale](celsiusTemperature) : celsiusTemperature;
    }

    #toCelsius(temperature){
        const mappers = {
            [TEMPERATURE_SCALES.Kelvin]: (kelvins) => kelvins - 273.15,
            [TEMPERATURE_SCALES.Fahrenheit]: (fahrenheits) => (fahrenheits - 32) / 1.8,
        };
        const mapper = mappers[temperature.scale];
        return mapper ? mapper(temperature.value) : temperature.value;
    }

    #celsiusToKelvin(celsius){
        return celsius + 273.15;
    }
    

    #celsiusToFahrenheit(celsius){
        return celsius * 1.8 + 32
    }
}