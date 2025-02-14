import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import MenuPage from "./pages/MenuPage";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContextProvider, useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<MenuPage />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
