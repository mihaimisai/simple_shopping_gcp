import { useState, useEffect, useCallback } from 'react'
import AddItemForm from '../AddItemForm'
import RefreshButton from '../RefreshButton'
import ShoppingList from '../ShoppingList'
import useApiRequest from '../lib/apiRequest'

function ShoppingApp() {
    const [items, setItems] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const apiRequest = useApiRequest()
    const [alert ,setAlert] = useState('')

    const fetchItems = useCallback(async () => {
        try {
            setErrorMessage('')
            const data = await apiRequest('/retrievelist')
            setItems(data)
        } catch (error) {
            console.error('Error fetching items:', error.message)
            setAlert('alert alert-danger')
            setErrorMessage(error.message)
        }
    }, [apiRequest])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    const addItem = async (itemName) => {
        try {
            setErrorMessage('')
            response = await apiRequest('/add', 'POST', { itemName })
            setErrorMessage(response.json())
            fetchItems()
            setAlert('alert alert-success')
        } catch (error) {
            setAlert('alert alert-danger')
            console.error('Error adding item:', error.message)
            setErrorMessage(error.message)
        }
    }

    const deleteItem = async (id) => {
      
        try {
            setErrorMessage('')
            await apiRequest(`/delete/${id}`, 'DELETE', { id })
            fetchItems()
        } catch (error) {
            console.error('Error deleting item:', error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className='d-flex flex-column align-items-center my-4'>
            {errorMessage && <p className={alert}>{errorMessage}</p>}

            <AddItemForm onAdd={addItem} />
            <RefreshButton />
            <ShoppingList items={items} onDelete={deleteItem}/>
        </div>
    )
}

export default ShoppingApp
