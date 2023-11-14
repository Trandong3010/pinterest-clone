const express = require('express');
const faker = require('faker');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// In-memory data
let posts = [];

// Generate a random image URL using Faker
const generateRandomImageUrl = () => faker.image.imageUrl();

// Generate a random post
const generateRandomPost = () => ({
  id: faker.datatype.uuid(),
  image: generateRandomImageUrl(),
  name: faker.name.title(),
  description: faker.lorem.sentence(),
});

// Populate the posts array with some initial data
for (let i = 0; i < 10; i++) {
  posts.push(generateRandomPost());
}

// Get the list of posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get details of a specific post
app.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  const post = posts.find((p) => p.id === postId);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});