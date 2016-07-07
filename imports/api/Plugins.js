import { Serrurier } from 'meteor/svein:serrurier';
import { TaskTypes } from './TaskTypes';
import { AnnotationTypes } from './AnnotationTypes';
import { roles } from '../security';


/**
 * @class
 * @classdesc Configurable elements for experimentations
 */
export const Plugins = Serrurier.createClass({
    name: 'Plugins',
    fields: {
        /**
         * @type {TaskTypes}
         * @instance
         * @memberof Plugins#
         * @default new TaskTypes()
         */
        task: {
            type: TaskTypes,
            default: ()=> new TaskTypes()
        },
        /**
         * @type {AnnotationTypes}
         * @instance
         * @memberof Plugins#
         * @default new AnnotationTypes()
         */
        annotation: {
            type: AnnotationTypes,
            default: ()=> new AnnotationTypes()
        }
    },
    events: {
        beforeUpdate(e){
            if(!e.trusted && e.currentTarget === e.target){
                e.target.assertLoggedUserInRole_s(roles.project$MANAGER);
            }
        }
    }
});