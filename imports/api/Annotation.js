import { Mongo } from 'meteor/mongo';
import { Checkpoints } from 'meteor/svein:astro-checkpoints';

const annotations = new Mongo.Collection( 'plugins.annotations' );

const Annotation = Checkpoints.createClass({
    name:'Annotation',
    collection:annotations,
    secured:{
        insert:true,
        update:true,
        remove:true
    },
    fields:{},
    behaviors:{
        softremove:{
            removedFieldName:'_removed'
        }
    },
    indexes:{
        uniqRawMinutes:{
            fields:{
                rawMinutes:1,
                expId:1
            },
            options:{
                unique:true
            }
        }
    }
});

export default Annotation;