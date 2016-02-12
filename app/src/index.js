import router from './utils/router';
import store from './stores';
import { restore } from 'actions/auth';


store.dispatch(restore());

router();