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
        ],
        search:'',
        filter:'active'
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

    addItem = (label) => {
        
        
        this.setState(({todoData}) => {
            const defaultValue = [this.createTodoItem(label)]
            const updatedSet = [
                ...todoData,
                ...defaultValue
            ]
            return {todoData: updatedSet}
        })
    }

    toggleProperty(arr, id, propName){

      const idx = arr.findIndex((el) => el.id === id)
            const oldItem = arr[idx];
            const newItem = {
                ...oldItem,
                [propName]: !oldItem[propName]
            };
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ];

    }

    onToggleImportant = (id) => {
       this.setState(({todoData}) => {
        return {todoData: this.toggleProperty(todoData,id,'important')}
       })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {  
            return {todoData: this.toggleProperty(todoData,id,'done')}
        })

    }

    searchField (items, search){
        
        if (search.length ===0) {
            return items;
        }
        
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });


        }

        onSearchChange = (search)=> {
            

            this.setState({search});
        };

        onFilterChange = (filter)=> {
            

            this.setState({filter});
        };

    filter (items, filter) {

        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {

        const {todoData, search,filter} = this.state;

      const doneCount = todoData.filter((el) => el.done).length;
      const todoCount = todoData.filter((el) => el.done===false).length
      
      const visibleItems = this.filter(this.searchField(todoData, search),filter);
      
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel  onSearchChange = {this.onSearchChange}/>
                    <ItemStatusFilter filter = {filter} onFilterChange= {this.onFilterChange} />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <AddNewItem addItem={this.addItem}/>

            </div>
        );
    };
};
