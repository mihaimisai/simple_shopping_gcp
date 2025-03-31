import { useEffect } from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import { AuthProvider } from './contexts/AuthContext';
import LoginApp from './components/routes/LoginApp';
import NavMenu from './components/NavMenu';
import Test from './components/routes/Test'
import PrivateRoute from './components/PrivateRoute';

function App() {

  useEffect( () => {
    
    const fastApi = "https://shopping-list-fastapi-94310770586.europe-west2.run.app"

    fetch(fastApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json(); // Ensure response is JSON
      })
      .then((data) => console.log(JSON.stringify(data)))
      .catch((error) => {
        console.error("Error fetching data:", error)
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
              <Route element={<PrivateRoute />}>
                <Route path='/test' element={<Test />} />
              </Route>
              
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
