import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import AddNewItem from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id)
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {todoData: newArray}

        })
    }

    addItem = () => {
        this.setState(({todoData}) => {
            const defaultValue = [this.createTodoItem('Default value')]
            const updatedSet = [
                ...todoData,
                ...defaultValue
            ]
            return {todoData: updatedSet}
        })
    }

    onToggleImportant = (id) => {
       this.setState(({todoData}) => {
         const idx = todoData.findIndex((el) => el.id ===id)
         const oldItem = todoData[idx];
         const newItem = {
           ...oldItem,
           important: !oldItem.important};

          const newArray = [
            ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
          ]
          return {todoData: newArray}
       })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {

            const idx = todoData.findIndex((el) => el.id === id)
            const oldItem = todoData[idx];
            const newItem = {
                ...oldItem,
                done: !oldItem.done
            };
            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ]
            return {todoData: newArray}
        })

    }

    render() {

      const doneCount = this.state.todoData.filter((el) => el.done).length;
      const todoCount = this.state.todoData.filter((el) => el.done===false).length
      
      
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <AddNewItem addItem={this.addItem}/>

            </div>
        );
    };
};
