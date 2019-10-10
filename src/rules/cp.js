/**
 * Validación del código postal
 */

// export default cp => /^[0-9]+$/g.test(cp) && parseInt(cp) >= 10000 && parseInt(cp) <= 52999;

export default cp => /^(0[1-9]|[1-9][0-9])[0-9]{3}$/g.test(cp) && cp < 52999;
