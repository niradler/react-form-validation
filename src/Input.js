import React, {Component} from 'react';
const Validator = require('Validator')
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValid: true,
      rules: props.rules,
      errors: {},
      name: this.props.props.name
        ? this.props.props.name
        : this.props.key
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
      state.isValid = false;
      state.feedbackClass = this.props.errorClass;
      state.errors = errors;

    }
    if (v.passes()) {
      state.errors = {};
      state.feedbackClass = this.props.successClass;
      state.isValid = true;
    }
    this.setState(state);
    return state;
  }
  handleChange(e) {

    const name = this.state.name;
    const value = e.target.value;
    const state = this.handleValidation(name, value);
    state.value = value;

    if (typeof(this.props.onChange) === 'function') {
      this
        .props
        .onChange(e)
    }
    this.setState(state);
  }
  handleBlur(e) {
    if (typeof(this.props.onBlur) === 'function') {
      this
        .props
        .onBlur(e);
    }

    if (typeof(this.props.syncFormState) === 'function') {
      this
        .props
        .syncFormState(this.state.name, this.state.value, this.state.errors)
    }

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
          ? <span {...this.props.error.props}>{this.props.error.text !=='auto'?this.props.error.text:this.state.errors[this.state.name] }</span>
          : ''}
      </div>
    );
  }
}

export default Input;