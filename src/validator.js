import rulesController from './rulesController';
import defaultMesages from './defaultMessages';

export default class Validator {
    constructor(form, options) {
        this.form = form;
        this.errorList = [];
        this.errorClass = options.errorClass && typeof options.errorClass === 'string' ? options.errorClass : '';
        this.messages = options.messages && typeof options.messages === 'object' ? options.messages : {};
        this.rules = options.rules && typeof options.rules === 'object' ? options.rules : {};
        this.onfocusout = options.onfocusout && typeof options.onfocusout === 'boolean' ? options.onfocusout : false;
        this.onFocusoutEventListener = this.onFocusoutHandler.bind(this);
        this.onSubmitEventListener = this.onSubmitHandler.bind(this);
    }

    /**
     * @function isRadio
     *
     * @description Comprobamos que el input que recibirmos es de tipo radio.
     *
     * @param { HTMLElemnt } input - input del formulario
     *
     * @returns { Boolean }
     */
    isRadio(input) {
        return input.type === 'radio';
    }

    /**
     * @function isCheckbox
     *
     * @description Comprobamos que el input que recibirmos es de tipo checkbox.
     *
     * @param { HTMLElemnt } input - input del formulario
     *
     * @returns { Boolean }
     */
    isCheckbox(input) {
        return input.type === 'checkbox';
    }

    /**
     * @function isStringRule
     *
     * @description Comprobamos si la regla de validación que recibimos es una cadena.
     *
     * @param { String } rule - regla que queremos validar
     *
     * @returns { Boolean }
     */
    isStringRule(rule) {
        return typeof rule === 'string';
    }

    /**
     * @function isRuleFalse
     *
     * @description Devolvemos el valor de la función de validación.
     *
     * @param { String } v - valor del input
     * @param { String } r - nombre de la regla
     * @param { Object } rules - conjunto de reglas asociadas al input
     *
     * @returns { Boolean }
     */
    isRuleFalse(v, r, rules) {
        return !rulesController[r](v, rules[r]);
    }

    /**
     * @function execRule
     *
     * @description Ejecutamos la función de validación especificada para validar que el input cumple las reglas.
     *
     * @param { String } ruleName - nombre de la regla que queremos utilizar
     * @param { String } v - valor del input
     * @param { String } r - valor de la regla
     *
     * @returns { Boolean }
     */
    execRule(ruleName, input, r) {
        return rulesController[ruleName] ? rulesController[ruleName](input, r) : true;
    }

    /**
     * @function hasErrors
     *
     * @description Comprobamos si existen errores registrados.
     *
     * @returns { Boolean }
     */
    hasErrors() {
        return this.errorList.length > 0;
    }

    /**
     * @function showErrors
     *
     * @description Mostramos en el HTML los errores que previamente hemos registrado.
     *
     * @returns { undefined }
     */
    showErrors() {
        const mod = this;

        mod.errorList.forEach(err => {
            const daddy = err.input.parentElement;
            const [firstError] = err.errors;

            if (mod.errorClass) {
                daddy.classList.add(mod.errorClass);
            }

            daddy.querySelector('[data-form-message]').innerHTML = firstError;
        });
    }

    /**
     * @function clearError
     *
     * @description Limpiamos los errores del input indicado.
     *
     * @param { HTMLElement } input - input del formulario
     *
     * @returns { undefined }
     */
    clearError(input) {
        const msg = input.parentElement.querySelector('[data-form-message]');
        msg.innerHTML = '';

        this.errorList = this.errorList.filter(obj => obj.input !== input);
    }

    /**
     * @function setErrorList
     *
     * @description Añadimos a la lista de errores los que pertenecen al input que recibimos.
     *
     * @param { HTMLElement } input - input del formulario
     * @param { Array } errors - array de errores asociados al input
     *
     * @returns { undefined }
     */
    setErrorList(input, errors) {
        this.errorList.push({
            input,
            errors,
        });
    }

    /**
     * @function getRules
     *
     * @description Obtenemos las reglas del input.
     *
     * @param { String } name - name del input
     *
     * @returns { Object }
     */
    getRules(name) {
        return this.rules[name];
    }

    /**
     * @function getErrorMessage
     *
     * @description Devolvemos el mensaje de error asociado al input y si no hay un mensaje asociado se utiliza un mensaje por defecto.
     *
     * @param { String } inputName - name del input
     * @param { String } v - valor de la regla
     * @param { Object } r - nombre de la regla
     *
     * @returns { String }
     */
    getErrorMessage(inputName, v, r) {
        let msg = this.messages[inputName] && this.messages[inputName][r] ? this.messages[inputName][r] : defaultMesages[r];

        msg = this.isStringRule(msg) ? msg : msg(v);

        return msg || null;
    }

    /**
     * @function getInput
     *
     * @description Devolvemos el input en base a su name y en caso de los radios el que está seleccionado.
     *
     * @param { String } name - name de los inputs
     *
     * @returns { HTMLElement }
     */
    getInput(param) {
        const mod = this;
        let input = typeof param === 'string' ? mod.form.querySelector(`[name="${param}"]`) : param;

        if (input) {
            if (mod.isRadio(input)) {
                const aux = mod.form.querySelector(`[name="${input.name}"]:checked`);
                input = aux || input;
            }

            return input;
        }
        return null;
    }

    /**
     * @function clearFormErrors
     *
     * @description Limpiamos todos los errores del formulario.
     *
     * @returns { undefined }
     */
    clearFormErrors() {
        const mod = this;

        if (mod.errorClass) {
            [].forEach.call(mod.form.querySelectorAll(`.${mod.errorClass}`), box => {
                box.classList.remove(mod.errorClass);
                mod.clearError(box.querySelector('input'));
            });
        } else {
            Object.keys(mod.rules).forEach(name => {
                const input = mod.getInput(name);

                if (input) {
                    mod.clearError(input);
                }
            });
        }
    }

    /**
     * @function registerErrors
     *
     * @description Añadimos todos los errores de los campos que no cumplen las reglas asociadas a ellos.
     *
     * @param { Object } rules - reglas asociadas al input
     * @param { HTMLElement } input - input del formulario
     *
     * @returns { undefined }
     */
    registerErrors(rules, input) {
        const mod = this;
        const errors = [];

        Object.keys(rules).forEach(ruleName => {
            if (!mod.execRule(ruleName, input, rules[ruleName])) {
                const error = mod.getErrorMessage(input.name, rules[ruleName], ruleName);

                if (error) {
                    errors.push(error);
                }
            }
        });

        if (errors.length > 0) {
            mod.setErrorList(input, errors);
        }
    }

    /**
     * @function validateInput
     *
     * @description Validar el input que recibimos.
     *
     * @param { HTMLElement } input - input del formulario
     *
     * @returns { undefined }
     */
    validateInput(input) {
        const mod = this;
        const rules = mod.getRules(input.name);

        if (rules) {
            mod.registerErrors(rules, input);
            mod.showErrors();
        }
    }

    /**
     * @function validate
     *
     * @description Validar el input que recibimos o, en caso de no recibir nada, validamos sobre todos los input.
     *
     * @param { HTMLElement } input - input del formulario
     *
     * @returns { Object }
     */
    validate() {
        const mod = this;

        Object.keys(mod.rules).forEach(name => {
            const auxInput = mod.getInput(name);

            if (auxInput) {
                mod.validateInput(auxInput);
            }
        });

        if (mod.hasErrors()) {
            mod.showErrors();
            return {
                isOk: false,
                countError: mod.errorList.length,
            };
        }

        return { isOk: true };
    }

    /**
     * @function onSubmitHandler
     *
     * @description Controlamos el submit del formulario.
     *
     * @param { Object } ev - ev lanzado por el submit del formulario
     *
     * @returns { undefined }
     */
    onSubmitHandler(ev) {
        const mod = this;

        ev.preventDefault();

        mod.clearFormErrors();

        if (mod.validate().isOk) {
            mod.form.submit();
        }
    }

    onFocusoutHandler(ev) {
        const mod = this;
        const input = ev.target;

        mod.clearError(input);
        mod.validateInput(input);
    }

    /**
     * @function init
     *
     * @description Inicializamos el módulo.
     *
     * @returns { undefined }
     */
    init() {
        const mod = this;

        mod.form.addEventListener('submit', mod.onSubmitEventListener);

        if (mod.onfocusout) {
            Object.keys(mod.rules).forEach(name => {
                const input = mod.getInput(name);

                if (input) {
                    input.addEventListener('focusout', this.onFocusoutEventListener);
                }
            });
        }
    }
}
