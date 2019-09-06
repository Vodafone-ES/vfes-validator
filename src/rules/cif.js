// La primera letra del CIF solo puede ser una de las siguientes.
const initLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'N', 'P', 'Q', 'R', 'S', 'U', 'V', 'W'];
// Para que el digito de control sea obligatoriamente una letra, el CIF ha de empezar por una de las siguientes:
const endLetterIf = ['P', 'Q', 'R', 'S', 'W'];
// Para que el digito de control sea obligatoriamente un numero, el CIF ha de empezar por una de las siguientes:
const endNumIf = ['A', 'B', 'E', 'H'];
// La letra del dígito de control se basa en la posición del siguiente array:
const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

/**
 * @function getFirstLetter
 *
 * @description Recogemos el primer caracter del CIF.
 *
 * @param {String} cif - CIF
 *
 * @returns {String} primer caracter del CIF.
 */
function getFirstLetter(cif) {
    return cif.substr(0, 1);
}

/**
 * @function getProvDigits
 *
 * @description Recogemos los dígitos provinciales del CIF.
 *
 * @param {String} cif - CIF
 *
 * @returns {String} dígitos provinciales.
 */
function getProvDigits(cif) {
    return cif.substr(1, 3);
}

/**
 * @function getControlDigit
 *
 * @description Recogemos el dígito de control del CIF.
 *
 * @param {String} cif - CIF
 *
 * @returns {String} dígitos de control.
 */
function getControlDigit(cif) {
    return cif.substr(cif.length - 1);
}

/**
 * @function getDigits
 *
 * @description Recogemos los dígitos con los que vamos a calcular el dígito de control del CIF.
 *
 * @param {String} cif - CIF
 *
 * @returns {String} dígitos de control.
 */
function getDigits(cif) {
    return cif.substr(1, cif.length - 2);
}

/**
 * @function hasCorrectLength
 *
 * @description Comprobamos si el CIF proporcionado tiene un tamaño correcto de 9 digitos.
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function hasCorrectLength(cif) {
    return cif.length === 9;
}

/**
 * @function hasCorrectFirstLetter
 *
 * @description Comprobamos si la primera letra del CIF proporcionado está dentro de las letras permitidas
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function hasCorrectFirstLetter(cif) {
    return initLetter.includes(cif.substr(0, 1));
}

/**
 * @function canCalcControl
 *
 * @description Comprobamos si los 7 dígitos a partir de la primera letra son todo números con los que poder calcular el dígito de control.
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function canCalcControl(cif) {
    return !isNaN(getDigits(cif));
}

/**
 * @function isNotResident
 *
 * @description Comprobamos si el CIF pertenece a una persona que no es residente.
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function isNotResident(cif) {
    return getProvDigits(cif) === '00';
}

/**
 * @function sumDigits
 *
 * @description Sumamos los dígitos de un número.
 *
 * @param {Num} num - Número del cual sumaremos los dígitos.
 *
 * @returns {Number} número del dígito de control.
 */
function sumDigits(num) {
    let y = 0;

    String(num)
        .split('')
        .forEach(x => {
            y += parseInt(x);
        });

    return y;
}

/**
 * @function calcControlDigit
 *
 * @description Calculamos el dígito de control.
 *
 * @param {String} cif - CIF
 *
 * @returns {Number} número del dígito de control.
 */
function calcControlDigit(cif) {
    const arDigs = getDigits(cif).split('');
    let sum = 0;

    for (let i = 0; i < arDigs.length; i += 1) {
        let dig = parseInt(arDigs[i]);

        if (i % 2 === 0) {
            dig *= 2;

            sum += dig > 9 ? sumDigits(dig) : dig;
        } else {
            sum += dig;
        }
    }

    sum %= 10;

    return sum === 0 ? 0 : 10 - sum;
}

/**
 * @function controlMustBeLetter
 *
 * @description Comprobamos si el dígito de control del CIF debería ser una letra.
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function controlMustBeLetter(cif) {
    return endLetterIf.includes(getFirstLetter(cif) || isNotResident(cif));
}

/**
 * @function controlMustBeNumber
 *
 * @description Comprobamos si el dígito de control del CIF debería ser un número.
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function controlMustBeNumber(cif) {
    return endNumIf.includes(getFirstLetter(cif));
}

/**
 * @function hasCorrectControlDigit
 *
 * @description Comprobamos si el dígito de control del CIF concuerda con lo que deberíamos obtener.
 *
 * @param {String} cif - CIF
 *
 * @returns {Boolean} true|false
 */
function hasCorrectControlDigit(cif) {
    if (controlMustBeLetter(cif)) {
        return /^[A-Z]$/.test(getControlDigit(cif));
    }
    if (controlMustBeNumber(cif)) {
        return /^[0-9]$/.test(getControlDigit(cif));
    }
    return true;
}

export default cif => {
    const newCif = cif.toUpperCase();

    if (hasCorrectLength(newCif) && hasCorrectFirstLetter(newCif) && hasCorrectControlDigit(newCif) && canCalcControl(newCif)) {
        const control = getControlDigit(cif);
        const controlCalculated = calcControlDigit(cif);

        return control === String(controlCalculated) || control === letters[controlCalculated];
    }
    return false;
};
