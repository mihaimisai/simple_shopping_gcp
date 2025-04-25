import { useState, useEffect, useCallback } from 'react'
import AddItemForm from '../AddItemForm'
import RefreshButton from '../RefreshButton'
import ShoppingList from '../ShoppingList'
import { useAuth } from '../../contexts/AuthContext'


function ShoppingApp() {

    const retrieveFastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app/retrievelist'
    const { getToken } = useAuth()
    const [items, setItems] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    
    const fetchItems = useCallback(async () => {

        const token = await getToken()

        try {
          const response = await fetch(retrieveFastApi, {
            headers: { Authorization: `Bearer ${token}` }
          })
    
          if (!response.ok) throw new Error('Failed to fetch items')
    
          const data = await response.json()
          setItems(data)

        } catch (error) {
          console.error('Error fetching items:', error.message)
          setErrorMessage(error.message)
        }
      }, [getToken])

      useEffect(() => {
        fetchItems()
      }, [fetchItems])
    
    
    const addItem = async (itemName) => {

        const token = await getToken()
        
        try {
            const addFastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app/add'
            const response = await fetch(addFastApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ itemName })
            });

            if (response.ok) {
                const err = await response.json()
                console.log(err)
                fetchItems()
            } else {
                console.error('error: ', await response.json())
            }
        } catch (error) {
            console.error('Error adding item:', error.message)
            setErrorMessage(error.message)
        }
    }
    
    const deleteItem = async (id) => {

        const token = await getToken()
    
        try {
            const deleteFastApi = "https://shopping-list-fastapi-94310770586.europe-west2.run.app/delete"
    
            const response = await fetch(deleteFastApi, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id })  // send the id to delete
            })
    
            if (!response.ok) {
                const err = await response.json()
                throw new Error(err.message || "Error deleting item")
            }
    
            const feedback = await response.json()
            console.log(feedback.message)
            fetchItems()
    
        } catch (error) {
            console.error('Error deleting item:', error.message)
            setErrorMessage(error.message)
        }
    }
    

    return (
        <div className='d-flex flex-column align-items-center my-4'>

            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

            <AddItemForm onAdd={addItem}/>

            <RefreshButton />

            <ShoppingList items={items} onDelete={deleteItem} />

        </div>
    );
}

export default ShoppingApp