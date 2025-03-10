const API = import.meta.env.VITE_API_URL;

// Fetch user details
export const getUserDetails = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await fetch(API);
    const users = await response.json();
    return users.map(({ password, ...rest }) => rest); // Remove password field
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Update user details
export const updateUserDetails = async (id, name, password) => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};
