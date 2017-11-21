import React, {Component} from 'react';
const Validator = require('Validator')
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValid: true,
      rules: props.rules,
      errors: {}
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleBlur = this
      .handleBlur
      .bind(this);
    this.handleValidation = this
      .handleValidation
      .bind(this);
    this.getState = this
      .getState
      .bind(this);

  }
  //run validation against specific field or the entire form
  handleValidation(name, value) {

    let v;
    /* Validator is an external tool and to get more details go to
     https://github.com/ratiw/Validator */

    if (name) {
      v = Validator.make({
        [name]: value
      }, {[name]: this.state.rules})
    }

    const state = this.state;
    if (v.fails()) {
      let errors = v.getErrors()
      //console.log(errors)
      state.isValid = false;
      state.feedbackClass = this.props.errorClass;
      state.errors = errors;

    }
    if (v.passes()) {
      //console.log('passes')
      state.errors = {};
      state.feedbackClass = this.props.successClass;
      state.isValid = true;
    }
    this.setState(state);
    return state;
  }
  handleChange(e) {

    const name = this.props.props.name
      ? this.props.props.name
      : this.props.key;
    const value = e.target.value;
    const state = this.handleValidation(name, value);
    state.value = value;

    if (typeof(this.props.onChange) === 'function') 
      this.props.onChange(e)
    if (typeof(this.props.syncFormState) === 'function') 
      this.props.syncFormState(name, value, state.errors)

    this.setState(state);
  }
  handleBlur(e) {
    if (typeof(this.props.onBlur) === 'function') 
      this.props.onBlur(e);
    }
  getState() {
    return this.state;
  }
  render() {
    return (
      <div className={this.props.InputWrapClass + ' ' + this.state.feedbackClass}>
        {this.props.label
          ? <label {...this.props.label.props}>{this.props.label.text}</label>
          : ''}
        {React.createElement('input', {
          ...this.props.props,
          onChange: this.handleChange,
          onBlur: this.handleBlur
        }, null)}
        {this.props.help
          ? <span {...this.props.help.props}>{this.props.help.text}</span>
          : ''}
        {!this.state.isValid
          ? <span {...this.props.error.props}>{this.props.error.text}</span>
          : ''}
      </div>
    );
  }
}

export default Input;