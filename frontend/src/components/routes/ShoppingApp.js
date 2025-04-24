import { useState, useEffect, useCallback } from 'react'
import AddItemForm from '../AddItemForm'
import RefreshButton from '../RefreshButton'
import ShoppingList from '../ShoppingList'
import { useAuth } from '../../contexts/AuthContext'
import DeleteItemFromList from '../lib/DeleteItemFromList'
import AddItemToList from '../lib/AddItemToList'

function ShoppingApp() {

    const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app/retrievelist'
    const { currentUser, getToken } = useAuth()
    const [items, setItems] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    const fetchItems = useCallback(async () => {
        const token = await getToken()
        try {
          const response = await fetch(fastApi, {
            headers: { Authorization: `Bearer ${token}` }
          })
    
          if (!response.ok) throw new Error('Failed to fetch items')
    
          const data = await response.json()
          setItems(data)

        } catch (error) {
          console.error('Error fetching items:', error)
          setErrorMessage(error)
        }
      }, [getToken])

      useEffect(() => {
        fetchItems()
      }, [fetchItems])
    
    const handleAdd = async (itemName) => {
        const token = await getToken()
        await AddItemToList(itemName, token)
        await fetchItems() // refresh list after adding
    }
    

    return (
        <div className='d-flex flex-column align-items-center my-4'>
            <h4>Hello {currentUser.displayName}!</h4>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <AddItemForm 
                onAdd={handleAdd}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />

            <RefreshButton />

            <ShoppingList items={items} onDelete={DeleteItemFromList} />

        </div>
    );
}

export default ShoppingApp