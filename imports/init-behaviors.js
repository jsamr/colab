import { Class, Behavior } from 'meteor/jagi:astronomy';
const partitionRoot={
    name: 'partitionRoot',
    options: {},
    createClassDefinition() {
        return {
            methods: {
                /**
                 * @function
                 * @name PartitionClass#getPartition
                 * @return {role_partition}
                 *
                 */
                getPartition() {
                    return `${this.constructor.getName().toLowerCase()}s.${this._id}`;
                }
            }
        }
    },
    apply( Class ) {
        Class.extend( this.createClassDefinition(), ['methods'] );
    }
};

Behavior.create( partitionRoot );