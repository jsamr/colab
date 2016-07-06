import { Type } from 'meteor/jagi:astronomy';
import assign from 'lodash/assign';
import './validation';


/**
 * @param {object} object - the object to copy fields in
 * @param {object} typedesc   - the type descriptor whose type to extend
 */
export const extendType=(object, typedesc)=> assign(object, typedesc);

export const EmailType = Object.freeze({
    type:String,
    validators:[{
        type:'email'
    }]
});

export const URLType = Object.freeze({
    type:String,
    validators:[{
        type:'url'
    }]
});
