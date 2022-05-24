import {TemperatureConverter} from "./temperature-converter.js"

const converter = new TemperatureConverter();

export class TemperaturesCalculator{


    operate({temperatures, operation}){
        const [firstTemperature,secondTemperature] = temperatures;
        const secondOperationValue = firstTemperature.scale === secondTemperature.scale 
        ? secondTemperature.value 
        : this.convertTemperature({temperature: secondTemperature, newScale: firstTemperature.scale});
        
    }

    #add(firstTemperature, secondTemperature){
        return firstTemperature + secondTemperature;
    }

    convertTemperature({temperature, newScale}){
        return converter.convertTemperature({temperature, newScale});
    }
}

const calculator = new TemperaturesCalculator();

calculator.operate({temperatures: [{value:30, scale:"C"}, {value: 55, scale: "F"}]});


