/* Validator functions to be used both in the API and in the frontend */
// const isURL = require('valid-url').isWebUri;

function isEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    .test(email);
}

function isAlphaNumeric(text) {
  return /^\w+$/.test(text);
}

function isTitle(text) {
  return /^[\w-'\s]+$/.test(text);
}

/* function isURL(url) {
 return /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{3,6}$/.test(url);
 } */

const blacklist = ['login', 'signup', 'landing', 'blog',
  'about', 'help', 'error', 'discover'];

exports.signup = function signup(params) {
  const email = params.email;
  const password = params.password;
  const errors = [];

  if (!isEmail(email)) {
    errors.push('The email address is invalid.');
  }

  if (password.length < 8) {
    errors.push('The password must be at least 8 characters long.');
  }

  return errors.length ? errors : false;
};

exports.user = function user(params) {
  const name = params.name;
  const description = params.description;
  const location = params.location;
  const website = params.website;
  const password = params.password;
  const errors = [];

  if (name && name.length > 40) {
    errors.push('The name must be at most 40 characters long');
  }

  if (description && description.length > 200) {
    errors.push('The description must be at most 200 characters long');
  }

  if (password && password.length < 8) {
    errors.push('The password must be at least 8 characters long.');
  }

  if (location && location.length > 40) {
    errors.push('The location must be at most 40 characters long');
  }

  /* if (website && !isURL(website)) {
   errors.push('The website is invalid');
   }*/

  if (website && website.length > 40) {
    errors.push('The website must be at most 40 characters long');
  }

  return errors.length ? errors : false;
};

exports.list = function lists(params) {
  const title = params.title;
  const errors = [];

  if (!title) {
    errors.push('The title cannot be null');
  }
  if (title && title.length < 3) {
    errors.push('The title must be at least 3 characters long');
  }
  if (title && title.length > 50) {
    errors.push('The title must be at most 50 characters long');
  }
  if (title && !isTitle(title)) {
    errors.push('The title can only contain ' +
      'numbers, letters, spaces, \' and -');
  }

  return errors.length ? errors : false;
};

exports.log = function log(params) {
  const list = params.listId;
  const title = params.title;
  // const thumbnail = params.thumbnail;
  const text = params.text;
  const errors = [];

  if (!title) {
    errors.push('The title is required');
  }
  if (!list) {
    errors.push('You must select a list to save the item');
  }
  if (title && title.length > 200) {
    errors.push('The title must be at most 200 characters long');
  }
  if (text && text.length > 500) {
    errors.push('The description must be at most 500 characters long');
  }
  /* if (url && !isURL(url)) {
   errors.push('The url is invalid');
   }
   /* if (thumbnail && !isURL(thumbnail)) {
   errors.push('The thumbnail is invalid');
   } */

  return errors.length ? errors : false;
};