import { Checkpoints } from 'meteor/svein:astro-checkpoints';
import valid from '../validation';

/**
 * @class
 * @classdesc An abstract class representing a type of contextual information relative to an experimentation
 */
export const MetaInfoType=Checkpoints.createClass({
    name:'MetaInfoType',
    fields:{
        /**
         * @type {string}
         * @instance
         * @memberof MetaInfoType#
         */
        name:String,
        /**
         * @type {string}
         * @instance
         * @memberof MetaInfoType#
         * @desc Css color
         */
        color:String,
        /**
         * @type {number}
         * @instance
         * @memberof MetaInfoType#
         * @desc Unique identifier, must be an integer.
         */
        _id:{
            type:Number,
            validators:[{
                type:'integer'
            }]
        },
        /**
         * @type {number}
         * @instance
         * @memberof MetaInfoType#
         * @desc Parent unique identifier in the Type tree, must be an integer or null.
         * A type with a parentId to null is an abstract type.
         * A type with a non-null parentId is a concrete type.
         */
        parentId:{
            type:Number,
            validators:[valid.nullOrInteger()],
            optional:true,
            default:null
        }
    }
});