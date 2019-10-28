import Validator from './validator.js';

const vfes = {
    _validator: Validator,
};

window.vfes = { ...window.vfes, ...vfes };
