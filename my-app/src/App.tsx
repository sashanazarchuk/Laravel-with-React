import './App.css';
import HomePage from './componenst/home';
import LoginPage from './componenst/auth/login';
import RegisterPage from './componenst/auth/register';
import { Route, Routes } from 'react-router-dom';
import NoMatchPage from './componenst/noMatch';
import DefaultLayout from './componenst/containers/default';
import AddProduct from './componenst/home/add_product';
function App() {
  /* підключаю роутинг для переходу між сторінками*/ 
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}> 
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NoMatchPage/>}/>
          <Route path="add" element={<AddProduct/>}/>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
