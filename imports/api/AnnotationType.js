import { MetaInfoType } from './MetaInfoType';
import { Serrurier } from 'meteor/svein:serrurier';

/**
 * @class
 * @extends MetaInfoType
 * @classdesc A type of annotation used to document events during experimentations
 */
export const AnnotationType = Serrurier.inheritClass( MetaInfoType, {
    name: 'AnnotationType',
    fields: {
        /**
         * @type {string}
         * @instance
         * @memberof AnnotationType#
         * @default ''
         */
        description: {
            type: String,
            default: ''
        }
    }
});