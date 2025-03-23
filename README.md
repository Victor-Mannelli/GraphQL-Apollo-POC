# GraphQL Apollo POC  

This is a proof of concept (POC) project demonstrating the creation of a GraphQL API using Apollo Server and a frontend client using Apollo Client with React.  

## 🚀 Getting Started  

### Prerequisites  
Make sure you have the following installed on your machine:  
- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

### Installation  
1. Clone this repository:  

```bash 
  git clone https://github.com/Victor-Mannelli/GraphQL-Apollo-POC.git graphql-apollo-poc

  cd graphql-apollo-poc
```

2. Install dependencies for both the server and client:

```bash 
cd server
npm install

cd ../client
npm install
```

## ▶ Running the Project
Start the GraphQL Server
To start the backend GraphQL API:

```bash 
node server/main.js
```

Start the Frontend
Navigate to the client folder and start the React application:

```bash 
npm run dev
```
The frontend should now be accessible at http://localhost:5173 (default Vite port).

## 🛠 Technologies Used
Backend: Apollo Server, GraphQL, Node.js

Frontend: React, Apollo Client, TypeScript, Vite

## 📌 Features

Full CRUD operations using GraphQL

Apollo Client for state management

Modularized queries and mutations

## 📂 Project Structure

```bash 
/server    → GraphQL API with Apollo Server  
/client    → Frontend React app with Apollo Client  
```

## 📚 References  
This POC was inspired by the following resource: 

- [GraphQL + Apollo Crash Course](https://www.youtube.com/watch?v=BNYwj0ZvU1U&ab_channel=PedroTech)

## 📜 License
This project is licensed under the MIT License.
