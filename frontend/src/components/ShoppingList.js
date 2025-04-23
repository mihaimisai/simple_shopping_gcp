import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingItem from './ShoppingItem';


function ShoppingList({items, onDelete}) {

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <ul className='list-group list-unstyled my-5'>
                {items.map((item, index) => (
                    <ShoppingItem key={index} item={item} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    )
}

export default ShoppingList