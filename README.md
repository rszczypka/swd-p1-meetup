# Project 1: Meet-up Event Planner
## Udacity - Senior Web Developer Nanodegree

The application allows you to name your event, search for a host location (using a location API like Foursquare), 
set the capacity of the event, the start and end times, and input a description of the event.

### Features
* Account creation, event creation and event display
* It is a joy to use on both desktop and mobile. On mobile, all forms are fully functional and react to touches 
naturally.
* The app is accessible (all forms are understandable while using a screen reader)
* The user experience is enhanced with prompts (labels, placeholders, error messages, etc) that appear in logical order 
and are phrased in friendly, human language.
* The inputs are kept to minimum to keep the end user happy and they are instantly validated (not later than on blur) 
keeping the user informed 
and avoiding submitting invalid information.
* Forms can be prefilled with existing user data.
* All input have appropriate types and are labeled (even if only for screen readers).
* The autofocus is applied to the first field above-the-fold.
* The required fields are kept to minimum

### Technical details
* The app includes a build process (using npm)
* Assets are minimized and concatenated as appropriate
* A solid starting point achieved with (https://github.com/mezod/boilerplate-koa-redux-react)

### License

Copyright © 2016 Rafal Szczypka. This source code is licensed under the MIT license.

---
Project maintained by Rafal Szczypka

## Instructions

1. **Clone repo**

    git clone https://github.com/rszczypka/swd-p1-meetup.git

2. **Install dependencies**

    npm install

4. **Make build**

   npm run build

5. **Run development server**

   npm run dev

   Development server should be running at http://localhost:8080/

## List of techs

- [Node](https://nodejs.org/en/) - JS runtime environment
- [npm](https://www.npmjs.com/) - package manager
- [Babel](https://babeljs.io/) - ES6 transpiler
- [Webpack](https://webpack.github.io/) - module bundler & task runner
- [React](https://facebook.github.io/react/) - interfaces
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) - hot reloading for react
- [react-router](https://github.com/rackt/react-router) - react application router
- [react-redux](https://github.com/rackt/react-redux) - react bindings for redux
- [Immutable](https://github.com/facebook/immutable-js) - data structures
- [Redux](https://github.com/rackt/redux) - awesome flux architecture
- [redux-thunk](https://github.com/gaearon/redux-thunk) - thunk middleware for redux
- [SASS](http://sass-lang.com/) - styles
- [ESLint](http://eslint.org/) - linter
- [react-geosuggest](https://github.com/ubilabs/react-geosuggest) - A React autosuggest for the Google Maps Places API
- [react-widgets](https://github.com/jquense/react-widgets) - A React combobox and datepicker
- [redux-form](https://github.com/erikras/redux-form) - works with React Redux to enable html form in React to use 
Redux to store all of its state
- [Firebase](https://www.firebase.com/) - persisten storage
- A bunch of useful scripts

## Scripts

- **npm run test**

     Runs unit tests

- **npm run test:watch**

     Watches for changes to run unit tests

- **npm run build**

     Bundles the application

- **npm run dev**

     Starts webpack development server

- **npm run lint**

     Runs the linter

- **npm run deploy**

     Creates the production ready files

- **npm run clean**

    Removes the bundled code and the production ready files

