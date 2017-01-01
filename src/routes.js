import React from 'react'
import App from './modules/App'
import Dogs from './modules/Dogs'
import Cats from './modules/Cats'
import Home from './modules/Home'
import { Route, IndexRoute } from 'react-router'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/cats" component={Cats}/>
		<Route path="/dogs" component={Dogs}/>
	</Route>
)