// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
const isValidPassword = (password) => {
  return password.length >= 6;
};

// Empty field check
const isNotEmpty = (value) => {
  return value.trim() !== "";
};

export { isValidEmail, isValidPassword, isNotEmpty };
