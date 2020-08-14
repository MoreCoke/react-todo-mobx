import React from 'react';
import './App.css';
import Todo from './components/TodoItem';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderTodos: [],
      todos: [],
      text: '',
    };
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateAddInputValue = this.updateAddInputValue.bind(this);
    this.updateEditInputValue = this.updateEditInputValue.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
    this.allTodo = this.allTodo.bind(this);
    this.allDoneTodo = this.allDoneTodo.bind(this);
  }

  addTodo() {
    const { renderTodos, todos, text } = this.state;
    this.setState({
      text: '',
      editText: '',
      currentTodoText:'',
      todos: [
        ...todos,
        {
          text: text,
          isCompleted: false,
          isEdited: false,
          id: new Date().getTime(),
        },
      ],
      renderTodos: [
        ...renderTodos,
        {
          text: text,
          isCompleted: false,
          isEdited: false,
          id: new Date().getTime(),
        },
      ],
    });
  }
  deleteTodo(id) {
    const { renderTodos, todos } = this.state;
    this.setState({
      todos: todos.filter((element) => element['id'] !== id),
      renderTodos: renderTodos.filter((element) => element['id'] !== id),
    });
  }
  editTodo(id) {
    const { renderTodos, todos, editText } = this.state;
    let data = '';
    this.setState({
      renderTodos: renderTodos.map((element) => {
        if (element['id'] !== id) {
          return element;
        }
        data = element.text;
        if(editText) {
          return {
            ...element,
            text: editText,
            isEdited: !element.isEdited,
          };
        }
        return {
          ...element,
          isEdited: !element.isEdited,
        };
      }),
      todos: todos.map((element) => {
        if (element['id'] !== id) {
          return element;
        }
        if(editText) {
          return {
            ...element,
            text: editText,
            isEdited: !element.isEdited,
          };
        }
        return {
          ...element,
          isEdited: !element.isEdited,
        };
      }),
      editText: '',
      currentTodoText: data,
    });
  }
  updateAddInputValue(evt) {
    this.setState({
      text: evt.target.value,
    });
  }
  updateEditInputValue(evt) {
    this.setState({
        editText: evt.target.value,
    })
  }
  doneTodo(id) {
    const { todos, renderTodos } = this.state;
    this.setState({
      todos: todos.map((element) => {
        if (element['id'] !== id) {
          return element;
        }
        return {
          ...element,
          isCompleted: !element.isCompleted,
        };
      }),
      renderTodos: renderTodos.map((element) => {
        if (element['id'] !== id) {
          return element;
        }
        return {
          ...element,
          isCompleted: !element.isCompleted,
        };
      }),
    });
  }

  allTodo() {
    const { todos } = this.state;
    this.setState({
      renderTodos: [...todos],
    });
  }

  allDoneTodo() {
    const { todos } = this.state;
    this.setState({
      renderTodos: todos.filter((element) => element['isCompleted']),
    });
  }

  render() {
    const { renderTodos, text } = this.state;
    return (
      <div>
        <input
          type="text"
          value={text}
          onChange={(evt) => this.updateAddInputValue(evt)}
        />
        <button onClick={this.addTodo}>新增</button>
        <ul className="list">
          {renderTodos.map((element) => {
            return (
              <Todo
                task={element}
                del={() => this.deleteTodo(element['id'])}
                toggleBoolean={() => this.doneTodo(element['id'])}
                update={(evt) => this.updateEditInputValue(evt)}
                edit={() => this.editTodo(element['id'])}
                editText={this.state.editText}
                key={element['id']}
              />
            );
          })}
        </ul>
        <button onClick={this.allTodo}>全部</button>
        <button onClick={this.allDoneTodo}>已完成</button>
      </div>
    );
  }
}

export default App;
