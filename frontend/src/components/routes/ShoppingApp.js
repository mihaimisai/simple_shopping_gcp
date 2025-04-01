import { useState, useEffect } from 'react'

function ShoppingApp() {

    const [message, setMessage] = useState('')

  useEffect( () => {
    
    const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app'

    fetch(fastApi)
      .then(response => {
        if(response.ok) {
          return response.json()
        }
      })
        .then(
          data => {setMessage(JSON.stringify(data))}
        )
  }, [])


  return (
    <div className='d-flex flex-column align-items-center my-4'>
      <h3> My List </h3>
      <p>The response from FastAPI is: {message}</p>
    </div>
  );
}

export default ShoppingApp