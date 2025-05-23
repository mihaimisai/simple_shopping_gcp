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
            const response = await apiRequest('/add', 'POST', { itemName })
            setAlert('alert alert-success')
            setErrorMessage(response.message)
            fetchItems()
            
        } catch (error) {
            setAlert('alert alert-danger')
            console.error('Error adding item:', error.message)
            setErrorMessage(error.message)
        }
    }

    const deleteItem = async (id) => {
      
        try {
            setErrorMessage('')
            const response = await apiRequest(`/delete/${id}`, 'DELETE', { id })
            setAlert('alert alert-success')
            setErrorMessage(response.message)
            fetchItems()
        } catch (error) {
            console.error('Error deleting item:', error.message)
            setErrorMessage(error.message)
        }
    }

    const refreshItems = () => {
        setErrorMessage('')
        fetchItems();
    }

    return (
        <>
        <div className="sticky top-mt2">
            {errorMessage && (
                <div className={alert} role="alert">
                    {errorMessage}
                </div>
            )}
        </div>

        <div className='d-flex flex-column align-items-center my-4'>

            <AddItemForm onAdd={addItem} />
            <RefreshButton onRefresh={refreshItems}/>
            <ShoppingList items={items} onDelete={deleteItem}/>
        </div>
        </>
    )
}

export default ShoppingApp
