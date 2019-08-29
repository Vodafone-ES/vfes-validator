/**
 * @function hasCorrectFormat
 *
 * @description Comprobamos si el NIF/DNI propocionado tiene un formato correcto.
 *
 * @param {String} nif - NIF
 *
 * @returns {Boolean} true|false.
 */
function hasCorrectFormat(nif) {
  return /^\d{8}[a-zA-Z]$/.test(nif);
}

/**
 * @function getNumber
 *
 * @description Sacamos el número del NIF.
 *
 * @param {String} nif - NIF
 *
 * @returns {String} número del NIF.
 */
function getNumber(nif) {
  return nif.substr(0, nif.length - 1);
}

/**
 * @function getLetterFromNIF
 *
 * @description Sacamos la letra del NIF.
 *
 * @param {String} nif - NIF
 *
 * @returns {String} letra del NIF.
 */
function getLetterFromNIF(nif) {
  return nif.substr(nif.length - 1, 1);
}

/**
 * @function getCalcLetter
 *
 * @description Obtenemos la letra en base al número que hemos calculado del NIF.
 *
 * @param {Number} num - número calculado del NIF.
 *
 * @returns {String} letra calculada.
 */
function getCalcLetter(num) {
  return 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(num, num + 1);
}

/**
 * @function calcLetter
 *
 * @description Calculamos el número de la letra para el NIF.
 *
 * @param {String} nif - NIF.
 *
 * @returns {String} letra calculada.
 */
function calcLetter(nif) {
  return parseInt(getNumber(nif)) % 23;
}

export default nif => {
  if (hasCorrectFormat(nif)) {
    return getCalcLetter(calcLetter(nif)) === getLetterFromNIF(nif).toUpperCase();
  }
  return false;
};
