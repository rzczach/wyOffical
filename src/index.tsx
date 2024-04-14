
import ReactDOM from 'react-dom'

import Router from './routers';
import './index.css'
import store from './store/store';
import { Provider } from './store/reduxMini';


ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
