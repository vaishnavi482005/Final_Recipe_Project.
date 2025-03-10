import React from "react";
import { Container } from "react-bootstrap";
import "./About.css";

const About = () => {
  return (
    <Container className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Tasty Recipes</strong>! Our mission is to bring food
        lovers together by sharing amazing recipes from around the world.
      </p>
      <p>
        Whether you're a home cook, a professional chef, or just someone who
        loves good food, our platform allows you to discover, share, and enjoy
        delicious recipes.
      </p>
      <h3>Our Features</h3>
      <ul>
        <li>Share your own recipes with the community</li>
        <li>Save and like your favorite recipes</li>
        <li>Edit and manage your shared recipes</li>
        <li>Search for recipes based on cuisine, meal type, and dietary needs</li>
      </ul>
      <p>Join us and start your cooking adventure today! 🍽️</p>
    </Container>
  );
};

export default About;
