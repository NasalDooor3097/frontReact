import React, { useContext, useState } from "react";
import "./SellProduct.css";
import { ShopContext } from "../../context/ShopContext";
import { FormContext } from "../../context/FormContext";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

const SellProduct = () => {
  const [titulo, SetTitulo] = useState("");
  const [new_price, SetNewPrice] = useState("");
  const [old_price, SetOldPrice] = useState("");
  const [img1, SetImg] = useState(null); 
  const [tipo, SetTipo] = useState("");
  const { userlist } = useContext(FormContext);
  const { addProduct } = useContext(ShopContext);

  const handleAddProduct = () => {
    userlist.forEach((user) => {
      const id_user = user.id;
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("new_price", new_price);
      formData.append("old_price", old_price);
      formData.append("photo", img1); 
      formData.append("id_user", id_user);
      formData.append("tipo", tipo);

      addProduct(formData);
    });
  };

  return (
    <div className="SellProductContainer">
      <h2 className="SellProductTitle">
        {" "}
        <AiOutlinePlusCircle size={32} /> Agregar Producto
      </h2>
      <input
        className="SellProductInput"
        onChange={(event) => SetTitulo(event.target.value)}
        type="text"
        placeholder="Ingresa un título descriptivo"
      />
      <input
        className="SellProductInput"
        onChange={(event) => SetOldPrice(event.target.value)}
        type="number"
        placeholder="Ingresa el precio del producto"
      />
      <input
        className="SellProductInput"
        onChange={(event) => SetNewPrice(event.target.value)}
        type="number"
        placeholder="Si tienes algún descuento, indica el precio actual"
      />
      <input
        className="SellProductInput"
        onChange={(event) => SetImg(event.target.files[0])} 
        type="file"
      />
      <select
        className="SellProductInput"
        onChange={(event) => SetTipo(event.target.value)} 
      >
        <option value="Oro">🧈 Oro </option>
        <option value="Diamantes">💎 Diamantes</option>
        <option value="Acero acero inoxidable">⛓ Acero acero inoxidable</option>
        <option value="Plata">💍 Plata</option>
      </select>
      <Link to="/">
        <button className="SellProductButton" onClick={handleAddProduct}>
          Agregar <AiOutlinePlusCircle size={20} />
        </button>
      </Link>
    </div>
  );
};

export default SellProduct;
