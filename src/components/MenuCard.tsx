import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuItem } from "../types/type";
import "../styles/MenuCard.css";

const { VITE_IMAGE_API_URL } = import.meta.env;

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="menu-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="icon-container">
        {isHovered && (
          <>
            <NavLink to={`/edit-recipe/${item.id}`} className="edit-btn">
              <span className="material-icons-round">edit</span>
            </NavLink>

            <button className="delete-btn">
              <span className="material-icons-round">delete</span>
            </button>
          </>
        )}
      </div>
      <div className="menu-card-img">
        {item?.image ? (
          <img src={`${VITE_IMAGE_API_URL}/${item.image}`} alt={item.name} />
        ) : (
          <div className="no-image-placeholder">No Image</div>
        )}
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="menu-card-price">${item.price}</p>
      <p>{item.availability ? "Available" : "Not Available"}</p>
    </div>
  );
};

export default MenuCard;
