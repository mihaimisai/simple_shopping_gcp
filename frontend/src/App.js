import { useEffect, useState } from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import { AuthProvider } from './contexts/AuthContext';
import LoginApp from './components/routes/LoginApp';
import NavMenu from './components/NavMenu';
import Test from './components/routes/Test'

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
        <div className='d-flex vh-100 align-items-center justify-content-center bg-secondary'>
          <div className='maincontainer bg-dark text-bg-dark d-flex flex-column'>
            {/* Navigation menu & hamburger */}
            <NavMenu />

            {/* Body where content is displayed */}
            <div>
            <Routes>
              <Route exact path='/' element={<LoginApp />} />
              <Route path='/test' element={<Test />} />
            </Routes>
            </div>

          </div>
        </div>
      </AuthProvider>
     </BrowserRouter>

    </>
    
  );
}

export default App;
