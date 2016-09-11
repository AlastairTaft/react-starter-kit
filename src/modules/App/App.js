import React, { Component } from 'react'
import { Link } from 'react-router'
import jss from 'jss'
import preset from 'jss-preset-default'

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

      <h5 className={classes.title}>A simple async props example.</h5>

      <ul role="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cats">Cats</Link></li>
        <li><Link to="/dogs">Dogs</Link></li>
      </ul>

      {this.props.children}

    </div>
  }
}