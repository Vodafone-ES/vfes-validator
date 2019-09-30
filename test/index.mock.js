import Validator from '../src/validator';

import { html } from './html.mock';

document.body.innerHTML = html;

const form = document.getElementById('form1');

export const validatorObj = new Validator(form, {
    customRules: {
        valueIs: (input, ruleValue) => {
            return input.value === ruleValue;
        },
    },
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
            valueIs: 'Antonio',
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
        'text-required': {
            valueIs: 'Parece que el nombre no es igual',
        },
        checkbox: {
            required: 'Checkeame el checkbox figurita',
        },
        radio: {
            required: 'Rodeame el radio figurita',
        },
    },
    onfocusout: true,
    errorClass: 'form-error',
});

validatorObj.init();
