import router from './utils/router';
import store from './stores';
import { restore } from 'actions/auth';
import 'react-fastclick';


store.dispatch(restore());

router();