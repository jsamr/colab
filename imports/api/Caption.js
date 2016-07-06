import { Mongo } from 'meteor/mongo';
import { Checkpoints } from 'meteor/svein:astro-checkpoints';

const captions=new Mongo.Collection('plugins.captions');

const Caption=Checkpoints.createClass({
    name:'Caption',
    collection:captions,
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
        uniqPlaces:{
            fields:{
                place:1,
                expId:1
            },
            options:{
                unique:true
            }
        }
    }
});

export default Caption ;