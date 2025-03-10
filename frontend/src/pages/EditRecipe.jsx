import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    ingredients: "",
    steps: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        alert("Recipe updated successfully!");
        navigate("/profile");
      } else {
        alert("Error updating recipe.");
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  return (
    <Container>
      <h2>Edit Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control type="text" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients</Form.Label>
          <Form.Control type="text" value={recipe.ingredients} onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Steps</Form.Label>
          <Form.Control as="textarea" rows={4} value={recipe.steps} onChange={(e) => setRecipe({ ...recipe, steps: e.target.value })} required />
        </Form.Group>

        <Button className="mt-3" variant="success" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditRecipe;
