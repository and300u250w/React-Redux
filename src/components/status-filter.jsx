import React from 'react';

const ItemStatusFilter = () => {
    return (
        <div className='btn-group'>
            <button type='button' className='brn btn-info'> All </button>
            <button type='button' className='brn btn-outline-secondary'> Active </button>
            <button type='button' className='brn btn-outline-secondary'> Done </button>
        </div>
    )
}

export default ItemStatusFilter;
