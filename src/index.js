import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import mmdokApp from './reducers/mmdokApp'
import thunk from 'redux-thunk';
import './index.css';
import AppView from './StitchApp';

const store = createStore(mmdokApp, applyMiddleware(thunk))

render(
    <Provider store={store}>
      <AppView />
    </Provider>,
    document.getElementById('root')
  )
