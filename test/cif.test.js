import cif from '../src/rules/cif';

describe('Validation rules for CIF', () => {
    const validCIF = [
        'A48511794',
        'B61355269',
        'C23124753',
        'D25552308',
        'E64002991',
        'F5994271D',
        'G73690471',
        'H38258448',
        'J6594984D',
        'K0808896E',
        'L59381756',
        'N7213297J',
        'P9708757A',
        'Q0850273D',
        'R7018025B',
        'S4955990I',
        'U2064191F',
        'V7902817A',
        'W3037182G',
    ];

    const invalidCIF = ['123456789', '12345678A', '123', '', 'A-48511794', '52479181N'];

    validCIF.map(item => {
        it(`should validate ${item} as valid CIF`, () => {
            expect(cif(item)).toBeTrue();
        });
    });

    invalidCIF.map(item => {
        it(`should validate ${item} as NO valid CIF`, () => {
            expect(cif(item)).toBeFalse();
        });
    });
});
