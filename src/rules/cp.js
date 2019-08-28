/**
 * Validación del código postal
 */

export default cp => (/^[0-9]+$/g.test(cp) ? parseInt(cp) >= 10000 && parseInt(cp) <= 52999 : false);
