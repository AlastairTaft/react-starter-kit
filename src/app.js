import { createStore }  from 'redux';
import reducer from './reducers/index.js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './modules/App'
//... 
const initialState = window.__INITIAL_STATE__
const store = createStore(reducer, {})
  
class MainApp extends Component {
  render = () => <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
}
export default MainApp
