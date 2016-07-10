import { Serrurier } from 'meteor/svein:serrurier';
import { MetaInfoType } from './MetaInfoType';
import _ from 'lodash';
import { ensures } from 'meteor/svein:serrurier-core';

function hasParent ( tsk ){
    return _.isInteger( tsk.parentId );
}
//noinspection JSClosureCompilerSyntax
/**
 * @class
 * @classdesc A set of {@link MetaInfoType}
 * @implements SecuredClass
 */
export const MetaInfoTypes = Serrurier.createClass({
    name: 'MetaInfoTypes',
    methods: {
        /**
         * @desc push a new type
         * @param {!MetaInfoType} type
         * @param {!Array.<Number>=} childrenIds - An array of numbers corresponding to children Ids of this type instance
         * @param {boolean=} forceId - If true, don't build up an inferred id.
         * @memberof MetaInfoTypes#
         * @instance
         */
        pushType(type, childrenIds=[], forceId=false){
            const action=`${this.getTypeName()}#pushType`;
            // perform security checks
            ensures(action, type, this.getTypeClass());
            ensures(action, childrenIds, Array);
            if(_.includes(this.getAllTypesIds(), type._id)) throw new TypeError('Cannot push a type which id already exists.');
            const depends=_.partial(_.includes, childrenIds);
            // infer id
            if (!forceId) {
                type._id=0;
                let ids = this.getAllTypesIds();
                ids.push(0);
                type._id = _.max(ids) + 1;
                type.validate();
            } else {
                type.validate();
            }
            this._types.push(type);
            // refer children
            if(childrenIds.length) {
                _(this._types)
                    .filter(depends)
                    .forEach((child) => {
                        child.parentId=type._id;
                    });
            }
        },
        /**
         * @desc Remove type and update children's parentIds to this type parentId
         * @memberof MetaInfoTypes#
         * @instance
         * @param {Number|MetaInfoType} type - The type or unique identifier to be removed
         * @throws {ReferenceError} When no matching type corresponds to the provided id.
         */
        removeType(type){
            let fetched,
                isChild=(type)=>type._id === fetched._id;
            if(type instanceof this.getTypeClass()){
                fetched= _.find(this._types, (tp) => tp._id === type._id);
            } else if(_.isInteger(type)){
                fetched=_.find(this._types, (id) => id === type );
            } else throw new TypeError(`Argument 'type' must be of type String or instanceof ${this.getTypeName()}`);
            if(!fetched) throw new ReferenceError(`No ${this.getTypeName()} found matching id ${type._id||type}`);
            _.pull(this._types, fetched);
            // update children parentId to this type parentId
            _(this._types).filter(isChild).forEach((child) => {
                child.parentId=type.parentId;
            });
        },
        /**
         * @desc Update type
         * @memberof MetaInfoTypes#
         * @instance
         * @param {!MetaInfoType} type - The type or unique identifier to be removed
         * @throws {ReferenceError} When no matching type corresponds to the provided type.
         */
        updateType(type){
            const action=`${this.getTypeName()}#updateType`;
            ensures(action, type, this.getTypeClass());
            const index = _.findIndex(this._types, _.pick(type, '_id'));
            if(index !== -1) this._types.splice(index, 1, type);
            else throw new ReferenceError(`No ${this.getTypeName()} found with id ${type._id}`);
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {Class} The Astronomy class the collection is made of.
         */
        getTypeClass(){
            return MetaInfoType;
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {string} Associated type name
         */
        getTypeName(){
            //noinspection JSCheckFunctionSignatures
            return this.getTypeClass().getName();
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {number[]}
         */
        getAllTypesIds(){
            return _(this._types).map('_id').value();
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {MetaInfoType[]}
         */
        getAllTypes(){
            return this._types;
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {number[]} - Concrete types ids, i.e. with parentId
         * @see MetaInfoType#parentId
         */
        getConcreteTypesIds(){
            //noinspection JSCheckFunctionSignatures
            return _(this._types).filter(hasParent).map('_id').value();
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {number[]} - Abstract types ids, i.e. without parentId
         * @see MetaInfoType#parentId
         */
        getAbstractTypesIds(){
            //noinspection JSCheckFunctionSignatures
            return _(this._types).reject(hasParent).map('_id').value();
        },
        /**
         * @instance
         * @memberof MetaInfoTypes#
         * @return {MetaInfoType[]} - Concrete types, i.e. with parentId
         * @see MetaInfoType#parentId
         */
        getConcreteTypes(){
            return _(this._types).filter(hasParent).sortBy('_id').value();
        }
    },
    fields: {
        /**
         * @type {MetaInfoType[]}
         * @instance
         * @memberof MetaInfoTypes#
         * @default []
         * @private
         */
        _types: {
            type: [MetaInfoType],
            default: []
        }
    }
});