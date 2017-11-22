import React, {Component} from 'react';
import Input from './Input';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      formData: {},
      errors: {}
    }
    this.stateClone = this.state;
    this.default = {
      fields: props.fields
        ? props.fields
        : [],
      btn: props.btn
        ? props.btn
        : {
          props: {
            className: 'btn',
            type: "submit"
          },
          text: "Submit"
        }
    }
    this.syncFormState = this
      .syncFormState
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  syncFormState(name, value, err) {
    const state = this.stateClone;
    state.formData[name] = value;
    if (Object.getOwnPropertyNames(err).length !== 0) {
      state.errors = {
        ...state.errors,
        ...err
      };
    } else {
      delete state.errors[name];
    }
    this.stateClone = state;
  }

  handleSubmit(e) {
    e.preventDefault();
    const state = this.stateClone;
    state.isValid = (Object.getOwnPropertyNames(state.errors).length === 0 && Object.getOwnPropertyNames(state.formData).length !== 0);
    if (state.isValid){
      this.setState(state);
    }
      if (typeof(this.props.onSubmit) === 'function') {
        this.props.onSubmit(state);
      }
      
  }
  
  render() {
    return (
      <form {...this.props} onSubmit={this.handleSubmit}>
        {this
          .default
          .fields
          .map((f) => (<Input {...f} key={Math.random()} syncFormState={this.syncFormState}/>))}
        <div>
          <button {...this.default.btn.props}>{this.default.btn.text}</button>
        </div>
      </form>
    );
  }
}

export default Form;