import React from 'react';
import './todo-list-item'

const TodoListItem = ({
    label,
    important = false
}) => {
    const style = {
        color: important
            ? 'steelblue'
            : 'black',
        fontWeight: important ? 'bold' : 'normal'
    }
    return (
        <span
            className='todo-list-item'>

            <span style={style} className='todo-list-item-label'>
                {label}

            </span>
            <button type='button' className='btn btn-outline-success btn-sm'></button>
            <button></button>
        </span>
    )
}

export default TodoListItem;