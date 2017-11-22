import React, {Component} from 'react';
import Input from './Input';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      formData: {},
      errors: {},
      validate:false
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
    const isErr = Object
      .getOwnPropertyNames(state.errors)
      .length;
    let isEmpty = false;
    for (const key in state.formData) {
      if (state.formData.hasOwnProperty(key) && state.formData[key].length === 0) {
        isEmpty = true;
        break;
      }
    }
if (isEmpty || isErr) {
      state.isValid = false;
      state.validate=true;
    }else{
      state.validate=false;
      state.isValid = true;
    }

    if (typeof(this.props.onSubmit) === 'function') {
      this
        .props
        .onSubmit(state);
    }

    if (state.isValid) {
      this.setState(state);
    }
  }

  render() {
    return (
      <form {...this.props} onSubmit={this.handleSubmit}>
        {this
          .default
          .fields
          .map((f) => (<Input {...f} key={Math.random()} syncFormState={this.syncFormState} />))}
        <div>
          <button {...this.default.btn.props}>{this.default.btn.text}</button>
        </div>
      </form>
    );
  }
}

export default Form;