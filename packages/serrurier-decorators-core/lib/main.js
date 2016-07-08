import { decorateDescription,  registerMaker, ActionsStore, lockApi as lockCoreApi } from './core';
import Logger from './Logger';
import {
    lockApi as lockMakeSecureApi,
    registerReporter,
    publishServerReporter,
    subscribeServerReporter
} from './makers/make-secure';

const setLogLevel = Logger.setLevel;

function lockApi() {
    lockCoreApi();
    lockMakeSecureApi();
    Logger.silence();
}

export {
    ActionsStore,
    decorateDescription,
    registerMaker,
    Logger,
    lockApi,
    setLogLevel,
    registerReporter,
    publishServerReporter,
    subscribeServerReporter
};
