import {TemperatureConverter} from "./temperature-converter.js"
import {OPERATIONS} from "./utils.js";

export class TemperatureCalculator{
    #converter;

    #operationsMap = {
        [OPERATIONS.Add]: this.#add,
        [OPERATIONS.Subtract]: this.#subtract,
        [OPERATIONS.Multitply]: this.#multiply,
        [OPERATIONS.Divide]: this.#divide,
    }

    constructor(converter){
        this.#converter = converter;
    }

    operate({temperatures, operation}){
       const equalsTemperatures = this.#transformTemperature(temperatures);
       const temperatureValues = equalsTemperatures.map(({value})=> value);

       const scale = temperatures[0].scale;
       const value = this.#operationsMap[operation](temperatureValues);

       return {value, scale};
    }

    #add(temperatures){
        return temperatures.reduce((acc, currentTemperature)=> acc + currentTemperature );
    }

    #subtract(temperatures){
        return temperatures.reduce((acc, currentTemperature)=> acc - currentTemperature);
    }

    #multiply(temperatures){
        return temperatures.reduce((acc, currentTemperature)=> acc * currentTemperature);
    }

    #divide(temperatures){
        const hasZero = temperatures.includes(0);

        if(hasZero){
            throw new Error("Zero division error");
        }

        return temperatures.reduce((acc, currentTemperature)=> acc / currentTemperature);
    }

    #transformTemperature([firstTemperature, ...temperatures]){
        const equalsTemperatures = temperatures.map((currentTemperature)=>{
            return currentTemperature === firstTemperature.scale
            ? currentTemperature
            : this.#converter.convertTemperature({temperature: currentTemperature, scale: firstTemperature.scale})
        });

        return [firstTemperature, ...equalsTemperatures];
    }
}
