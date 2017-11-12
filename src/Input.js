import React, {Component} from 'react';
import Validator from 'Validator';
class Input extends Component {
  constructor(props) {
    super();
    // declare fields and rules to validate the form for rules docs
    // https://github.com/ratiw/Validator
    this.state = {
      fields: {
        input: ""
      },
      rules: {
        input: props.rules
      },
      errors: {},
      isValid: false
    };
    //bind function to this.
this.validateTrigger = props.validateTrigger || 'onBlur';
    this.handleValidation = this
      .handleValidation
      .bind(this);
  }
  //keep the state update with the input changes
  onChange = (e) => {
    const state = this.state;
    state.fields['input'] = e.target.value;
    this.setState(state);
    if (this.validateTrigger === 'onChange') {
      this.handleValidation();
      this
        .props
        .handler(this.props.name, this.state.isValid);
    }

  }
  //run validation against specific field or the entire form
  handleValidation() {
    const name = 'input';
    let v;
    /* Validator is an external tool and to get more details go to
     https://github.com/ratiw/Validator */
    if (name) {
      v = Validator.make({
        [name]: this.state.fields[name]
      }, {[name]: this.state.rules[name]})
    } else {
      v = Validator.make(this.state.fields, this.state.rules)
    }

    const state = this.state;
    if (v.fails()) {
      let errors = v.getErrors()
      // console.log(errors)
      state.isValid = false;
      state.errors = errors;

    }
    if (v.passes()) {
      // console.log('passes')
      state.errors = {};
      state.isValid = true;
    }
    this.setState(state);
  }
  //handle function for the blur event
  onBlur = (e) => {
    //validate spcefic field
if (this.validateTrigger === 'onBlur') {
  this.handleValidation();
  this
    .props
    .handler(this.props.name, this.state.isValid);
}
  }

  render() {
    return (
      <div className="Input">
        <label htmlFor="input" className={this.props.lableClass}>{this.props.labelText}</label>
        <input
          type={this.props.inputType}
          className={this.props.inputClass}
          placeholder={this.props.placeholder}
          id={this.props.id}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.onChange}/> {this.state.errors.input
          ? <div className={this.props.errorClass}>
              <span className="has-error">{this.state.errors.input}</span>
            </div>
          : null}
      </div>
    );
  }
}

export default Input;
