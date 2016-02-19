import memoize from 'lru-memoize';
import { createValidator, required, minLength, email } from 'common/validation';

const loginValidation = createValidator({
  passInput: [required, minLength(8)],
  emailInput: [required, email]
});
export default memoize(10)(loginValidation);