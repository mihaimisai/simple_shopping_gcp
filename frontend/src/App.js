import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState('')

  useEffect( () => {
    
    const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app'

    fetch(fastApi)
      .then(response => {
        if(response.ok) {
          console.log(response.json())
        }
      })



  }, [])


  return (
    <div>
      <h1> HELLO </h1>
      <p>The response from FastAPI is: {message}</p>
    </div>
  );
}

export default App;
