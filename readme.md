# VanillaJsonAuth

A simple authentication system with signup, login, and home page functionality using vanilla JavaScript, JSON Server, and basic CSS for styling.

## Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [Usage](#usage)
4. [Dependencies](#dependencies)

## Overview

This project implements a basic authentication system with signup, login, and home pages. It uses `JSON Server` to mock the backend and provides an example of handling user authentication using `localStorage`.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/gauravshresthaofficial/VanillaJsonAuth.git
cd VanillaJsonAuth
```

### 2. Install Dependencies

Install the necessary npm packages (including JSON Server) by running:

```bash
npm install
```

### 3. Create a .env File

Locate the .envSample file in the project directory. Create a new .env file by copying its contents and replacing "YOUR_URL" with your actual API endpoint.

### 4. Start the JSON Server

To run the mock backend server, use the following command:

```bash
npx json-server db.json
```

This will start a server on `http://localhost:3000`, and the API will be available for handling user data (signup, login, etc.).

### 4. Run the Frontend

To view the application in your browser, you can start the development server with:

```bash
npm run dev
```

This will serve the pages (`index.html`, `signup.html`, `login.html`, `profile.html`) and the JavaScript files.

## Usage

### Signup

- Go to the `signup.html` page.
- Fill in the name, email, and password fields to register a new user.
- If the email already exists, you'll be prompted with an error.

### Login

- Go to the `login.html` page.
- Use the registered email and password to log in.
- After successful login, you will be redirected to the `index.html` page.

### Home Page

- After logging in successfully, the user will be redirected to the home page where they can view a welcome message.

### Profile Page

- The user will be able to edit/update the user information.

## Dependencies

- **JSON Server**: Used to mock the backend API (`db.json`).
- **Vanilla JavaScript**: For implementing the authentication logic, form handling, and DOM manipulation.
- **CSS**: Basic styling for the UI.

To install dependencies:

```bash
npm install
```

This project demonstrates the use of JSON Server as a mock backend to simulate user authentication flows.
