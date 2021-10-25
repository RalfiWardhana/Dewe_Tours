import React from "react";
import "./cards.css";
import Card from "./card"
import Price from "../photo/price100.png"
import Jempol from "../photo/jempol.png"
import Agent from "../photo/agent.png"
import Support from "../photo/support.png"



const cards = () =>{
    return (
        <div className="cards">
           <Card 
              logo={Price}
              title = "Best Price Guarrentee"
              fill = "A Small River named duren flows by their places and suppliers"
           />
           <Card
              logo={Jempol}
              title = "Travellers loves us"
              fill = "A Small River named duren flows by their places and suppliers"
           />
           <Card
              logo={Agent}
              title = "Best Travel Agent"
              fill = "A Small River named duren flows by their places and suppliers"
           />
           <Card
              logo={Support}
              title = "Our Dedicated Support"
              fill = "A Small River named duren flows by their places and suppliers"
           />

        </div> 
    )
}

export default cards;