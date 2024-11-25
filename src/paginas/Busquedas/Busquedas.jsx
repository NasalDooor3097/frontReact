import React, { useContext } from "react";
import "./Busquedas.css";
import { ShopContext } from "../../context/ShopContext"; 
import Item from "../../componentes/Item/Item";

const Busquedas = () => {
  const { stateSearch, SetSateSearch } = useContext(ShopContext); 

  return (
    <div>


      {stateSearch.map((item, i) => (
        <Item 
          key={i} 
          id={item.id} 
          name={item.titulo} 
          image={`https://tienda-de-oro.onrender.com/${item.img1}`} 
          old_price={item.old_price} 
          new_price={item.new_price} 
        />
      ))}
    </div>
  );
};

export default Busquedas;
