import memoize from 'lru-memoize';
import * as validation from 'common/validation';

const signupValidation = validation.createValidator({
  passInput: [
    validation.required,
    validation.minLength(8),
    validation.atLeastOneSymbol,
    validation.atLeastOneNumber,
    validation.atLeastOneLowercase,
    validation.atLeastOneUppercase,
    validation.illegalCharacter
  ],
  nameInput: [validation.required, validation.minLength(3)],
  emailInput: [validation.required, validation.email],
  dobInput: [validation.dateOfBirth]
});
export default memoize(10)(signupValidation);