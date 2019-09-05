import cif from './rules/cif.js';
import nif from './rules/nif.js';
import nie from './rules/nie.js';
import cp from './rules/cp.js';
import digits from './rules/digits.js';
import email from './rules/email.js';
import minlength from './rules/minLength.js';
import maxlength from './rules/maxLength.js';
import required from './rules/required.js';

const rulesController = {
    cif(input, r) {
        return cif(input.value.trim()) && r;
    },

    nif(input, r) {
        return nif(input.value.trim()) && r;
    },

    nie(input, r) {
        return nie(input.value.trim()) && r;
    },

    cp(input, r) {
        return cp(input.value.trim()) && r;
    },

    digits(input, r) {
        return digits(input.value.trim()) && r;
    },

    email(input, r) {
        return email(input.value.trim()) && r;
    },

    minlength(input, r) {
        return minlength(input.value.trim(), r);
    },

    maxlength(input, r) {
        return maxlength(input.value.trim(), r);
    },

    required(input, r) {
        return required(input) && r;
    },
};

export default rulesController;
