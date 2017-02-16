import React, { Component } from 'react'

class Cats extends Component {
  
	static defaultProps = { 
		cats: ['Fluffy', 'Mittens', 'Spike'],
	};

  render() {
  	return <div>
    	<h1>Cats</h1>
    	{this.props.cats.map(cat => {
    		return <div>
    			<h4>{cat}</h4>
  			</div>
    	})}
    </div>
  }
}

export default Cats