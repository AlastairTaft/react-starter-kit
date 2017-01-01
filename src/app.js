import { AsyncRouterContext } from 'redux-async-props'
import { createStore }  from 'redux';
import reducer from './reducers/index.js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes.js'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

if ('serviceWorker' in navigator) {
  const registration = runtime.register().then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

//... 
const initialState = window.__INITIAL_STATE__
const store = createStore(reducer, initialState.store)
  
class MainApp extends Component {
  render = () => <Provider store={store}>
    <Router 
      routes={routes} 
      history={browserHistory}
      render={(props) => <AsyncRouterContext 
        {...props} 
        // Pass in the async props that we're hydrating from 
        // the server, these are needed so that the initial render 
        // only needs to be done once. 
        asyncProps={initialState.asyncProps}
      />}
    />
  </Provider>
}
export default MainApp
