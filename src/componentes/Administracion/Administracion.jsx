import React, { useEffect, useState } from "react";
import "./Administracion.css";
import Axios from "axios";
import Swal from "sweetalert2";
const Administracion = () => {
  const [all_user, setUser] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    Axios.post("https://tienda-de-oro.onrender.com/SearchAllUsers", {})
      .then((response) => {
        setUser(response.data.length > 0 ? response.data : []);
      })
      .catch((error) => {
        console.error("No hay usuarios, error: ", error);
        setUser([]);
      });
  }, []);

  useEffect(() => {
    Axios.post("https://tienda-de-oro.onrender.com/SearchAllProduct", {})
      .then((response) => {
        setProductos(response.data.length > 0 ? response.data : []);
      })
      .catch((error) => {
        console.error("No hay productos, error: ", error);
        setProductos([]);
      });
  }, []);

  useEffect(() => {
    Axios.post("https://tienda-de-oro.onrender.com/SearchAllOrders", {})
      .then((response) => {
        setPedidos(response.data.length > 0 ? response.data : []);
      })
      .catch((error) => {
        console.error("No hay pedidos, error: ", error);
        setPedidos([]);
      });
  }, []);



const EliminarUsuario = (id) => {
  Axios.post("https://tienda-de-oro.onrender.com/EliminarUsuario", { id: id })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Se eliminó exitosamente el usuario",
        confirmButtonText: "Aceptar",
      });
      setUser((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== id)
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se pudo eliminar el usuario",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al eliminar el usuario:", error);
    });
};

const EliminarProducto = (id) => {
  Axios.post("https://tienda-de-oro.onrender.com/EliminarProducto", { id: id })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Se eliminó exitosamente el producto",
        confirmButtonText: "Aceptar",
      });
      setProductos((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== id)
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se pudo eliminar el producto",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al eliminar el producto:", error);
    });
};

const EliminarPedido = (id) => {
  Axios.post("https://tienda-de-oro.onrender.com/EliminarPedido", { id: id })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Se eliminó exitosamente el pedido",
        confirmButtonText: "Aceptar",
      });
      setPedidos((prevPedidos) =>
        prevPedidos.filter((pedido) => pedido.id !== id)
      );
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se pudo eliminar el pedido",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al eliminar el pedido:", error);
    });
};

    return (
 
      <div className="container">
          
  


      <h2>Usuarios</h2>
      {all_user.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {all_user.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.user_name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.password}</td>
                <td>
                  <button
                    className="button-delete"
                    onClick={() => EliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios disponibles</p>
      )}

      <h2>Productos</h2>
      {productos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Precio Nuevo</th>
              <th>Precio Viejo</th>
              <th>ID Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.titulo}</td>
                <td>{producto.new_price}</td>
                <td>{producto.old_price}</td>
                <td>{producto.id_user}</td>
                <td>
                  <button
                    className="button-delete"
                    onClick={() => EliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos disponibles</p>
      )}

      <h2>Pedidos</h2>
      {pedidos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Usuario</th>
              <th>ID Producto</th>
              <th>Tamaño</th>
              <th>Cantidad</th>
              <th>Dirección</th>
              <th>Tipo de Pago</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.id_user}</td>
                <td>{pedido.id_producto}</td>
                <td>{pedido.tamaño}</td>
                <td>{pedido.cantidad}</td>
                <td>{pedido.direccion}</td>
                <td>{pedido.tipo_pago}</td>
                <td>{pedido.precio}</td>
                <td>
                  <button
                    className="button-delete"
                    onClick={() => EliminarPedido(pedido.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay pedidos disponibles</p>
      )}
    </div>
  );
};

export default Administracion;
