const showModal = (modal) => {
  modal.classList.remove("hide");
};
const hideModal = (modal) => {
  modal.classList.add("hide");
};

const redirectTo = (location) => {
  window.location.href = location;
};

const showNotification = (message, notificationElement) => {
  notificationElement.textContent = message;
  notificationElement.classList.remove("hidden");

  setTimeout(() => {
    notificationElement.textContent = "";
    notificationElement.classList.add("hidden");
  }, 3000);
};

export { showModal, hideModal, redirectTo, showNotification };
