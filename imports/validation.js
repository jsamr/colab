import isURL from 'validator/lib/isURL'
import isInteger from 'lodash/isInteger'
import { Validator } from 'meteor/jagi:astronomy'
import i18n from 'meteor/universe:i18n'

function mustBeInt (validatorName) {
  return function (param) {
    if (!isInteger(param)) {
      throw new TypeError(
        `Parameter for the "${validatorName}" validator has to be an integer`
      )
    }
  }
}

function fetchFieldName (name) {
  return i18n.__(`validate.fields.${name}`)
}

Validator.create({
  name: 'url',
  parseParam () {},
  isValid ({ value }) {
    return isURL(value)
  },
  resolveError ({ nestedName }) {
    return i18n.__('validate.mustbe.url', { name: fetchFieldName(nestedName)})
  }
})

Validator.create({
  name: 'integer',
  parseParam () {},
  isValid ({ value }) {
    return isInteger(value)
  },
  resolveError ({ nestedName }) {
    return i18n.__('validate.mustbe.integer', { name: fetchFieldName(nestedName)})
  }
})

Validator.create({
  name: 'maxLength',
  parseParam: mustBeInt,
  isValid ({ value, param }) {
    return isInteger(value.length) && value.length <= param
  },
  resolveError ({ nestedName, param }) {
    return i18n.__('validate.mustbe.composedof', { name: fetchFieldName(nestedName) }) + i18n.__('restrictions.maxchar', { param })
  }
})

Validator.create({
  name: 'minLength',
  parseParam: mustBeInt,
  isValid ({ value, param }) {
    return isInteger(value.length) && value.length >= param
  },
  resolveError ({ nestedName, param }) {
    return i18n.__('validate.mustbe.composedof', { name: fetchFieldName(nestedName) }) + i18n.__('restrictions.minchars', { param })
  }
})

/**
 * A set of validation builders
 */
const validation = {
  /**
   * @desc Create a validator that accepts the null value or an integer
   * @return {{type: string, param: Array}}
   */
  nullOrInteger () {
    return {
      type: 'or',
      param: [
        {
          type: 'null'
        },
        {
          type: 'integer'
        }
      ]
    }
  },
  /**
   * @desc Create a validator that accepts strings of specified length range
   * @param minArg - The minimum length of the string to validate
   * @param maxArg - The minimum length of the string to validate
   * @return {{type: string, param: Array}}
   */
  minMaxLength (minArg, maxArg) {
    return {
      type: 'and',
      param: [
        {
          type: 'string'
        },
        {
          type: 'minLength',
          param: minArg
        },
        {
          type: 'maxLength',
          param: maxArg
        }
      ]
    }
  }
}

export default validation
