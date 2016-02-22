import router from './utils/router';
import store from './stores';
import { restore } from 'actions/auth';
import 'react-fastclick';
import 'font-awesome/css/font-awesome.min.css';


store.dispatch(restore());

router();