import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Input';
class App extends Component {
  constructor(props) {
    super();
    // declare fields and rules to validate the form for rules docs
    // https://github.com/ratiw/Validator
    this.state = {
      formData: {
        errors: {
          email: "",
          between: "",
          number: ""
        },
        isValid: false
      }
    };
    //bind function to this.
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleValidation = this
      .handleValidation
      .bind(this);

  }

  handleValidation(field, isValid=false) {
    const state = this.state;
   
    if (field) {
      state.formData.errors[field] = isValid;
    }
    let formIsValid = true;
    for (var key in state.formData.errors) {
      let f = state.formData.errors[key];
      if (f !== true) {
        formIsValid = false;
        break;
      }
    }
    state.formData.isValid = formIsValid;
    this.setState(state);
  }

  //handle function for the submit event
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

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

            <form className="col-md-6" id="center" onSubmit={this.handleSubmit}>
              <h1>Sample Form</h1>

              <div className="form-group">
                <Input
                  rules="email|required"
                  inputType="email"
                  inputClass="form-control"
                  errorClass="alert alert-danger"
                  lableClass="pull-left"
                  labelText="Email:"
                  name="email"
                  handler={this.handleValidation}/>

              </div>

              <div className="form-group">
                <Input
                  rules="min:0|max:5|required"
                  inputType="text"
                  inputClass="form-control"
                  errorClass="alert alert-danger"
                  lableClass="pull-left"
                  labelText="Between 0-5:"
                  name="between"
                  handler={this.handleValidation}/>

              </div>

              <div className="form-group">
                <Input
                  rules="numeric|required"
                  inputType="number"
                  inputClass="form-control"
                  errorClass="alert alert-danger"
                  lableClass="pull-left"
                  labelText="Number:"
                  handler={this.handleValidation}
                  name="number"
                  validateTrigger="onChange"
                  />

              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-large btn-block btn-info"
                  disabled={!this.state.formData.isValid}>Submit</button>
              </div>
            </form>
            <div className="col-md-3" id="right"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
