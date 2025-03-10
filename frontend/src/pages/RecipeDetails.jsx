import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import "./RecipeDetails.css"; // Ensure this CSS file is linked

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log("Fetching recipe with ID:", id);

        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Recipe not found");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading recipe...</p>
      </div>
    );

  if (error)
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate("/recipes")}>
          ← Back to Recipes
        </Button>
      </Container>
    );

  if (!recipe) return <p className="text-center mt-5">No recipe found.</p>;

  return (
    <Container className="recipe-details-container mt-4">
      <Button variant="secondary" onClick={() => navigate("/recipes")}>
        ← Back to Recipes
      </Button>

      <Card className="recipe-details-card mt-3 shadow-lg">
        <Card.Img
          variant="top"
          src={recipe.image ? `http://localhost:5000${recipe.image}` : "https://via.placeholder.com/500"}
          alt={recipe.name}
          className="img-fluid rounded"
        />
        <Card.Body>
          <Card.Title className="text-center fs-3">{recipe.name}</Card.Title>

          <h4>Ingredients:</h4>
          <ul className="ingredients-list">
            {recipe.ingredients?.length > 0 ? (
              recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <p>No ingredients listed.</p>
            )}
          </ul>

          <h4>Steps:</h4>
          <ol className="steps-list">
            {recipe.steps?.length > 0 ? (
              recipe.steps.split("\n").map((step, index) => <li key={index}>{step}</li>)
            ) : (
              <p>No steps provided.</p>
            )}
          </ol>

          <div className="recipe-actions text-center mt-3">
            <Button
              variant={liked ? "danger" : "outline-danger"}
              className="me-2"
              onClick={() => setLiked(!liked)}
            >
              {liked ? "❤️ Liked" : "♡ Like"}
            </Button>

            <Button
              variant={saved ? "success" : "outline-success"}
              onClick={() => setSaved(!saved)}
            >
              {saved ? "✅ Saved" : "🗂️ Save"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
