import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import addItemToFirestore from './lib/addItemToFirestore'

const AddItemForm = ({ onAdd }) => {
  const [itemName, setItemName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth = getAuth()
  const user = auth.currentUser

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (itemName.trim() === '') return

    if (!user) {
      setErrorMessage('You must be logged in to add items.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      // Call the addItemToFirestore function
      const itemId = await addItemToFirestore(itemName)

      // Call the onAdd function passed as a prop
      onAdd(itemId)

      // Clear the input field
      setItemName('')
    } catch (error) {
      console.error("Error adding item:", error);
      setErrorMessage('Failed to add item. Please try again.');
      // Handle errors as needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="error">{errorMessage}</p>}
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