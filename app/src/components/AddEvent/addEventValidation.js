import memoize from 'lru-memoize';
import * as validation from 'common/validation';

const addEventValidation = validation.createValidator({
  nameInput: [validation.required, validation.minLength(3)]
});
export default memoize(10)(addEventValidation);