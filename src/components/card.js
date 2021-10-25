import React from "react";
import "./card.css";


const Card = (props) =>{
    return (
        <div className="card-home">
           <img src = {props.logo} style={{marginBottom:"20px"}}></img>
           <h4 style={{marginBottom:"20px"}}>{props.title}</h4>
           <p>{props.fill}</p>
        </div> 
    )
}

export default Card;