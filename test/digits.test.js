import dig from '../src/rules/digits';

describe('Validation rules for Digits', () => {
    const validDig = ['01071', '99999999999', '9', '0'];

    const invalidDig = ['A2345', '1234 ', ' 53000', '', '45.000', '12,34'];

    validDig.map(item => {
        it(`should validate ${item} as valid Digit`, () => expect(dig(item)).toBeTrue());
    });

    invalidDig.map(item => {
        it(`should validate ${item} as NO valid Digit`, () => expect(dig(item)).toBeFalse());
    });
});
