import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingItem from './ShoppingItem';


function ShoppingList({items, onDelete}) {

    return (
        <div className='d-flex justify-content-center align-items-center'>
            {items.length > 0 ? (
                <ul className='list-group list-unstyled my-5'>
                {items.map((item, index) => (
                    <ShoppingItem key={index} item={item} onDelete={onDelete} />
                ))}
                </ul>
            ) : (
                <p className='my-5'>No items to display or loading...</p>
            )}
        </div>

    )
}

export default ShoppingList