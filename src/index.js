import Validator from './validator';

const form = document.getElementById('form1');

const validator = new Validator(form, {
  rules: {
    cif: {
      cif: true,
    },
    nie: {
      nie: true,
    },
    nif: {
      nif: true,
    },
    email: {
      email: true,
    },
    cp: {
      cp: true,
    },
    number: {
      digits: true,
    },
    'text-required': {
      required: true,
      minlength: 2,
      maxlength: 8,
    },
    checkbox: {
      required: true,
    },
    radio: {
      required: true,
    },
  },
  messages: {
    checkbox: {
      required: 'Checkeame el checkbox figurita',
    },
    radio: {
      required: 'Rodeame el radio',
    },
  },
  errorClass: 'form-error',
});

validator.init();
