import { BrowserRouter,Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'
import { AuthProvider } from './contexts/AuthContext';
import LoginApp from './components/routes/LoginApp';
import NavMenu from './components/NavMenu';
import ProfileApp from './components/routes/ProfileApp'
import PrivateRoute from './components/routes/PrivateRoute';
import NotFoundRoute from './components/routes/NotFoundRoute';
import ShoppingApp from './components/routes/ShoppingApp';

function App() {

  return ( 
     <BrowserRouter>
      <AuthProvider>
        <div className=' d-flex align-items-center justify-content-center bg-secondary'>
          <div className='min-vh-100 w-75 bg-dark text-bg-dark d-flex flex-column'>
            {/* Navigation menu & hamburger */}
            <NavMenu />

            {/* Body where content is displayed */}
            <div>
            <Routes>
              <Route exact path='/' element={<LoginApp />} />
              <Route element={<PrivateRoute />}>
                <Route path='/shoppinglist' element={<ShoppingApp />} />
                <Route path='/profile' element={<ProfileApp />} />
              </Route>
              {/* 404 route */}
              <Route path="*" element={<NotFoundRoute />} />
              
            </Routes>
            </div>

          </div>
        </div>
      </AuthProvider>
     </BrowserRouter>

    
    
  );
}

export default App;
