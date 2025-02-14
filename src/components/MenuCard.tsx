import React from "react";
import { MenuItem } from "../types/type";
import "../styles/MenuCard.css";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="menu-card">
      <img
        className="menu-card-img"
        src={`http://localhost:3006/${item.image}`}
        alt={item.name}
      />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <span>${item.price}</span>
      <p>{item.availability ? "Available" : "Not Available"}</p>
    </div>
  );
};

export default MenuCard;
