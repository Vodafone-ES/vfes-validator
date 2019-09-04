import cif from './rules/cif';
import nif from './rules/nif';
import nie from './rules/nie';
import cp from './rules/cp';
import digits from './rules/digits';
import email from './rules/email';
import minlength from './rules/minLength';
import maxlength from './rules/maxLength';
import required from './rules/required';

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
