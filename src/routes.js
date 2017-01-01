import Cats from './modules/Cats'
import Dogs from './modules/Dogs'
import Home from './modules/Home'
import App from './modules/App'

export const routes = [
  {
	  path: 'cats',
	  component: Cats,
	},
  {
	  path: 'dogs',
	  component: Dogs,
	},
]

const rootRoute = {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: routes,
}

export default rootRoute