import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.slice(0, 6))) // Display only first 6 recipes
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Search Bar Below Navbar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="🔍 Search for delicious recipes..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Background Image */}
      <div className="background-section">
        <div className="overlay">
          <h1 className="overlay-text">"Cooking is an art, and every recipe tells a story."</h1>
          <p className="overlay-subtext">Explore, Share, and Enjoy Delicious Recipes from Around the World.</p>
        </div>
      </div>

      {/* Recipe Cards - 2 Rows, 3 Columns */}
      <Container className="mt-4">
        <h2 className="text-center mt-4">🍽️ Shared Recipes</h2>
        <Row>
          {filteredRecipes.map((recipe, index) => (
            <Col key={recipe._id} xs={12} sm={6} md={4} lg={4} className="recipe-col">
              <Card className="recipe-card">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${recipe.image}`}
                  alt={recipe.name}
                  className="recipe-image"
                />
                <Card.Body className="text-center">
                  <Card.Title className="recipe-title">{recipe.name}</Card.Title>

                  {/* Star Ratings */}
                  <div className="star-rating">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <span key={i} className={i < (recipe.rating || 4) ? "filled-star" : "empty-star"}>
                          ★
                        </span>
                      ))}
                  </div>

                  {/* View Recipe Button */}
                  <Link to={`/recipes/${recipe._id}`}>
                    <Button variant="primary" size="sm">View Recipe</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
