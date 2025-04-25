import React from 'react';

const ShoppingItem = ({ item, onDelete }) => {

  return (
    <li className='list-group-item list-group-item-dark'>
      <span>{item}</span>
      <button 
        className='btn btn-danger m-2' 
        onClick={() => onDelete(item.id)}
      >
        x
      </button>
    </li>
  );
};

export default ShoppingItem;
