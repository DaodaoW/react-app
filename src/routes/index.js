import React, { Component } from "react";
import img from '../assets/logo.png';
import './style.less';
// import '../index.css';

class App extends Component {
  render() {
    return (
      <div className='indexMain'>
        <img src={img} />
        <h2>Thanks for useing React-my-app</h2>
      </div>
    )
  }
}

export default App;