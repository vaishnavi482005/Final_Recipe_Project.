import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ShareRecipe = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [duration, setDuration] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const token = localStorage.getItem("token"); // ✅ Ensure token is included

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // ✅ Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("duration", duration);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);

    try {
      const response = await fetch("http://localhost:5000/api/recipes/add", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`,  }, // ✅ Include auth token
        body: formData, // ✅ Send as FormData (DO NOT include Content-Type manually)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Recipe shared successfully!");
      } else {
        alert(`Failed to share recipe: ${data.message}`);
      }
    } catch (error) {
      alert("Server error, please try again.");
      console.error(error);
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Share a New Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Duration (e.g., 30 minutes)</Form.Label>
          <Form.Control type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients (comma-separated)</Form.Label>
          <Form.Control type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Steps</Form.Label>
          <Form.Control as="textarea" rows={4} value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </Form.Group>

        <Button className="mt-3" variant="success" type="submit">
          Share Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default ShareRecipe;
