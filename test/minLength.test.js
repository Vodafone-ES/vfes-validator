import minLength from '../src/rules/minLength';

describe('Validation rules for minLength', () => {
    it(`should validate 'a' as valid minLength for 0 length`, () => expect(minLength('a', 1)).toBeTrue());
    it(`should validate '.' as valid minLength for 0 length`, () => expect(minLength('.', 1)).toBeTrue());
    it(`should validate ' ' as valid minLength for 0 length`, () => expect(minLength(' ', 1)).toBeTrue());
    it(`should validate 'a b' as valid minLength for 3 length`, () => expect(minLength('a b', 3)).toBeTrue());
    it(`should validate 'abcdefg' as valid minLength for 5 length`, () => expect(minLength('abcdefg', 5)).toBeTrue());
    it(`should validate '' as valid minLength for 0 length`, () => expect(minLength('', 0)).toBeTrue());

    it(`should validate 'ab' as NO VALID minLength for 0 length`, () => expect(minLength('ab', 3)).toBeFalse());
    it(`should validate ' ' as NO VALID minLength for 0 length`, () => expect(minLength(' ', 2)).toBeFalse());
    it(`should validate 'a ' as NO VALID minLength for 1 length`, () => expect(minLength('a ', 3)).toBeFalse());
    it(`should validate ' a' as NO VALID minLength for 1 length`, () => expect(minLength(' a', 3)).toBeFalse());
    it(`should validate 'abc' as NO VALID minLength for 1 length`, () => expect(minLength('abc', 7)).toBeFalse());
});
