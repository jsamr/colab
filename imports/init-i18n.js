import i18n from 'meteor/universe:i18n';
import { T9n } from 'meteor/softwarerero:accounts-t9n'

T9n.setLanguage('fr')
i18n.setLocale('fr').then(function(){
  console.info('LOCALE SET TO FR')
})