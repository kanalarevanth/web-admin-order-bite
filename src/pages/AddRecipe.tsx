import React, { useState, useEffect } from "react";
import {
  recipeTypes,
  categories,
  addRecipe,
  getRecipe,
  editRecipe,
} from "../utils/recipes";
import { MenuItem } from "../types/type";
import { useNavigate } from "react-router-dom";
import "../styles/AddRecipe.css";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const AddRecipePage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<MenuItem>({
    name: "",
    description: "",
    price: 0,
    category: categories[0].value,
    type: recipeTypes[0].value,
    availability: true,
    image: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams();
  const recipeId = params?.recipeId || "";
  const restaurantId = user?.restaurant?.id || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (data?.image) {
        formData.append("image", data?.image);
      }

      const res = recipeId
        ? await editRecipe(restaurantId, recipeId, formData)
        : await addRecipe(restaurantId, formData);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeData = async (id: string) => {
    try {
      setLoading(true);
      const recipeData = await getRecipe(restaurantId, id);
      if (recipeData && recipeData?.data) {
        setData({
          ...recipeData.data,
        });
      }
    } catch (error) {
      console.error("Failed to fetch recipe data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId) {
      fetchRecipeData(recipeId);
    }
  }, [recipeId]);

  return (
    <div className="add-recipe-container">
      <div className="add-recipe-form">
        {loading && <Loader />}
        <h2>{recipeId ? "Edit" : "Add New"} Recipe</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipe Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group row">
            <div className="half-width">
              <label>Category</label>
              <select
                name="category"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
              >
                {Object.values(categories).map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="half-width">
              <label>Type</label>
              <select
                name="type"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
              >
                {Object.values(recipeTypes).map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="half-width">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                min={1}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {recipeId
              ? loading
                ? "Updating..."
                : "Edit Recipe"
              : loading
                ? "Adding..."
                : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;
