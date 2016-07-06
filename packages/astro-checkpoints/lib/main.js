import { Class } from 'meteor/jagi:astronomy';
import server from './server-decorator';
import assert from './assert-decorator';
import './api/default-assertions';
import { decorateDescription } from 'meteor/svein:astro-decorators-core'

import { Assertor } from './api/Assertor';
import DefaultAssertor from './api/DefaultAssertor';
import MethodParamsAssertor from './api/MethodParamsAssertor';

const Checkpoints = {
    createClass(description ) {
        return Class.create( decorateDescription( description ) );
    },
    inheritClass( Clazz, description ) {
        return Class.inherit.call( Clazz, decorateDescription( description ) );
    },
    extendClass( Clazz, description ) {
        return Class.extend.call( Clazz, decorateDescription( description ) );
    }
};

export {
    server,
    assert,
    Checkpoints,
    DefaultAssertor,
    MethodParamsAssertor
};

export default {
    server,
    assert,
    Checkpoints
};