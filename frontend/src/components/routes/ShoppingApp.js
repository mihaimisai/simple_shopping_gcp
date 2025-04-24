import { useState, useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import RefreshButton from '../RefreshButton'
import ShoppingList from '../ShoppingList'
import { useAuth } from '../../contexts/AuthContext'

function ShoppingApp() {

    const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app/retrievelist'
    const [currentUser] = useAuth()
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchItems();
        }, []);
    
    const fetchItems = async () => {
        
        try {
            const response = await fetch(fastApi)
        
            if (!response.ok) {
            throw new Error("Failed to fetch items");
            }
        
            const data = await response.json()
            setItems(data)
        } catch (error) {
            console.error("Error fetching items:", error)
        }
        }


    //Buttons functionality
    const addItem = async () => {
        console.log('adding item')
    }

    const deleteItem = async () => {
        console.log('deleting item')
    }
    

    return (
        <div className='d-flex flex-column align-items-center my-4'>
            <h4>Hello {currentUser.displayName}</h4>
            <AddItemForm onAdd={addItem}/>

            <RefreshButton />

            <ShoppingList items={items} onDelete={deleteItem} />

        </div>
    );
}

export default ShoppingApp