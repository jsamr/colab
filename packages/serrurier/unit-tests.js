import { Assertion } from './lib/api/Assertion'
import SecurityException from './lib/SecurityException';
import ValidationError from './lib/ValidationError';
import MethodParamsAssertion from './lib/api/MethodParamsAssertion';
import DefaultAssertion from './lib/api/DefaultAssertion';
import MethodParamsAssertor from './lib/api/MethodParamsAssertor';
import DefaultAssertor from './lib/api/DefaultAssertor';
import assert from './lib/assert-decorator';
import { decoratorMock } from 'meteor/svein:serrurier-decorators-core/lib/utils';
import _ from 'lodash';
import { chai } from 'meteor/practicalmeteor:chai';

const expect = chai.expect;
const getMethodName = () => 'methodName';
const verboseReason = 'This is some verbose reason justifying why the assertion failed';

const alwaysFailing = {
    doesAssertionFails: (arg1) => {
        return arg1;
    },
    reason: 'I always fail.',
    matchPatterns: {
        arg1: String
    }
};
const alwaysPassing = {
    doesAssertionFails: () => {
        return null;
    },
    reason: 'I always pass.'
};
const alwaysFailingDefaultAssertor = new DefaultAssertor( _.extend({
        name: 'alwaysFailingDefaultAssertor'
    }, alwaysFailing )
);
const alwaysPassingDefaultAssertor = new DefaultAssertor( _.extend({
        name: 'alwaysPassingDefaultAssertor'
    }, alwaysPassing )
);
const alwaysFailingMethodParamsAssertor = new MethodParamsAssertor( _.extend({
        name: 'alwaysFailingMethodParamsAssertor'
    }, alwaysFailing )
);
const alwaysPassingMethodParamsAssertor = new MethodParamsAssertor( _.extend({
        name: 'alwaysPassingMethodParamsAssertor'
    }, alwaysPassing )
);
const methodArgMustBeAStringAssertor = new MethodParamsAssertor({
    name: 'methodArgMustBeAStringAssertor',
    doesAssertionFails: (methodArg) => {
        return typeof methodArg !== 'string';
    },
    reason:'Target method argument should be a string'

});

describe('svein:serrurier', function() {
    describe('in a `DefaultAssertor` instance', function () {
        describe('the method `toAssertion`', function () {
            let assertion = alwaysFailingDefaultAssertor.toAssertion( [verboseReason], getMethodName );
            it( 'should return a `DefaultAssertion` instance', function () {
                expect(assertion).to.be.an.instanceof(DefaultAssertion);
            });
            it( 'should throw a `ValidationError` when it is called with a wrong number of elements in `assertorArgs` array argument', function () {
                expect(function () {
                    alwaysFailingDefaultAssertor.toAssertion([], getMethodName)
                }).to.throw(ValidationError);
            });
        });
    });
    describe('in a `MethodParamsAssertor` instance', function () {
        describe('the method `toAssertion`', function () {
            let alwaysFailing = alwaysFailingMethodParamsAssertor.toAssertion( [verboseReason], getMethodName );
            let alwaysPassing = alwaysPassingMethodParamsAssertor.toAssertion( [verboseReason], getMethodName );
            it('should return a `MethodParamsAssertion` instance', function () {
                expect(alwaysFailing).to.be.an.instanceof(MethodParamsAssertion);
            });
            it('should throw a `ValidationError` when it is called with a wrong number of elements in `assertorArgs` array argument', function () {
                expect(function () {
                    alwaysFailingMethodParamsAssertor.toAssertion([], getMethodName )
                }).to.throw(ValidationError);
            });
            it('should return a falsy value when the `doesAssertionFails` method returns a null value', function () {
                let t = expect(alwaysPassing.perform(null, [])).not.to.be.ok;
            });
        });
    });
    describe('in a `DefaultAssertion` instance', function () {
        describe('the method `perform`', function () {
            let alwaysFailing = alwaysFailingDefaultAssertor.toAssertion( [verboseReason], getMethodName );
            let alwaysPassing = alwaysPassingDefaultAssertor.toAssertion( [verboseReason], getMethodName );
            it('should return an security report of type object with fields `errorId` and `reason` when  the `doesAssertionFails` method returns a non null value', function () {
                expect(alwaysFailing.perform( null, []) ).to.be.a( 'object' ).to.have.property( 'reason' );
                expect(alwaysFailing.perform( null, []) ).to.be.a( 'object' ).to.have.property( 'errorId' );
            });
            it('should return a falsy value when the `doesAssertionFails` method returns a null value', function () {
                let t = expect(alwaysPassing.perform(null, [])).not.to.be.ok;
            });
        });
    });
    describe('in a `MethodParamsAssertion` instance', function () {
        describe('the method `perform`', function () {
            let alwaysFailing = alwaysFailingMethodParamsAssertor.toAssertion( [verboseReason], getMethodName );
            let alwaysPassing = alwaysPassingMethodParamsAssertor.toAssertion( [verboseReason], getMethodName );
            it('should return an security report of type object with fields `errorId` and `reason` when the `doesAssertionFails` method returns a non null value', function () {
                expect( alwaysFailing.perform(null, []) ).to.be.a( 'object' ).to.have.property( 'reason' );
                expect( alwaysFailing.perform(null, []) ).to.be.a( 'object' ).to.have.property( 'errorId' );
            });
            it('should return a falsy value when the `doesAssertionFails` method returns a null value', function () {
                let t = expect(alwaysPassing.perform(null, [])).not.to.be.ok;
            });
        });
    });
    describe('a method decorated with `assert`', function () {
        describe('describing a `DefaultAssertor` instance', function () {
            it('should throw an error of type `SecurityException` when the bound assertion fails ', function () {
                let targetCandidate = {
                    someMethod: function () { }
                };
                decoratorMock( targetCandidate, 'someMethod', assert( 'alwaysFailingDefaultAssertor', 'assertion argument 1' ));
                expect(function () {
                    targetCandidate.someMethod();
                }).to.throw(SecurityException);
            });
        });
        describe('describing a `MethodParamsAssertor` instance', function () {
            let targetCandidate = {
                someMethod: function () { }
            };
            decoratorMock( targetCandidate, 'someMethod', assert( 'methodArgMustBeAStringAssertor' ));
            it('should throw an error of type `SecurityException` when the bound assertion fails ', function () {
                expect(function () {
                    // must fail because the first argument is not a string
                    targetCandidate.someMethod( {} );
                }).to.throw( SecurityException );
            });

            it('should not throw an error of type `SecurityException` when the bound assertion passes ', function () {
                expect(function () {
                    // must passes because the first argument is a string
                    targetCandidate.someMethod( 'methodArgument1' );
                }).not.to.throw( SecurityException );
            });
        });

    });
    describe('a method decorated with multiple `assert`s', function () {
        it('should apply all those assertions', function () {
            let targetCandidate1 = {
                someMethod: function () {}
            };
            // mock the @decorator
            decoratorMock( targetCandidate1, 'someMethod', assert( 'alwaysFailingDefaultAssertor', 'assertion argument 1' ));
            decoratorMock( targetCandidate1, 'someMethod', assert( 'alwaysPassingDefaultAssertor', 'assertion argument 1' ));
            let targetCandidate2 = {
                someMethod: function () {}
            };
            // mock the @decorator
            decoratorMock( targetCandidate2, 'someMethod', assert( 'alwaysPassingDefaultAssertor', 'assertion argument 1' ));
            decoratorMock( targetCandidate2, 'someMethod', assert( 'alwaysFailingDefaultAssertor', 'assertion argument 1' ));
            expect( function () {
                targetCandidate1.someMethod();
            }).to.throw( SecurityException );
            expect( function () {
                targetCandidate2.someMethod();
            }).to.throw( SecurityException );
        });
    });
});