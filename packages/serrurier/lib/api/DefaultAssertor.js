import DefaultAssertion from './DefaultAssertion';
import { Assertor } from './Assertor';
/**
 * @extends {Assertor}
 */
class DefaultAssertor extends Assertor {
    /**
     * @extends {Assertor}
     * @param {!object} config - An object holding the instantiation params
     * @param {!string} config.name
     * @param {!Function_predicate} config.doesAssertionFails - A function that returns true if the assertion fails, and the method shall be interrupted, false otherwise.
     * 'this' is bound to the astro class instance.
     * @param {!string} config.reason
     * @param {Array.<meteor_match_pattern>=} config.matchPatterns - An array of match patterns to validate the doesAssertionFails method
     * @param {Object<string, Array.<*>>=} config.includedAssertorDescriptors - Assertors this assertor depends on : a dictionary which keys are assertor names, and values are a list of arguments
     * to pass to the assertor {@link Function_predicate}
     */
    constructor(config){
        config.AssertionClass = DefaultAssertion;
        super(config);
    }
}

export default DefaultAssertor;