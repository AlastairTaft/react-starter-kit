import { AsyncRouterContext } from 'redux-async-props'
import { createStore }  from 'redux';
import reducer from './reducers/index.js'
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './modules/routes.js'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();

//... 
const initialState = window.__INITIAL_STATE__
const store = createStore(reducer, initialState.store)
render((
  <Provider store={store}>
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
), document.getElementById('app'), () => {
  // We don't need the static css any more once we have launched our application.
  const ssStyles = document.getElementById('jss-styles')
  ssStyles.parentNode.removeChild(ssStyles)
})