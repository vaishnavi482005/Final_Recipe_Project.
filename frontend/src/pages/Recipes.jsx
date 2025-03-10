import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Recipes.css"; // Ensure CSS is imported

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes") // Fetching recipes from backend
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  return (
    <Container className="recipes-container mt-4">
      <h2 className="text-center">Explore Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={`http://localhost:5000${recipe.image}`} alt={recipe.name} />
            <div className="card-body">
              <h5 className="card-title">{recipe.name}</h5>
              {recipe.description && <p className="card-text">{recipe.description}</p>} {/* Removes empty descriptions */}
              <Link to={`/recipes/${recipe._id}`}>
                <Button className="btn-primary">View Recipe</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Recipes;
