import React, { useState, useEffect } from "react";
import { MenuItem } from "../types/type";
import MenuCard from "../components/MenuCard";
import "../styles/MenuPage.css";
import { useAuth } from "../context/AuthContext";
import { getRecipes, deleteRecipe } from "../utils/recipes";

const MenuPage: React.FC = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const restaurantId = user?.restaurant?.id || "";

  const fetchRecipes = async (isIgnore: boolean = false) => {
    setLoading(true);
    try {
      const res = await getRecipes(restaurantId);
      if (res) {
        if (!isIgnore) {
          setMenuItems(res.data);
        }
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      setLoading(true);
      const res = await deleteRecipe(restaurantId, id);
      if (res) {
        fetchRecipes();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isIgnore = false;

    fetchRecipes(isIgnore);

    return () => {
      isIgnore = true;
    };
  }, [user?.restaurant?.id]);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="menu-container">
      <div className="category-section">
        {menuItems.map((category: any) => (
          <div className="category" key={category.category}>
            <h2>{category.category}</h2>
            <div className="type-section">
              {category.types.map((type: any) => (
                <div className="type" key={type.type}>
                  <h3 className="type-heading-name">{type.type}</h3>
                  <div className="menu-items">
                    {type.items.map((item: MenuItem) => (
                      <MenuCard
                        key={item.name}
                        item={item}
                        onDelete={() => handleDeleteItem(item.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
