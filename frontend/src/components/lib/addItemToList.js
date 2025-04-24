
const AddItemToList = async (itemName, token) => {

    const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app/add'

    try {

        const response  = await fetch(fastApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemName})
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }
    }
    catch (error) {
        console.error('Error adding item: ', error)
    }
}

export default AddItemToList