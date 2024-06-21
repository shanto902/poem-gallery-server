<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Poem Gallery API</title>
</head>
<body>
  <header>
    <h1>Poem Gallery API</h1>
    <p>A RESTful API for managing poems and poets information.</p>
  </header>

  <section>
    <h2>Introduction</h2>
    <p>The Poem Gallery API is designed to provide CRUD operations for poems and poets information. It is built using MongoDB, Express.js, and Node.js (MEN stack).</p>
  </section>

  <section>
    <h2>Technologies Used</h2>
    <ul>
      <li>MongoDB - A NoSQL database for storing poems and poets data.</li>
      <li>Express.js - A web application framework for Node.js, used for handling HTTP requests and routes.</li>
      <li>Node.js - A JavaScript runtime environment used for server-side scripting.</li>
    </ul>
  </section>

  <section>
    <h2>Features</h2>
    <ul>
      <li>CRUD Operations:
        <ul>
          <li>Create: Add new poems and poets.</li>
          <li>Read: Retrieve poems and poets information.</li>
          <li>Update: Modify existing poems and poets.</li>
          <li>Delete: Remove poems and poets from the database.</li>
        </ul>
      </li>
      <li>User Management:
        <ul>
          <li>Create User: Register new users.</li>
          <li>Get User by ID: Retrieve user information by user ID.</li>
          <li>Get User by Email: Retrieve user information by email.</li>
          <li>Update User by Email: Update user information based on email.</li>
        </ul>
      </li>
      <li>Authentication: Secure API endpoints using JWT (JSON Web Token) based authentication.</li>
      <li>Validation: Input validation to ensure data integrity.</li>
      <li>Error Handling: Proper error handling and response messages.</li>
    </ul>
  </section>

  <section>
    <h2>Endpoints</h2>
    <table>
      <thead>
        <tr>
          <th>HTTP Method</th>
          <th>Endpoint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GET</td>
          <td>/poems</td>
          <td>Get all poems.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/poem/:id</td>
          <td>Get a poem by ID.</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/poem</td>
          <td>Create a new poem.</td>
        </tr>
        <tr>
          <td>PATCH</td>
          <td>/poem/:id</td>
          <td>Update an existing poem by ID.</td>
        </tr>
        <tr>
          <td>DELETE</td>
          <td>/poem/:id</td>
          <td>Delete a poem by ID.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/poets</td>
          <td>Get all poets.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/poet/:id</td>
          <td>Get a poet by ID.</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/poet</td>
          <td>Create a new poet.</td>
        </tr>
        <tr>
          <td>PATCH</td>
          <td>/poet/:id</td>
          <td>Update an existing poet by ID.</td>
        </tr>
        <tr>
          <td>DELETE</td>
          <td>/poet/:id</td>
          <td>Delete a poet by ID.</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/user</td>
          <td>Create a new user.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/user/get/:id</td>
          <td>Get a user by ID.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/user/:email</td>
          <td>Get a user by email.</td>
        </tr>
        <tr>
          <td>PATCH</td>
          <td>/user/:email</td>
          <td>Update a user by email.</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>Getting Started</h2>
    <ol>
      <li>Clone the repository: <code>git clone https://github.com/your-repo.git</code></li>
      <li>Install dependencies: <code>npm install</code></li>
      <li>Set up MongoDB and configure connection details in <code>config/db.js</code>.</li>
      <li>Start the server: <code>npm start</code></li>
    </ol>
  </section>

  <section>
    <h2>Author</h2>
    <p>Created by Ashik Ali Shanto</p>
  </section>

  <footer>
    <p>&copy; 2024 Poem Gallery API. All rights reserved.</p>
  </footer>
</body>
</html>
