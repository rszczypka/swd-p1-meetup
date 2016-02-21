import createHistory from 'history/lib/createBrowserHistory';
let history = createHistory();

// Listen for changes to the current location. The
// listener is called once immediately.
let unlisten = history.listen(function (location) {
  console.log(location.pathname)
});

export default history;