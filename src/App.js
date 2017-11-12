import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Validator from 'Validator';
class App extends Component {
  constructor(props) {
    super();
    // declare fields and rules to validate the form for rules docs
    // https://github.com/ratiw/Validator
    this.state = {
      formData: {
        fields: {
          email: "",
          password: "",
          password_confirmation: "",
          number: "",
          min: "",
          max: ""
        },
        rules: {
          email: "required|email",
          password: "required|confirmed",
          password_confirmation: "required",
          number: "numeric",
          min: "min:1",
          max: "max:10"
        },
        errors: {},
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
  //keep the state update with the input changes
  onChange = (e) => {
    const state = this.state;
    state.formData.fields[e.target.name] = e.target.value;
    this.setState(state);
  }
  //run validation against specific field or the entire form
  handleValidation(name) {
    let v;
    /* Validator is an external tool and to get more details go to
     https://github.com/ratiw/Validator */
    if (name) {
      v = Validator.make({
        [name]: this.state.formData.fields[name]
      }, {[name]: this.state.formData.rules[name]})
    } else {
      v = Validator.make(this.state.formData.fields, this.state.formData.rules)
    }

    const state = this.state;
    if (v.fails()) {
      let errors = v.getErrors()
      console.log(errors)
      state.formData.errors = errors;

    }
    if (v.passes()) {
      console.log('passes')
      state.formData.errors = {};
      state.formData.isValid = true;
    }
    this.setState(state);
  }
  //handle function for the blur event
  onBlur = (e) => {
    //validate spcefic field
    this.handleValidation(e.target.name);
  }
  //handle function for the submit event
  handleSubmit(e) {
    e.preventDefault();
    //validate all this fields in the form
    this.handleValidation();
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
                <label htmlFor="email" className="pull-left">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onBlur={this.onBlur}
                  onChange={this.onChange}/> {this.state.formData.errors.email
                  ? <div className="alert alert-danger">
                      <span className="has-error">{this.state.formData.errors.email}</span>
                    </div>
                  : null}

              </div>
              <div className="form-group">
                <label htmlFor="password" className="pull-left">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onBlur={this.onBlur}
                  onChange={this.onChange}/> {this.state.formData.errors.password
                  ? <div className="alert alert-danger">
                      <span className="has-error">{this.state.formData.errors.password}</span>
                    </div>
                  : null}
              </div>
              <div className="form-group">
                <label htmlFor="password_confirmation" className="pull-left">Password confirmation:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password_confirmation"
                  name="password_confirmation"
                  onBlur={this.onBlur}
                  onChange={this.onChange}/> {this.state.formData.errors.password_confirmation
                  ? <div className="alert alert-danger">
                      <span className="has-error">{this.state.formData.errors.password_confirmation}</span>
                    </div>
                  : null}
              </div>
              <div className="form-group">
                <label htmlFor="number" className="pull-left">Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  name="number"
                  onBlur={this.onBlur}
                  onChange={this.onChange}/> {this.state.formData.errors.number
                  ? <div className="alert alert-danger">
                      <span className="has-error">{this.state.formData.errors.number}</span>
                    </div>
                  : null}
              </div>
              <div className="form-group">
                <label htmlFor="min" className="pull-left">Min:</label>
                <input
                  type="number"
                  className="form-control"
                  id="min"
                  name="min"
                  onBlur={this.onBlur}
                  onChange={this.onChange}/> {this.state.formData.errors.min
                  ? <div className="alert alert-danger">
                      <span className="has-error">{this.state.formData.errors.min}</span>
                    </div>
                  : null}
              </div>
              <div className="form-group">
                <label htmlFor="max" className="pull-left">Max:</label>
                <input
                  type="number"
                  className="form-control"
                  id="max"
                  name="max"
                  onBlur={this.onBlur}
                  onChange={this.onChange}/> {this.state.formData.errors.max
                  ? <div className="alert alert-danger">
                      <span className="has-error">{this.state.formData.errors.max}</span>
                    </div>
                  : null}
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-large btn-block btn-info">Submit</button>
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
