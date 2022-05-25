import {TEMPERATURE_SCALES} from  "./utils.js";

export class TemperatureConverter{

    #scales = {
        [TEMPERATURE_SCALES.Kelvin]: this.#celsiusToKelvin,
        [TEMPERATURE_SCALES.Fahrenheit]: this.#celsiusToFahrenheit,
        [TEMPERATURE_SCALES.Celsius]: (temperature)=> temperature,
    }


    convertTemperature({temperature, scale}){
        const celsiusTemperature = this.#toCelsius(temperature);
        return this.#scales[scale](celsiusTemperature);
    }

    #toCelsius({scale, value}){
        const celsiusMappers = {
            [TEMPERATURE_SCALES.Kelvin]: (kelvins)=> kelvins -273.15,
            [TEMPERATURE_SCALES.Fahrenheit]: (fahrenheits)=> (fahrenheits - 32) / 1.8
        }

        const mapper = celsiusMappers[scale];
        const celsius = mapper ? mapper(value) : value;
        return {value: celsius, scale: TEMPERATURE_SCALES.Celsius};
    }

    #celsiusToKelvin({value}){
        const kelvins = value  + 273.15;
        return {value: kelvins, scale: TEMPERATURE_SCALES.Kelvin}
    }

    #celsiusToFahrenheit({value}){
        const fahrenheits = value * 1.8 + 32;
        return {value: fahrenheits, scale: TEMPERATURE_SCALES.Fahrenheit};
    }
}