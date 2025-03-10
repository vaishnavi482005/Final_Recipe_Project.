import React, { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col, Modal, Form, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePicture") || "/default-pfp.jpg");
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("shared");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      fetchUserRecipes(parsedUser.id);
    }
  }, []);

  const fetchUserRecipes = async (userId) => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
  
      console.log("Fetched User Recipes:", data);  // ✅ Debugging log
  
      if (response.ok) {
        setSharedRecipes(data.sharedRecipes || []);
        setSavedRecipes(data.savedRecipes || []);
        setLikedRecipes(data.likedRecipes || []);
      } else {
        console.error("Error fetching user recipes:", data.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };
  
  

  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setSharedRecipes(sharedRecipes.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem("profilePicture", reader.result);
        setShowModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="profile-container">
      <div className="profile-header">
        <div className="profile-pic-container" onClick={() => setShowModal(true)}>
          <img src={profilePicture} alt="Profile" className="profile-pic" />
          <div className="overlay">Change Profile Picture</div>
        </div>
        <h2>{user?.username}'s Profile</h2>
      </div>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="shared" title="Shared Recipes">
        <Row className="justify-content-center">
  {sharedRecipes.length > 0 ? (
    sharedRecipes.map((recipe) => (
      <Col key={recipe._id} md={4} className="recipe-section d-flex justify-content-center">
        <Card className="recipe-card">
        <Card.Img variant="top" src={`http://localhost:5000${recipe.image}`} className="recipe-img" />
          <Card.Body>
            <Card.Title>{recipe.name}</Card.Title>
            <div className="d-flex justify-content-between">
              <Button variant="warning" onClick={() => navigate(`/edit-recipe/${recipe._id}`)}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(recipe._id)}>Delete</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))
  ) : (
    <p>No recipes shared yet.</p>
  )}
</Row>

        </Tab>
      

        <Tab eventKey="saved" title="Saved Recipes">
  <Row className="justify-content-center gap-4">
    {savedRecipes.length > 0 ? (
      savedRecipes.map((recipe) => (
        <Col key={recipe._id} md={4} className="d-flex justify-content-center">
          <Card className="recipe-card">
            <Card.Img variant="top" src={`http://localhost:5000${recipe.image}`} className="recipe-img" />
            <Card.Body>
              <Card.Title className="text-center">{recipe.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))
    ) : (
      <p className="text-center w-100">No saved recipes.</p>
    )}
  </Row>
</Tab>


<Tab eventKey="liked" title="Liked Recipes">
  <Row className="justify-content-center gap-4">
    {likedRecipes.length > 0 ? (
      likedRecipes.map((recipe) => (
        <Col key={recipe._id} md={4} className="d-flex justify-content-center">
          <Card className="recipe-card">
            <Card.Img variant="top" src={`http://localhost:5000${recipe.image}`} className="recipe-img" />
            <Card.Body>
              <Card.Title className="text-center">{recipe.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))
    ) : (
      <p className="text-center w-100">No liked recipes.</p>
    )}
  </Row>
</Tab>
</Tabs>


      <div className="d-flex justify-content-center mt-4">
  <Button variant="success" onClick={() => navigate("/share-recipe")}>Add New Recipe</Button>
</div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Upload New Picture</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;
