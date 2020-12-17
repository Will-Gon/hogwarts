import React, { Component } from 'react'

export default class Tile extends Component {

    state = {
        hide: false
    }

    setHideHog = () => {
        this.setState({
            hide: true
        })
    }


    render () {
        const path = this.props.name.toLowerCase().replaceAll(' ', '_')
        const pigPath = require (`../hog-imgs/${path}.jpg`)
        //console.log('../hog-imgs/' + this.props.name.toLowerCase().replace(' ', '_') + '.jpg')
        return this.state.hide ? null : (
            <div className='card'>
            {/* <div  className="ui eight wide column card" >  */}
                <div className='image' onClick={() => this.props.setShowDetails(this.props.index)}>
                    <img src={pigPath} className=""/>
                </div>
                <div className='content'>
                    <h3>{this.props.name}</h3>
                </div>
            {/* </div> */}
            <div className='extra content'>
            <button className='ui basic button' onClick={this.setHideHog}>Hide</button> 
            </div>  
            </div>

        )
    }
}