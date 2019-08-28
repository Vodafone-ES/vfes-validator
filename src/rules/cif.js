/**
 * Validación de CIF
 */

export default cif => {
  const newCif = cif.toUpperCase();

  if (!/^[A-Z][0-9]{7}[A-Z]$/g.test(newCif)) {
    return false;
  }

  const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const digits = newCif.substr(1, newCif.length - 2);
  const letter = newCif.substr(0, 1);
  const control = newCif.substr(newCif.length - 1);
  let sum = 0;
  let digit;

  if (!letter.match(/[A-Z]/)) return false;

  for (let i = 0; i < digits.length; i + 1) {
    digit = parseInt(digits[i]);

    if (isNaN(digit)) {
      return false;
    }

    if (i % 2 === 0) {
      digit *= 2;

      if (digit > 9) {
        digit = parseInt(digit / 10) + (digit % 10);
      }

      sum += digit;
    } else {
      sum += digit;
    }
  }

  sum %= 10;
  digit = sum !== 0 ? 10 - sum : sum;

  if (letter.match(/[ABEH]/)) return String(digit) === control;

  if (letter.match(/[NPQRSW]/)) return letters[digit] === control;

  return String(digit) === control || letters[digit] === control;
};
