Indian Cuisine API
A RESTful API service that helps users explore Indian cuisine. The API provides information about various Indian dishes, their ingredients, cooking times, origins, and more.
Features

Get all dishes with filtering, sorting, and pagination
Search for specific dishes by name
Find dishes based on available ingredients
Advanced filtering using MongoDB query operators
Field selection for optimized responses
Sorting by multiple criteria

Prerequisites
Before running this project, make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (v4.4 or higher)
npm (Node Package Manager)

Clone the repository

Install dependencies

Create a config.env file in the root directory and add the following:
PORT=3000
DB_URI=mongodb://localhost:27017/indian-food

Create a MongoDB database named 'indian-food'

Seed the database. Doing it only once is enough
node seed/dishseeder.js

Start the server
node server.js