import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState('')

  useEffect( () => {
    
    const fastApi = "https://shopping-list-fastapi-94310770586.europe-west2.run.app"

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
    <div className="App">
      <div className="row d-flex text-center my-5 justify-content-center">
        <h1> HELLO </h1>
        <p>The response from FastAPI is: {message}</p>
      </div>
    </div>
  );
}

export default App;
