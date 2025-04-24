import React, { useState } from 'react'

const AddItemForm = ({ onAdd, errorMessage, setErrorMessage}) => {
  const [itemName, setItemName] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (itemName.trim() === '') return

    setIsLoading(true)
    setErrorMessage('')

    try {

      await onAdd(itemName)

      setItemName('')
    } catch (error) {
      console.error("Error adding item:", error);
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        autoFocus
        disabled={isLoading}
      />
      <button type="submit" className='btn btn-success mx-2' disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
};

export default AddItemForm;