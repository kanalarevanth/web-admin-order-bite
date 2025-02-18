import { getData, postData, putData } from "../utils/api";

const { VITE_API_URL } = import.meta.env;

export const recipeTypes = [
  { label: "Biryani", value: "biryani" },
  { label: "Starters", value: "starters" },
  { label: "Curries", value: "curries" },
  { label: "Rice Dishes", value: "rice-dishes" },
  { label: "Sandwiches", value: "sandwiches" },
  { label: "Pizzas", value: "pizzas" },
  { label: "Burgers", value: "burgers" },
  { label: "Soups", value: "soups" },
  { label: "Sweets", value: "sweets" },
  { label: "Beverages", value: "beverages" },
  { label: "Salads", value: "salads" },
  { label: "Thalis", value: "thalis" },
  { label: "Rotis", value: "rotis" },
];

export const categories = [
  { label: "Veg", value: "veg" },
  { label: "Non Veg", value: "non-veg" },
  { label: "Dessert", value: "dessert" },
  { label: "Beverages", value: "beverages" },
  { label: "Salads", value: "salads" },
  { label: "Snacks", value: "snacks" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Sweets", value: "sweets" },
];

export const getRecipes = async (restaurantId: string, query: any = {}) => {
  try {
    const res = await getData({
      url: `${VITE_API_URL}/${restaurantId}/recipes`,
      query,
    });
    if (res?.data) {
      return res;
    }
    throw new Error();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
};

export const getRecipe = async (restaurantId: string, id: string) => {
  try {
    const res = await getData({
      url: `${VITE_API_URL}/${restaurantId}/recipes/${id}`,
    });
    if (res?.data) {
      return res;
    }
    throw new Error();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
};

export const addRecipe = async (restaurantId: string, data: FormData) => {
  try {
    const res = await postData({
      url: `${VITE_API_URL}/${restaurantId}/recipes`,
      body: data,
      multipart: true,
    });
    if (res?.status === "SUCCESS") {
      return res;
    }
    throw new Error();
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const editRecipe = async (
  restaurantId: string,
  recipeId: string,
  data: FormData
) => {
  try {
    const res = await putData({
      url: `${VITE_API_URL}/${restaurantId}/recipes/${recipeId}`,
      body: data,
      multipart: true,
    });
    if (res?.status === "SUCCESS") {
      return res;
    }
    throw new Error();
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
