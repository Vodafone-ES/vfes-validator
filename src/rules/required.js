/**
 * @function isRadio
 *
 * @description Comprobamos que el input que recibirmos es de tipo radio.
 *
 * @param { HTMLElemnt } input - input del formulario
 *
 * @returns { Boolean }
 */
function isRadio(input) {
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
function isCheckbox(input) {
    return input.type === 'checkbox';
}

export default input => {
    if (isRadio(input) || isCheckbox(input)) {
        return input.checked;
    }
    return input.value !== '';
};
