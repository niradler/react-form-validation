import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      todos: []
    }
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }
  handleSubmit(fromState) {
    if (fromState.isValid) {
      this.setState({
        todos: [
          ...this.state.todos, {
            title: fromState.formData.title,
            body: fromState.formData.body
          }
        ]
      })
    }
     
  }
  render() {
    return (
      <div className="App ">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React Form</h1>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-3" id="left"></div>
            <h2>Create new todo</h2>
            <Form
              className="col-md-6"
              onSubmit={this.handleSubmit}
              btn={{
              text: "Add",
              props: {
                className: "btn btn-info"
              }
            }}
              fields={[
              {
                InputWrapClass: "form-group",
                errorClass: 'has-error',
                successClass: 'has-success',
                rules: 'min:4|required',
                label: {
                  text: "Title",
                  props: {
                    className: "pull-left"
                  }
                },
                error: {
                  text: "auto",
                  props: {
                    className: "help-block pull-left"
                  }
                },
                props: {
                  className: 'form-control',
                  name: "title",
                  type: "text"
                }
              }, {
                InputWrapClass: "form-group",
                errorClass: 'has-error',
                successClass: 'has-success',
                rules: 'required',
                label: {
                  text: "Body",
                  props: {
                    className: "pull-left"
                  }
                },
                error: {
                  text: "field is required",
                  props: {
                    className: "help-block pull-left"
                  }
                },
                props: {
                  className: 'form-control',
                  name: "body",
                  type: "text"
                }
              }
            ]}/>
            <div className="col-md-3" id="right">
              {this.state.todos.length>1? <h3>Todos:</h3>:''}
              <ul className="list-group">
                {this
                  .state
                  .todos
                  .map((t) => (
                    <li className="list-group-item" key={Math.random()}>Title: {t.title}, Body: {t.body}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
