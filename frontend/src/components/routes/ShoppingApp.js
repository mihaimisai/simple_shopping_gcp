import { useState, useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import RefreshButton from '../RefreshButton'
import ShoppingList from '../ShoppingList'
import { getAuth } from "firebase/auth"

function ShoppingApp() {

    const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app/retrievelist'

    const auth = getAuth();
    const user = auth.currentUser;

    console.log(user)

    const [items, setItems] = useState([])

    useEffect(() => {
        fetchItems();
        }, []);
    
    const fetchItems = () => {
    fetch(fastApi)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        }).then(data=>{
            console.log(data)
            setItems(data)
        })
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

            <AddItemForm onAdd={addItem}/>

            <RefreshButton />

            <ShoppingList items={items} onDelete={deleteItem} />

        </div>
    );
}

export default ShoppingApp