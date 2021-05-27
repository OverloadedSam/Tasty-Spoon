# Tasty Spoon

This project is a online food/grocery ordering web application developed using MERN stack with PayPal payment gateway implemented.

## Requirements

- `node >= 14.0.0`
- `npm >= 6.14.8`

## Usage

    $ git clone https://github.com/OverloadedSam/Tasty-Spoon.git

  2. Move to the below locations and run `npm install` from there

    $ cd Tasty-Spoon/frontend/
    $ cd Tasty-Spoon/backend/

  3. Install project dependencies (For both frontend and backend).

    $ npm install

## Environment Variables

You have to set the environment variables of your configuration before starting the server.

### 1. Environment variables for backend
Make a `.env` file in the `Tasty-Spoon/backend/` directory and set following environment variables.
- PORT = 8000
- API = /api/v1
- DB_CONNECTION_STRING = {mongoDB_connection_string}
- SALT = 10
- SECRET = {secret_required_for_jwt}
- JWT_EXPIRY = 1d
- PAYPAL_CLIENT_ID = {your_paypal_client_id}

### 3. Environment variables for frontend

Place a `.env` file at `Tasty-Spoon/frontend/` directory and set following environment variables.

- REACT_APP_API_UR L= {backend_api_url} // e.g. http://localhost:8000/api/v1

## Running The Project

### Run backend (Node API)

    $ cd backend/ // go to backend directory
    $ npm start // run backend with hot reloading.

    // or you can run the backend with standard node command
    $ node index.js

### Run frontend (React app)

    $ cd frontend/ // go to frontend directory
    $ npm start
