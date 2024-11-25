import React, { useContext, useState } from "react";
import Hero from "../componentes/hero/Hero"
import Popular from "../componentes/popular/Popular"
import Offers from "../componentes/offers/Offers"
import NewCollections from "../componentes/NewCollections/NewCollections";
import NewsLetter from "../componentes/NewsLetter/NewsLetter";
import Footer from "../componentes/footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Shop = () =>{

    const navigate = useNavigate();
    const [searchss, Setsearchss] = useState("");
    const { stateSearch, SetSateSearch } = useContext(ShopContext) // Usar el contexto correcto
  

    const BuscarProducto = () =>{
        navigate("/Busquedas")
        axios.post("https://tienda-de-oro.onrender.com/TitleProduct",{
            producto:searchss
        }).then((results) =>{
            console.log(results.data);
            SetSateSearch(results.data)
        })
    }


    return(
        <div>
            <input 
            onChange={(event) =>{
                Setsearchss(event.target.value);
            }}
            type="text"  placeholder="Ingresa lo que se te antoja buscar "/>
            <button onClick={BuscarProducto}>Buscar 🔍</button>
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
            <NewsLetter/>
            <Footer/>
        </div>
    )
}

export default Shop