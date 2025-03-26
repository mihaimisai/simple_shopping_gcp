import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState('')

  useEffect( () => {

    fetch("/")
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
    <div>
      <h1> HELLO </h1>
      <p>The response from FastAPI is: {message}</p>
    </div>
  );
}

export default App;
