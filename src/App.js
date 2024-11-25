import './App.css';
import Navbar from './componentes/navegacion/Navbar';
import React, { useContext } from "react"; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './paginas/Shop';
import LoginSingnup from './paginas/LoginSingnup';
import ShopCategory from './paginas/ShopCategory';
import Product from './paginas/Product';
import Cart from './paginas/Cart';
import women_banner from "./componentes/assets/banner_women.png";
import men_banner from "./componentes/assets/banner_mens.png";
import kid_banner from "./componentes/assets/banner_kids.png";
import Register from './paginas/Register';
import SellProduct from './componentes/SellProduct/SellProduct';
import Perfil from './paginas/Perfil';
import { FormContext } from './context/FormContext';
import Administracion from './componentes/Administracion/Administracion';
import LoginAdmin from './paginas/LoginAdmin';
import PginaTarjetaCredito from './componentes/PginaTarjetaCredito/PginaTarjetaCredito';
import Busqedas from './paginas/Busquedas/Busquedas';

function App() {
  const { userlist } = useContext(FormContext);
  const isLoggedIn = Array.isArray(userlist) && userlist.length > 0;
  const isAdmin = userlist.some(user => user.role === "admin");

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={isLoggedIn && isAdmin ? <Navigate to="/admin" /> : <Shop />} />
          <Route path='product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={isLoggedIn && !isAdmin ? <Cart /> : <Navigate to="/login" />} />
          <Route path='/login' element={<LoginSingnup />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sell' element={<SellProduct />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/admin' element={<Administracion />} />
          <Route path='/LogAdmin' element={<LoginAdmin />} />
          <Route path='/Busquedas' element={ <Busqedas/>}/>
          <Route path='/CardRegister' element={<PginaTarjetaCredito />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="mens"/>}/>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
