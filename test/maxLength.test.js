import maxLength from '../src/rules/maxLength';

describe('Validation rules for maxLength', () => {
    it(`should validate 'a' as valid maxLength for 0 length`, () => expect(maxLength('a', 1)).toBeTrue());
    it(`should validate '.' as valid maxLength for 0 length`, () => expect(maxLength('.', 1)).toBeTrue());
    it(`should validate ' ' as valid maxLength for 0 length`, () => expect(maxLength(' ', 1)).toBeTrue());
    it(`should validate 'a b' as valid maxLength for 3 length`, () => expect(maxLength('a b', 3)).toBeTrue());
    it(`should validate ' a' as valid maxLength for 5 length`, () => expect(maxLength(' a', 5)).toBeTrue());
    it(`should validate '' as valid maxLength for 0 length`, () => expect(maxLength('', 0)).toBeTrue());

    it(`should validate 'a' as NO VALID maxLength for 0 length`, () => expect(maxLength('a', 0)).toBeFalse());
    it(`should validate ' ' as NO VALID maxLength for 0 length`, () => expect(maxLength(' ', 0)).toBeFalse());
    it(`should validate ' a' as NO VALID maxLength for 1 length`, () => expect(maxLength(' a', 1)).toBeFalse());
    it(`should validate 'a  ' as NO VALID maxLength for 1 length`, () => expect(maxLength('a  ', 1)).toBeFalse());
});
