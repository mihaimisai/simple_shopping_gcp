import { useEffect, useState } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./components/Header"
import { AuthProvider } from './contexts/AuthContext';
import LoginApp from './components/LoginApp';

function App() {

  const [message, setMessage] = useState('')

  useEffect( () => {
    
    const fastApi = "https://shopping-list-fastapi-94310770586.europe-west2.run.app"

    fetch(fastApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Ensure response is JSON
      })
      .then((data) => setMessage(JSON.stringify(data)))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Failed to fetch data");
      });
  }, []);



  }, [])


  return ( <>
     <BrowserRouter>
      <AuthProvider>
        <div className="Nav">
          {/* Navigation menu & hamburger */}
          <div className="col-2 d-flex flex-column align-items-center text-center">
            <h3>Navigation</h3>
          </div>
        </div>
        
        <div className="row d-flex text-center my-5 justify-content-center">
          <Header />
          <h1> HELLO </h1>
          <p>The response from FastAPI is: {message}</p>
          <LoginApp />
          <Routes>
          </Routes>
        </div>
  
      </AuthProvider>
     </BrowserRouter>

    </>
    
  );
}

export default App;
