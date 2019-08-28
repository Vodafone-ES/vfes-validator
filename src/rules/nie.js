import isValidNif from './nif';

/**
 * Validación de NIE
 */

export default nie => {
  let niePrefix = nie.substr(0, 1).toLowerCase();

  switch (niePrefix) {
    case 'X':
      niePrefix = 0;
      break;
    case 'Y':
      niePrefix = 1;
      break;
    case 'Z':
      niePrefix = 2;
      break;
    default:
  }

  return isValidNif(niePrefix + nie.substr(1));
};
