import {TemperatureConverter} from "./temperature-converter.js";

export class TemperatureCalculator{
    #converter;

    constructor(converter){
        this.#converter = converter; 
    }

    add(temperatures){
       const equalsTemperatures =  this.#converTemperatures(temperatures);
       const temperaturesTotal =  equalsTemperatures.reduce((acc, currentTemperature)=> acc + currentTemperature.value, 0);
       return {value: temperaturesTotal, scale: equalsTemperatures[0].scale}
    }

    subtract(temperatures){
        const equalsTemperatures = this.#converTemperatures(temperatures);
        const temperaturesTotal = equalsTemperatures
        .map(({value})=> value)
        .reduce((acc, currentTemperature) => acc - currentTemperature)

        return {value: temperaturesTotal, scale: equalsTemperatures[0].scale}
    }

    multiply(temperatures){
        const equalsTemperatures = this.#converTemperatures(temperatures);
        const temperaturesTotal =  equalsTemperatures        
        .map(({value})=> value)
        .reduce((acc, currentTemperature)=> acc * currentTemperature);

        return {value: temperaturesTotal, scale: equalsTemperatures[0].scale} 
    }

    divide(temperatures){
        const equalsTemperatures = this.#converTemperatures(temperatures);
        
        const hasZero = equalsTemperatures.some(({value})=> value === 0);

        if(hasZero){
            throw new Error("Zero division error");
        }

        const temperaturesTotal = equalsTemperatures
        .map(({value})=> value)
        .reduce((acc, currentTemperature)=> acc / currentTemperature);

        return {value:temperaturesTotal, scale: equalsTemperatures[0].scale}
    }

   #converTemperatures([firstTemperature, ...temperatures]){
    const equalsTemperatures =  temperatures.map((currentTemperature)=>{
        return currentTemperature === firstTemperature.scale 
        ? currentTemperature 
        : this.#converter.convertTemperature({temperature: currentTemperature, newScale: firstTemperature.scale})
    })

    return [firstTemperature, ...equalsTemperatures];
   }
}

const converter = new TemperatureConverter();
const calculator = new TemperatureCalculator(converter);

// console.log(calculator.add([{scale: "F", value: 33}, {scale:"C", value:77}]))
console.log(calculator.add([{scale: "K", value: 22}, {scale:"F", value:10}]))

