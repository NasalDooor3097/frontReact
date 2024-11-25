import React, { useContext, useState, useEffect } from "react";
import "./PagPerfil.css";
import { FormContext } from "../../context/FormContext";
import Axios from "axios";
import Item from "../Item/Item";
import { Link } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";
import { FaHandSparkles } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";

const PagPerfil = () => {
  const { userlist } = useContext(FormContext);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [id_user, setIdUser] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarProductos, setMostrarProductos] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [todosLosPedidos, setTodosLosPedidos] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);








  // Verificar si el usuario es administrador
  useEffect(() => {
    if (userlist.length > 0) {
      const user = userlist[0];
      setNombre(user.user_name);
      setCorreo(user.email);
      setIdUser(user.id);

      Axios.post("https://tienda-de-oro.onrender.com/SearchAdmin", {
        nombre: user.user_name,
        correo: user.email,
        password: user.password
      }).then((response) => {
        if (response.data.length > 0) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }).catch((error) => {
        console.error("Error al verificar administrador:", error);
      });
    }
  }, [userlist]);









  // Función para eliminar un producto
  const EliminarProducto = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("https://tienda-de-oro.onrender.com/EliminarProducto", { id: id })
          .then((response) => {
            Swal.fire(
              "¡Eliminado!",
              "El producto se eliminó exitosamente.",
              "success"
            );
            setProductos((prevProductos) =>
              prevProductos.filter((producto) => producto.id !== id)
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "No se pudo eliminar el producto. Intenta de nuevo.",
              "error"
            );
            console.error("Error al eliminar el producto:", error);
          });
      }
    });
  };









  // Función para cancelar un pedido
  const CancelarPedido = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás deshacer esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantenerlo",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("https://tienda-de-oro.onrender.com/EliminarPedido", { id: id })
          .then((response) => {
            Swal.fire(
              "¡Cancelado!",
              "El pedido se canceló exitosamente.",
              "success"
            );
            setPedidos((prevPedidos) =>
              prevPedidos.filter((pedido) => pedido.id !== id)
            );
            setTodosLosPedidos((prevPedidos) =>
              prevPedidos.filter((pedido) => pedido.id !== id)
            );
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "No se pudo cancelar el pedido. Intenta de nuevo.",
              "error"
            );
            console.error("Error al cancelar el pedido:", error);
          });
      }
    });
  };









  // Función para obtener todos los pedidos del usuario
  const ObtenerTodosLosPedidos = (id_user) => {
    Axios.post("https://tienda-de-oro.onrender.com/SearchOrder", { id_user: id_user })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTodosLosPedidos(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setTodosLosPedidos([]);
        }
      }).catch((error) => {
        console.error("No se pudieron obtener los pedidos, error: ", error);
        setTodosLosPedidos([]);
      });
  };

  useEffect(() => {
    if (userlist.length > 0 && !isAdmin) {
      const user = userlist[0];
      setNombre(user.user_name);
      setCorreo(user.email);
      setIdUser(user.id);




      
      // Obtener los productos del usuario
      Axios.post("https://tienda-de-oro.onrender.com/SearchProduct", { id_user: user.id })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProductos(response.data);
          } else {
            console.error("Expected an array but got:", response.data);
            setProductos([]);
          }
        }).catch((error) => {
          console.error("No hay productos, error: ", error);
          setProductos([]);
        });






      // Obtener los pedidos realizados al usuario
      Axios.post("https://tienda-de-oro.onrender.com/GetPedidosByVendedor", { id_user: user.id })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setPedidos(response.data);
          } else {
            console.error("Expected an array but got:", response.data);
            setPedidos([]);
          }
        }).catch((error) => {
          console.error("No hay pedidos, error: ", error);
          setPedidos([]);
        });









      // Obtener todos los pedidos del usuario
      ObtenerTodosLosPedidos(user.id);
    }
  }, [userlist, isAdmin]);

  const toggleProductos = () => {
    setMostrarProductos(!mostrarProductos);
  };






  return (
    <div className="container-perfil">
      <p>
        <FaHandSparkles /> Bienvenido: {nombre}
      </p>
      <p>
        <FaEnvelope /> Correo registrado: {correo}
      </p>
      <p>
        <FaUser /> ID de usuario: {id_user}
      </p>
      <hr />

      {!isAdmin && (
        <>
          {Array.isArray(productos) && productos.length > 0 ? (
            <li>
              <Link to="/sell">
                <AiFillShopping /> Vender productos
              </Link>
            </li>
          ) : (
            <Link to="/sell">
              <FaUpload />
              ¡Precione para subir tu primer producto!
            </Link>
          )}

          <br />

          <Link to={"/CardRegister"} className="transform-scale">
            <PaymentIcon type="visa" format="flatRounded" width={40} />{" "}
            <PaymentIcon type="mastercard" format="flatRounded" width={40} />{" "}
            Tarjetas registradas
          </Link>

          <div className="toggle-container">
            <button className="toggle-btn" onClick={toggleProductos}>
              {mostrarProductos ? "Ocultar Productos" : "Ver Productos"}
            </button>
          </div>

          <h2>Productos que vendes:</h2>
          {mostrarProductos && Array.isArray(productos) && productos.length > 0 ? (
            <div className="productos-lista">
              {productos.map((item) => (
                <div className="producto-item" key={item.id}>
                  <Item
                    id={item.id}
                    name={item.titulo}
                    image={`https://tienda-de-oro.onrender.com/${item.img1}`}
                    old_price={item.old_price}
                    new_price={item.new_price}
                  />
                  <button
                    className="eliminar-btn"
                    type="button"
                    onClick={() => EliminarProducto(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            mostrarProductos && (
              <p className="no-productos">No tienes productos</p>
            )
          )}

          <hr />
          <h2 className="mb-5">Pedidos realizados a tus productos:</h2>
          {Array.isArray(pedidos) && pedidos.length > 0 ? (
            <div className="pedidos-lista">
              {pedidos.map((pedido) => (
                <div className="pedido-item" key={pedido.id}>
                  <p>Pedido ID: {pedido.id}</p>
                  <p>Producto: {pedido.titulo}</p>
                  <p>Cantidad: {pedido.cantidad}</p>
                  <p>Precio: {pedido.precio}</p>
                  <p>Tamaño: {pedido.tamaño}</p>
                  <p>Dirección: {pedido.direccion}</p>
                  <p>Tipo de Pago: {pedido.tipo_pago}</p>
                  <img
                    src={`https://tienda-de-oro.onrender.com/${pedido.img1}`}
                    alt={pedido.titulo}
                    className="pedido-img"
                  />
                  <button
                    className="eliminar-btn"
                    type="button"
                    onClick={() => CancelarPedido(pedido.id)}
                  >
                    Cancelar Pedido
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes pedidos.</p>
          )}

          <hr />
          <h2 className="mb-5"> Todos los pedidos:</h2>
          {Array.isArray(todosLosPedidos) && todosLosPedidos.length > 0 ? (

            <div className="pedidos-lista">
              
              {todosLosPedidos.map((pedido) => (

                <div className="pedido-item" key={pedido.id}>
                  
                  <p>Pedido ID: {pedido.id}</p>

                  <p>Producto: {pedido.titulo}</p>

                  <p>Cantidad: {pedido.cantidad}</p>

                  <p>Precio: {pedido.precio}</p>

                  <p>Tamaño: {pedido.tamaño}</p>

                  <p>Dirección: {pedido.direccion}</p>

                  <p>Tipo de Pago: {pedido.tipo_pago}</p>

                  
                  <img
                    

                    src={`https://tienda-de-oro.onrender.com/${pedido.img1}`}
                    alt={pedido.titulo}
                    className="pedido-img"
                  />




                  
                  <button
                    className="eliminar-btn"
                    id="button-products"
                    type="button"
                    onClick={() => CancelarPedido(pedido.id)}
                  >
                    Cancelar Pedido
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes pedidos.</p>
          )}

          <hr />
        </>
      )}
    </div>
  );
};

export default PagPerfil;
