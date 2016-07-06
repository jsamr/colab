import { MetaInfoType } from './MetaInfoType';
import { Checkpoints } from 'meteor/svein:astro-checkpoints';

/**
 * @class
 * @extends MetaInfoType
 * @classdesc A type of annotation used to document events during experimentations
 */
export const AnnotationType = Checkpoints.inheritClass( MetaInfoType, {
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