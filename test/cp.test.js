import cp from '../src/rules/cp';

describe('Validation rules for CP (Código postal)', () => {
    const validCP = ['01071', '01002', '01197', '08001', '08910', '04779', '50297', '10004', '10003', '10070', '23009', '52005'];

    const invalidCP = ['A2345', '1234', '53000', '90123', '', '2841 ', ' 2841', '2841a'];

    validCP.map(item => {
        it(`should validate ${item} as valid CP`, () => expect(cp(item)).toBeTrue());
    });

    invalidCP.map(item => {
        it(`should validate ${item} as NO valid CP`, () => expect(cp(item)).toBeFalse());
    });
});
