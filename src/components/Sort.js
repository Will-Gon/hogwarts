import React, { Component } from 'react'

export default class Sort extends Component {
    render() {
        return (
            <select onChange={this.props.sortHogs}>
                <option value='name'>name</option>
                <option value='weight'>weight</option>
            </select>
        )
    }
}