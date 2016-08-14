import i18n from 'meteor/universe:i18n'
import { T9n } from 'meteor/softwarerero:accounts-t9n'

/**
 * @param {String} language - the language to set
 * @returns {Promise} - A promise resolving when language is loaded
 */
export default function (language) {
  return new Promise((resolve) => {
    T9n.setLanguage(language)
    i18n.setLocale(language).then(() => resolve(language))
  })
}
