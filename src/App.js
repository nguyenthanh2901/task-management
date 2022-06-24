import React, { Component } from 'react';
import todoApi from './api/todoApi';
import './app.scss'
import Form from './components/form/Form';
import List from './components/list/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSaveTodo = this.handleSaveTodo.bind(this);
    this.handlePrepareEdit = this.handlePrepareEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  initTodo = { id: undefined, name: '', status: undefined };
  state = {
    todos: [this.initTodo],
    todo: this.initTodo,
  };

  renderData(todo) {
    const response = todoApi.GET();
    this.setState({
      ...this.state,
      todos: response,
      todo: todo ? todo: this.initTodo
    });
  }


  handlePrepareEdit(todo) {
    this.setState({
      ...this.state,
      todo: todo,
    });
  }

  componentDidMount() {
    this.renderData();
  }

  handleSaveTodo(todo) {
    let oldTodo = this.state.todo;

    todoApi.SAVE({ ...todo, status: todo.status ?? 0 });

    if (todo.id === undefined) {
      todo = { ...this.initTodo };
    } else if (oldTodo.status != todo.status) {
      todo = { ...this.initTodo };
    }
    this.renderData(todo);
  }

  handleDelete(id) {
		todoApi.DELETE(id);
		this.renderData();
	}

  render() {
    // console.log(this.state);
    return (
      <div className='App'>
        <div className='title'>
          Todo <strong>list</strong>
        </div>
        <div className='todo-list'>
          <Form todo={this.state.todo}
            handleSaveTodo={this.handleSaveTodo}
            check={Math.random()}
          />
          <List
            todos={this.state.todos}
            handleDelete={this.handleDelete}
            handlePrepareEdit={this.handlePrepareEdit}
            handleSaveTodo={this.handleSaveTodo}
          />

        </div>
      </div>
    );
  }

}

export default App;
