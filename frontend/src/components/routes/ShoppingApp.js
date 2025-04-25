import { useState, useEffect, useCallback } from 'react'
import AddItemForm from '../AddItemForm'
import RefreshButton from '../RefreshButton'
import ShoppingList from '../ShoppingList'
import useApiRequest from '../lib/apiRequest'

function ShoppingApp() {
    const [items, setItems] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const apiRequest = useApiRequest()

    const fetchItems = useCallback(async () => {
        try {
            const data = await apiRequest('/retrievelist')
            setItems(data)
        } catch (error) {
            console.error('Error fetching items:', error.message)
            setErrorMessage(error.message)
        }
    }, [apiRequest])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    const addItem = async (itemName) => {
        try {
            await apiRequest('/add', 'POST', { itemName })
            fetchItems()
        } catch (error) {
            console.error('Error adding item:', error.message)
            setErrorMessage(error.message)
        }
    }

    const deleteItem = async (id) => {
        try {
            await apiRequest('/delete', 'DELETE', { id })
            fetchItems()
        } catch (error) {
            console.error('Error deleting item:', error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className='d-flex flex-column align-items-center my-4'>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

            <AddItemForm onAdd={addItem} />
            <RefreshButton />
            <ShoppingList items={items} onDelete={deleteItem}/>
        </div>
    )
}

export default ShoppingApp
