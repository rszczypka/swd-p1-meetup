import moment from 'moment';
const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function dateOfBirth(value) {
  if(!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{2}$/.test(value)){
    var birthday = moment(value, 'DD/MM/YYYY');
    var oneHundretThirtyYearsAgo = moment().subtract(130, "years");

    if (!birthday.isValid()) {
      return "Invalid birthday date";
    }
    else if (oneHundretThirtyYearsAgo.isAfter(birthday)) {
      return "You must be the oldest man in the world!";
    }
  } else {
    return "Invalid date";
  }

}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function atLeastOneSymbol(value) {
  var re = /[\!\@\#\$\%\^\&\*]/i;
  if(!re.test(value)) {
    return 'Use at least one of these symbols: !, @, #, $, %, ^, &, *;';
  }
}

export function atLeastOneNumber(value) {
  var re = /[0-9]/g;
  if(!re.test(value)) {
    return 'Use at least one number';
  }
}

export function atLeastOneLowercase(value) {
  var re = /[a-z]/g;
  if(!re.test(value)) {
    return 'Use at least one lowercase letter';
  }
}

export function atLeastOneUppercase(value) {
  var re = /[A-Z]/g;
  if(!re.test(value)) {
    return 'Use at least one uppercase letter';
  }
}

export function illegalCharacter(value) {
  var re = /[^A-z0-9\!\@\#\$\%\^\&\*]/g;
  if(re.test(value)) {
    return 'It cannot contain illegal characters';
  }
}


export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}