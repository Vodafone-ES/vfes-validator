import Validator from './validator';

const form = document.getElementById('form1');

const validator = new Validator(form, {
  rules: {
    inputName: {},
    inputName2: {},
  },
  messages: {
    inputName: {},
    inputName2: {},
  },
});

validator.init();
