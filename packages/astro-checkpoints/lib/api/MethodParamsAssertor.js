import MethodParamsAssertion from './MethodParamsAssertion';
import { Assertor } from './Assertor';
/**
 * @extends {Assertor}
 */
class MethodParamsAssertor extends Assertor {
    /**
     * @param {!object} config - An object holding the instantiation params
     * @param {!string} config.name
     * @param {!Function_predicate} config.doesAssertionFails - A function that takes the astro class instance method arguments to check them.
     * 'this' is bound to the {@link Assertion} it is being run in. To get the astro class instance, you need to use 'this.astroInstance' property.
     * @param {!string} config.reason
     * @param {!string} config.errorId
     * @param {Object.<string, meteor_match_pattern>=} config.matchPatterns - A dictionary of match patterns which keys are argument names
     * @param {Object<string, Array.<*>>=} config.includedAssertorDescriptors - Assertors this assertor depends on : a dictionary which keys are assertor names, and values are a list of arguments
     * to pass to the assertor {@link Function_predicate}
     */
    constructor(config){
        config.AssertionClass = MethodParamsAssertion;
        super(config);
    }
}

export default MethodParamsAssertor;