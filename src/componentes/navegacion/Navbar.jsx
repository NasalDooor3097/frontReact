import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import "./Navbar.css";
import logo from "../assets/logo.png";
import carrito from "../assets/carrito.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { FormContext } from "../../context/FormContext";
import Axios from "axios";
import {
  AiOutlineSetting,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const { userlist, logout } = useContext(FormContext);
  const navigate = useNavigate();
  const [Adminstate, SetAdminstate] = useState("");

  useEffect(() => {
    if (!Array.isArray(userlist)) {
      console.error("userlist is not an array:", userlist);
      return;
    }

    let nombre, correo, password;

    userlist.forEach((user) => {
      nombre = user.user_name;
      correo = user.email;
      password = user.password;
    });

    if (nombre && correo && password) {
      Axios.post("https://tienda-de-oro.onrender.com/SearchAdmin", {
        nombre,
        correo,
        password,
      }).then((response) => {
        if (response.data.length > 0) {
          SetAdminstate("verdadero");
        } else {
          SetAdminstate("falso");
        }
      });
    }
  }, [userlist]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    logout();
    SetAdminstate("falso"); // Restablecer estado de Admin al cerrar sesión
    navigate("/login");
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire(
          "¡Sesión cerrada!",
          "Tu sesión ha sido cerrada con éxito.",
          "success"
        );
      }
    });
  };

  const isAdmin = Adminstate === "verdadero";
  const isLoggedIn =
    Array.isArray(userlist) &&
    userlist.length > 0 &&
    userlist.some((user) => user.user_name && user.user_name.trim() !== "");

  return (
    <nav className={`navbar ${isActive ? "active" : ""}`}>
      <ul className="navegacion">
        <div className="left">
          <div className="logo">
            <Link to="/">
              <img id="logo-img" className="logo-img" src={logo} alt="Logo" />
            </Link>
          </div>
        </div>

        <div className="center">
          {isAdmin && (
            <Link to="/admin">
              {" "}
              <AiOutlineSetting /> Administración
            </Link>
          )}

          {isLoggedIn ? (
            <li>
              <Link to="/perfil">
                <AiOutlineUser /> Perfil
              </Link>
            </li>
          ) : (
            <p>Los mejores</p>
          )}

          {!isAdmin && (
            <li>
              <Link className="text-products" to="/">
                <AiOutlineShoppingCart /> Productos
              </Link>
            </li>
          )}
        </div>

        <div className="right">
          {isLoggedIn ? (
            <>
              <button
                onClick={confirmLogout} // Cambiar a confirmLogout
                className="button-principal-2 flex-align"
              >
                <span className="color-w flex-align">Cerrar sesión</span>
              </button>
              {!isAdmin && (
                <Link to="/cart">
                  <button className="carrito-logo" style={{ border: "none" }}>
                    <img id="carrito-logo" src={carrito} alt="Carrito" />
                    <div className="nav-cart-cont">{getTotalCartItems()}</div>
                  </button>
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="button-principal-2 flex-align">
                <span className="color-w flex-align">Ingresar</span>
              </button>
            </Link>
          )}
        </div>
      </ul>

      <div className="menu-toggle" onClick={handleToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
