import React from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import { observer } from "mobx-react";
import { observable, action, computed } from "mobx";

@observer
class App extends React.Component {
  @observable todos = [];
  @observable editText = "";
  @observable text = "";
  @observable allCompleted = false;

  @action addTodo = () => {
    const todo = {
      text: this.text,
      allCompleted: false,
      isEdited: false,
      id: new Date().getTime(),
    };
    this.todos.push(todo);
    this.text = "";
  };
  @action deleteTodo = (id) => {
    this.todos = this.todos.filter((element) => element["id"] !== id);
  };
  @action editTodo = (id) => {
    const index = this.todos.map((element) => element.id).indexOf(id);
    if (this.editText) {
      this.todos[index].text = this.editText;
      this.editText = "";
    }
    this.todos[index].isEdited = !this.todos[index].isEdited;
  };
  @action updateAddInputValue = (evt) => {
    this.text = evt.target.value;
  };
  @action updateEditInputValue = (evt) => {
    this.editText = evt.target.value;
  };
  @action doneTodo = (id) => {
    const index = this.todos.map((element) => element.id).indexOf(id);
    this.todos[index].isCompleted = !this.todos[index].isCompleted;
  };

  @action allTodo = () => {
    this.allCompleted = false;
  };

  @action allDoneTodo = () => {
    this.allCompleted = true;
  };

  @computed get todoItems() {
    return this.todos.filter((element) => {
      return this.allCompleted ? element["isCompleted"] : true;
    });
  }

  renderTodoItems() {
    return this.todoItems.map((element) => {
      return (
        <TodoItem
          task={element}
          del={() => this.deleteTodo(element["id"])}
          toggleBoolean={() => this.doneTodo(element["id"])}
          update={(evt) => this.updateEditInputValue(evt)}
          edit={() => this.editTodo(element["id"])}
          editText={this.editText}
          key={element["id"]}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.text}
          onChange={(evt) => this.updateAddInputValue(evt)}
        />
        <button onClick={this.addTodo}>新增</button>
        <ul className="list">{this.renderTodoItems()}</ul>
        <button onClick={this.allTodo}>全部</button>
        <button onClick={this.allDoneTodo}>已完成</button>
      </div>
    );
  }
}

export default App;
