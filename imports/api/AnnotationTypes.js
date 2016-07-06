import { MetaInfoTypes } from './MetaInfoTypes';
import { AnnotationType } from './AnnotationType';
import { roles } from '../security';
//noinspection JSClosureCompilerSyntax
/**
 *
 * @class
 * @classdesc A set of {@link AnnotationType}
 * @extends {MetaInfoTypes}
 */
export const AnnotationTypes=MetaInfoTypes.inherit({
    name:'AnnotationTypes',
    fields:{
        /**
         * @type {AnnotationType[]}
         * @instance
         * @memberof AnnotationTypes#
         * @default []
         */
        _types:{
            type:[AnnotationType],
            default:[]
        }
    },
    methods:{
        /**
         * @instance
         * @memberof AnnotationTypes#
         * @return {Class.<TaskType>} The AnnotationType Class.
         */
        getTypeClass(){
            return AnnotationType;
        }
    },
    events:{
        beforeUpdate(e){
            if(!e.trusted){
                e.target.assertLoggedUserInRole_s(roles.project$editAnnotationType);
            }
        }
    }
});