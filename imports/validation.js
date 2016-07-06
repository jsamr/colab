import isURL from 'validator/lib/isURL';
import isInteger from 'lodash/isInteger';
import { Validator } from 'meteor/jagi:astronomy';


function mustBeInt(validatorName){
    return function (param){
        if (!isInteger(param)) {
            throw new TypeError(
                `Parameter for the "${validatorName}" validator has to be an integer`
            );
        }
    }
}


Validator.create({
    name:'url',
    parseParam(){},
    isValid({ value }){
        return isURL(value);
    },
    resolveError({ name }){
        return `${name} must be a valid URL`;
    }
});

Validator.create({
    name:'integer',
    parseParam(){},
    isValid({ value }){
        return isInteger(value);
    },
    resolveError({ name }){
        return `${name} must be an integer`;
    }
});

Validator.create({
    name:'maxLength',
    parseParam:mustBeInt,
    isValid({ value,param }){
        return isInteger(value.length) && value.length <= param
    },
    resolveError({ name,param }){
        return `${name} must be composed of maximum ${param} characters`;
    }
});

Validator.create({
    name:'minLength',
    parseParam:mustBeInt,
    isValid({ value,param }){
        return isInteger(value.length) && value.length >= param
    },
    resolveError({ name,param }){
        return `${name} must be composed of minimum ${param} characters`;
    }
});

/**
 * A set of validation builders
 */
export default validation = {
    /**
     * @desc Create a validator that accepts the null value or an integer
     * @return {{type: string, param: Array}}
     */
    nullOrInteger(){ return {
        type:'or',
        param: [
            {
                type:'null'
            },
            {
                type:'integer'
            }
        ]
    };
    },
    /**
     * @desc Create a validator that accepts strings of specified length range
     * @param minArg - The minimum length of the string to validate
     * @param maxArg - The minimum length of the string to validate
     * @return {{type: string, param: Array}}
     */
    minMaxLength(minArg,maxArg){ return {
        type:'and',
        param:[
            {
                type:'string'
            },
            {
                type:'minLength',
                param:minArg
            },
            {
                type:'maxLength',
                param:maxArg
            }
        ]
    }
    }
};