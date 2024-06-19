import * as VeeValidate from 'vee-validate';
import * as VeeRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';

export default function setupVeeValidate(app) {
  // Define Rules from VeeRules
  Object.keys(VeeRules).forEach(rule => {
    if (typeof VeeRules[rule] === 'function') {
      VeeValidate.defineRule(rule, VeeRules[rule]);
    }
  });

  // Localize VeeValidate
  localize({
    en: {
      messages: {
        ...en.messages,
        required: (required) => `This ${required.field} field is required`,
        email: 'Please enter a valid email address',
        min: ( min ) => `This field must have at least ${min.rule.params} characters`,
        max: ( max ) => `This field must have at most ${max.rule.params} characters`,
        numeric: (numeric) => `This ${numeric.field} field must be a number`,
        confirmed: 'The confirmation does not match'
      },
    },
  });

  // Configure VeeValidate
  VeeValidate.configure({
    generateMessage: localize('en'),
    validateOnInput: true,
    validateOnBlur: true,
  });

  // Register VeeValidate components
  app.component('Field', VeeValidate.Field);
  app.component('ValidationForm', VeeValidate.Form);
  app.component('ErrorMessage', VeeValidate.ErrorMessage);
}
