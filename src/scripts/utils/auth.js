const API = import.meta.env.VITE_API_URL;

// Check if user is logged in
export const isLoggedIn = () => {
  return localStorage.getItem("user");
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API}?email=${email}&password=${password}`);
    const users = await response.json();

    // If no user matches the provided credentials, return null
    if (users.length === 0) {
      return null; // No matching user found
    }

    const user = users[0];

    // Store only necessary user details in localStorage
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem("user", JSON.stringify(userData)); // Store safe data

    return userData; // Return user data on successful login
  } catch (error) {
    console.error("Error during login:", error);
    return null; // Return null if there's an error during login
  }
};

// Signup function (Prevents duplicate emails)
export const signupUser = async (name, email, password) => {
  try {
    const response = await fetch(API);
    const users = await response.json();

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      return null; // Email already exists
    }

    const newUser = { name, email, password };

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    return newUser; // Successful signup
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
};
