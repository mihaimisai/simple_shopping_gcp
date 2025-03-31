import { useEffect, useState } from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./components/Header"
import { AuthProvider } from './contexts/AuthContext';
import LoginApp from './components/routes/LoginApp';
import Nav from './components/Nav';

function App() {

  const [message, setMessage] = useState('')

  useEffect( () => {
    
    const fastApi = "https://shopping-list-fastapi-94310770586.europe-west2.run.app"

    fetch(fastApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json(); // Ensure response is JSON
      })
      .then((data) => setMessage(JSON.stringify(data)))
      .catch((error) => {
        console.error("Error fetching data:", error)
        setMessage("Failed to fetch data")
      })
  }, [])


  return ( <>
     <BrowserRouter>
      <AuthProvider>
        <div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
          {/* Navigation menu & hamburger */}
          <Nav />

        </div>
        <div className="text-white d-flex">
          
          <div className="row d-flex text-center my-5 justify-content-center">
            <h4 className="text-white col">The response from FastAPI is: {message}</h4>
          </div>
        </div>
         
        <div >
         
          <div className="col">
            <Routes>
              <Route exact path='/' element={<LoginApp />} />

            </Routes>
          </div>
        </div>
  
      </AuthProvider>
     </BrowserRouter>

    </>
    
  );
}

export default App;
