import { decorateDescription,  registerMaker, ActionsStore, lockApi as lockCoreApi } from './core';
import SecurityException from './SecurityException';
import Logger from './Logger';
import ValidationError from './ValidationError';
import { lockApi as lockMakeSecureApi, registerReporter, publishServerReporter, subscribeServerReporter } from './makers/make-secure';
const setLogLevel = Logger.setLevel;

function lockApi() {
    lockCoreApi();
    lockMakeSecureApi();
    Logger.silence();
}

export {
    ActionsStore,
    SecurityException,
    decorateDescription,
    registerMaker,
    Logger,
    ValidationError,
    lockApi,
    setLogLevel,
    registerReporter,
    publishServerReporter,
    subscribeServerReporter
};
