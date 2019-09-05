import isValidNif from './nif.js';

/**
 * @function getPrefix
 *
 * @description Sacamos el primer valor del NIE.
 *
 * @param {String} nie - NIE
 *
 * @returns {String} primer dígito.
 */
function getPrefix(nie) {
    return nie.substr(0, 1).toUpperCase();
}

/**
 * @function getNumPrefix
 *
 * @description En base al prefijo obtenido hacemos la conversión si es una X, una Y o una Z.
 *
 * @param {String} prefix - Primer valor del NIE.
 *
 * @returns {NUmber} prefijo.
 */
function getNumPrefix(prefix) {
    return ['X', 'Y', 'Z'].indexOf(prefix) >= 0 ? String(['X', 'Y', 'Z'].indexOf(prefix)) : prefix;
}

export default nie => {
    return isValidNif(getNumPrefix(getPrefix(nie)) + nie.substr(1));
};
