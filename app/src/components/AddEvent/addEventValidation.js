import memoize from 'lru-memoize';
import * as validation from 'common/validation';

const addEventValidation = validation.createValidator({
  nameInput: [validation.required, validation.minLength(3), validation.maxLength(50)],
  typeInput: [validation.required, validation.minLength(3), validation.maxLength(20)],
  hostInput: [validation.required, validation.minLength(3), validation.maxLength(20)],
  startInput: [validation.required, validation.dateAndTime],
  endInput: [validation.required, validation.dateAndTime, validation.laterThan('startInput')],
  locationInput: [validation.required, validation.minLength(3)],
  guestsInput: [validation.required, validation.minLength(3), validation.maxLength(20)],
  descriptionInput: [validation.maxLength(256)]
});
export default memoize(10)(addEventValidation);