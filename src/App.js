import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Input';
import Form from './Form';
class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="App ">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-3" id="left"></div>

            <Form btn={{text:"Confirm",props:{className:"btn btn-info"}}} fields={[{
              InputWrapClass:"form-group",
              errorClass:'has-error',
              successClass:'has-success',
              rules:'email|required',
                label:{text:"Email",props:{className:"pull-left"}},
                error:{text:"please fill valid email",props:{className:"help-block pull-left"}},
                props:
            {
              className:'form-control',
                name: "Email",
                type: "email",
            }}]}/>
            <div className="col-md-3" id="right"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
