import "./Popular.css"
import React, { useContext, useState, useEffect } from "react"; 
import { FormContext } from "../../context/FormContext";
import Axios from "axios";
import Item from "../Item/Item";
import { Link } from "react-router-dom";

const Popular = () =>
{

    const [productos, setProductos] = useState([]);

    useEffect(() => {


            Axios.post("https://tienda-de-oro.onrender.com/SearchAllProduct", {
            }).then((response) => {
                if (response.data.length > 0) {
                    setProductos(response.data);
                } else {
                    setProductos([]);
                }
            }).catch((error) => {
                console.error("No hay productos, error: ", error);
                setProductos([]);
            });
    }, [])




    return (
        <div className="popular">
            <h1>Joyeria Popular</h1>
            <hr />
            <div className="popular-item">
       

            {productos.length > 0 ? (
                productos.map((item, i) => (
                    <Item 
                        key={i} 
                        id={item.id} 
                        name={item.titulo} 
                        image={`https://tienda-de-oro.onrender.com/${item.img1}`}
                        old_price={item.old_price}  
                        new_price={item.new_price} 
                        
                    />
                ))
            ) : (
                <p>Por el momento no hay productos</p>
            )}


            </div>
        </div>
    )
}

export default Popular