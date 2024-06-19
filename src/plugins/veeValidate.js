import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min, confirmed } from '@vee-validate/rules';

export default function setupVeeValidate(app) {
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('confirmed', confirmed);

  configure({
    validateOnInput: true,
    validateOnBlur: true,
  });

  app.component('Field', Field);
  app.component('ValidationForm', Form);
  app.component('ErrorMessage', ErrorMessage);
}
