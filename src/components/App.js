import React, { Component } from "react";
import "../App.css";
import Nav from "./Nav";
import hogs from "../porkers_data";
import HelloWorld from "./HelloWorld";
import Tile from './Tile'
import Sort from './Sort'

class App extends Component {

  state = {
    index: null,
    showDetails: false,
    greaseFilter: 'all',
    sortFilter: 'name'
  }

  filterHogs = () => {
    let sortedHogs 
    if (this.state.sortFilter === 'name'){
      sortedHogs = hogs.sort((a,b) => (a.name>b.name)? 1 : -1)
    }else {
      sortedHogs = hogs.sort((a,b) => a.weight-b.weight)
    }
    let filteredHogs
    if (this.state.greaseFilter === 'greased') {
      filteredHogs = sortedHogs.filter(hog => hog.greased)
    }else if (this.state.greaseFilter === 'ungreased'){
      filteredHogs = sortedHogs.filter(hog => !hog.greased)
    }else {
      filteredHogs = sortedHogs
    }
    return filteredHogs
  }

  makeHogTile = () => {
    let filteredHogs = this.filterHogs()
    return filteredHogs.map((hog, index) => {
      return (
          <Tile name={hog.name} index={index} setShowDetails={this.setShowDetails}/>
      )})
  }
  
  setShowDetails = (index) => {
    this.setState({
      index,
      showDetails: true
    })
  }

  showHogDetails = () => {
    let filteredHogs = this.filterHogs()
    const hog = filteredHogs[this.state.index]
    let isGreased
    if (hog.greased){
      isGreased = "greased"
    }else{
      isGreased = "Not greased"
    }
    return (
      <div>
        <p>name: {hog.name}</p>
        <p>specialty: {hog.specialty}</p>
        <p>{isGreased}</p>
        <p>weight: {hog.weight}</p>
        <p>highest medal achieved: {hog['highest medal achieved']}</p>
        <button onClick={this.closeDetails}>Close</button>
      </div>
    )
  }

  closeDetails = () => {
    this.setState({
      index: null,
      showDetails: false
    })
  }

  toggleShow = () => {
    if (this.state.showDetails){
      return this.showHogDetails()
    }else{
      return (
      <div className="ui grid container cards">
      {this.makeHogTile()}
      </div>
    )}
  }

  filterGrease = (e) => {
    this.setState({
      greaseFilter: e.target.value
    })
  }

  sortHogs = (e) => {
    this.setState({
      sortFilter: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div onChange={this.filterGrease}>
        <input name='grease' type='radio' value='greased' id='greased' />
        <label for='greased'>Greased</label>
        <input name='grease' type='radio' value='ungreased' id='ungreased' />
        <label for='ungreased'>Ungreased</label>
        <input name='grease' type='radio' value='all' id='all' />
        <label for='all'>All</label>
        </div>
        <Sort sortHogs={this.sortHogs}/>
        <br/>
        <br/>
        <HelloWorld />
        {this.toggleShow()}
      </div>
    );
  }
}

export default App;
