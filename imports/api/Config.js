import '/imports/init-cadenas'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { Serrurier, cadenas, server } from 'meteor/svein:serrurier'
import { ensuresArg, IsNonEmptyString } from '../ensure'
import { Roles } from 'meteor/alanning:roles'
import { roles, propagateException, assertUserExists } from '../security'
import { EmailType, URLType, extendType } from '../astro-types'

const config = new Mongo.Collection('globalconfig')

export const SINGLETON_CONFIG_ID = '1'
const DEFAULT_VIDEO_SERVER_URL = 'http://localhost:5000/'
const DEFAULT_VIDEO_SERVER_ON = false
const DEFAULT_WHITELIST_VALUES = []
const DEFAULT_WHITELIST_ON = false
const DEFAULT_USERS_CAN_CREATE_PROJECT = false
const DEFAULT_RESPS_CAN_OPEN_INSCRIPTIONS = false

// noinspection JSValidateTypes
/**
 * A video server setup
 * @class VideoServerConfig
 */
export const VideoServerConfig = Serrurier.createClass({
  name: 'VideoServerConfig',
  /** @lends VideoServerConfig.prototype */
  fields: {
    /**
     * @name on
     * @type {boolean}
     * @default false
     */
    on: {
      type: Boolean,
      default: DEFAULT_VIDEO_SERVER_ON
    },
    /**
     * Must be a valid URL
     * @name url
     * @type {string}
     * @default 'http://localhost:5000/'
     */
    url: extendType({ default: DEFAULT_VIDEO_SERVER_URL }, URLType)
  }

})

/**
 * An authorized member
 * @class
 */
export const WhitelistEntry = Serrurier.createClass({
  name: 'WhitelistEntry',
  /** @lends WhitelistEntry.prototype */
  fields: {
    /**
     * Must be an email
     * @type {string}
     * @memberof WhitelistEntry#
     * @instance
     */
    mail: EmailType
  }
})

// noinspection JSValidateTypes
/**
 * A whitelist configuration object to authorize listed emails to register
 * @class
 */
export const WhitelistConfig = Serrurier.createClass({
  /** @ignore */
  name: 'WhitelistConfig',
  /** @lends WhitelistConfig*/
  fields: {
    /**
     * @type {boolean}
     * @memberof WhitelistConfig#
     * @instance
     * @default false
     */
    on: {
      type: Boolean,
      default: DEFAULT_WHITELIST_ON
    },
    /**
     * @type {WhitelistEntry[]}
     * @memberof WhitelistConfig#
     * @instance
     * @default []
     */
    values: {
      type: [WhitelistEntry],
      default: DEFAULT_WHITELIST_VALUES
    }
  }
})

// noinspection JSClosureCompilerSyntax,JSUnusedLocalSymbols,JSValidateTypes

/**
 * @class Config
 */
const Config = Serrurier.createClass({
  name: 'Config',
  collection: config,
  secured: {
    insert: true,
    update: false,
    remove: true
  },
  /** @lends Config.prototype */
  methods: {
    /**
     * @param {string} userId - The user id to give Admin privileges
     * @param {?Function_meteor_callback=} asyncCallback
     */
    @cadenas('matchParams', [ IsNonEmptyString ])
    @cadenas('loggedUserIsAdmin')
    @server()
    setUserAdmin (userId, asyncCallback = null) {
      assertUserExists(userId)
      Roles.addUsersToRoles(userId, roles.ADMIN)
    },

    /**
     * @param {string} userId - The user id to retain Admin privileges
     * @param {?Function_meteor_callback=} asyncCallback
     */
    @cadenas('argUserNotSelf')
    @cadenas('loggedUserIsAdmin')
    @server()
    unsetUserAdmin (userId, asyncCallback = null) {
      assertUserExists(userId)
      Roles.removeUsersFromRoles(userId, roles.ADMIN)
    },

    registeringAllowed () {},

    @server()
    resendVerificationEmail () {
      return 'Lolilol'
    }
  },
  /** @lends Config.prototype */
  fields: {
    /**
     * @type {boolean}
     * @default false
     */
    usersCanCreateProject: {
      type: Boolean,
      default: DEFAULT_USERS_CAN_CREATE_PROJECT
    },
    /**
     * @type {boolean}
     * @default false
     */
    respsCanOpenInscriptions: {
      type: Boolean,
      default: DEFAULT_RESPS_CAN_OPEN_INSCRIPTIONS
    },
    /**
     * @type {VideoServerConfig}
     */
    videoServer: {
      type: VideoServerConfig,
      default: () => new VideoServerConfig()
    },
    /**
     * @desc Cannot be seen by non-admins.
     * @type {WhitelistConfig}
     */
    whitelist: {
      type: WhitelistConfig,
      default: () => new WhitelistConfig()
    }
  },
  events: {
    // TODO create 'forbidden' annotation
    beforeRemove (/* e */) {
      propagateException({ reason: 'client.config.remove.forbidden', exceptionId: 'removeForbidden' })
    },
    // @cadenas('loggedUserIsAdmin')
    beforeUpdate (e) {},
    beforeInsert (e) {
      // force Config to singleton
      if (Meteor.isServer) e.target._id = SINGLETON_CONFIG_ID
      // prevent client side insertion
      if (!e.trusted) propagateException({ reason: 'client.config.insert.forbidden', exceptionId: 'updateForbidden' })
    }
  }
})

/**
 *
 * @return {Config}
 */
export const getConfig = function () {
  /** @type {Config} */
  const conf = Config.findOne()
  ensuresArg('Getting config singleton', conf, Config)
  return conf
}

export default Config

