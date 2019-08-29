// import isValidCif from './rules/cif';
import isValidNIF from './rules/nif';
// import nie from './rules/nie';
// import cp from './rules/cp';
// import minLength from './rules/minLength';
// import maxLength from './rules/maxLength';

export default class Validator {
  constructor(form, options) {
    this.form = form;

    this.errorList = [];

    this.messages = options.messages ? options.messages : {};

    this.onFocusout = options.onfocusout ? options.onfocusout : null;

    this.rules = options.rules ? options.rules : {};
  }

  init() {
    isValidNIF('R9095581F');
    /* const mod = this;
		let names = Object.keys(mod.options.rules);

		mod.form.addEventListener('submit', mod.onSubmitController);

		if(mod.options.onfocusout) {
			names.forEach(name => {
				mod.onFocusOutController(mod.form.querySelector(`[name="${name}"]`), mod.options.rules[name]);
			});
		} */
  }

  /* onFocusOutHandler(input, rules) {
		input.addEventListener('focusout', this.applyRules(input, rules));
	}

	onSubmitHandler(ev) {
		ev.preventDefault();

		this.validated ? this.form.submit() : null;
	}

	checkRules() {
		const mod = this;

		Object.keys(mod.options.rules).forEach(name => {
			mod.
		});
	}

	applyRules(input, rules) {

	} */
}
