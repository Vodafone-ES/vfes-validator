/**
 * Validación de NIF/DNI
 */

export default nif => {
  if (/^\d{8}[a-zA-Z]$/.test(nif)) {
    const number = parseInt(nif.substr(0, nif.length - 1)) % 23;
    const letter = nif.substr(nif.length - 1, 1).toUpperCase();
    const validLetter = 'TRWAGMYFPDXBNJZSQVHLCKET'.substring(number, number + 1);

    return validLetter === letter;
  }
  return false;
};
