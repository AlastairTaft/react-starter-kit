import React, { Component } from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import Home from './../Home'
import { Route, Link } from 'react-router-dom'
import Cats from './../Cats'
import Dogs from './../Dogs'

jss.setup(preset())

const styles = {
  title: {
    '&:hover': {
      background: 'blue',
    }
  },
  '@media (min-width: 1024px)': {
    title: {
      background: 'red',
    }
  }
}

const { classes } = jss.createStyleSheet(styles).attach()

export default class App extends Component {
  render() {
    return <div>
      <h1>Animals</h1>

      <h5 className={classes.title}>A simple sample application.</h5>

      <ul role="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cats">Cats</Link></li>
        <li><Link to="/dogs">Dogs</Link></li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route exact path="/cats" component={Cats} />
      <Route exact path="/dogs" component={Dogs} />

    </div>
  }
}