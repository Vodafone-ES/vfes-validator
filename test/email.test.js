import email from '../src/rules/email';

describe('Validation rules for Email', () => {
    const validEmail = ['dsasd@fsdfd.com', 'a@b.com', 'e@fdf.es', 'uno.dos@tres.com', 'UnO.Dos@tres.com', 'UnO.Dos@3tres.com', 'UnO.2.tres@siete3.com'];

    const invalidEmail = ['UnO.2.tres@siete3', 'UnO.2.tres[]siete3.com', '@siete3.com', '', 'UnO.2.tres@siete3.c', 'uno @dos.com', 'UnO.2.tres@siete3,com'];

    validEmail.map(item => {
        it(`should validate ${item} as valid email`, () => expect(email(item)).toBeTrue());
    });

    invalidEmail.map(item => {
        it(`should validate ${item} as NO valid email`, () => expect(email(item)).toBeFalse());
    });
});
