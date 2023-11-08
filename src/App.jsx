import { Component, useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';

class App extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <Navbar />
      </div>
    )
  }

}

export default App
