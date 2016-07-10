import {
    decorateEvents,
    decorateMethods,
    decorateDescription
} from './lib/core';
import { once } from './lib/utils';
import { ActionsStore } from './lib/core';
import { chai } from 'meteor/practicalmeteor:chai';
const expect = chai.expect;

let func = function(){};
const wrapper = function( fun ){ return () => fun(); };

let descriptor = 'do';

describe( 'svein:serrurier-core', function(){

    describe('in the object`ActionsStore`', function(){
        describe( 'the method `ActionsStore.register`', function() {
            after( function() {
                ActionsStore.unregister( func );
            });
            it('should store the description property on addition', function() {
                ActionsStore.register( func, descriptor );
                expect( ActionsStore.getProp(func, 'descriptor') ).to.equal(descriptor)
            });
        });
        describe( 'the method `ActionsStore.update`', function(){
            after( function(){
                ActionsStore.unregister( wrapper );
            });
            it( 'should update action reference', function() {
                ActionsStore.register( func, descriptor );
                ActionsStore.update( wrapper, descriptor );
                expect( ActionsStore.getProp( wrapper, 'descriptor' ) ).to.equal( descriptor );
            });
        });
        describe( 'the method `ActionsStore.setProp`', function() {
            after( function() {
                ActionsStore.unregister( func );
            });
            it('should set any provided property', function() {
                const propName = 'testing';
                const propVal = 'test';
                ActionsStore.register( func, descriptor );
                ActionsStore.setProp( func, propName, propVal );
                expect(  ActionsStore.getProp( func, propName ) ).to.equal( propVal );
            });
        });
    });

    describe( 'the function `decorateEvents`', function() {
        let decoratedEvents1, decoratedEvents2;
        const beforeOnce = once( function() {
            const events1 = {
                'beforeA': function() {}
            };
            const events2 = {
                'beforeA': function() {},
                'beforeB': [ function(){}, function(){} ]
            };
            decoratedEvents1 = decorateEvents( events1, 'ClassTest1' );
            decoratedEvents2 = decorateEvents( events2, 'ClassTest2' );
        });
        before( beforeOnce );
        it( 'should wrap events declared as functions with array', function() {
            expect( decoratedEvents1 ).to.be.a('object');
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            expect( decoratedEvents1 ).to.have.property('beforeA').to.be.an.instanceof(Array);
        });
        it( 'should decorate events declared as Array of functions', function() {
            let array = decoratedEvents2.beforeA;
            array.forEach( function(value){ expect(value).to.be.an.instanceof(Function) } );
        });
    });
    describe( 'the function `decorateMethods`', function() {
        let decoratedMethods1, decoratedMethods2;
        const value = {};
        const beforeOnce = once( function() {
            const methods = {
                'actionA': function() { return value; },
                'actionB': function() { return value; }
            };
            decoratedMethods1 = decorateMethods( methods, 'ClassTest1' );
            decoratedMethods2 = decorateMethods( methods, 'ClassTest2' );
        });
        before( beforeOnce );
        it( 'should return a dictionary', function() {
            expect( decoratedMethods1 ).to.be.a('object');
        });
        it( 'should decorate all provided methods', function() {
            Object.keys( decoratedMethods2 ).forEach( function( decoratedMethodKey ) { expect( decoratedMethods2[decoratedMethodKey]() ).to.equal( value ) } );
        });
    });

});