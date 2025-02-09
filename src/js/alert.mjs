import {
  loadTemplate,
  renderListWithTemplate,
  renderWithTemplate,
} from "./utils.mjs";

async function fetchAlerts() {
  const response = await fetch("../json/alerts.json");
  return await response.json();
}

function alertTemplate(alert) {
  return `<p style="background: ${alert.background}; color: ${alert.color};">${alert.message}</p>`;
}

export async function loadAlerts() {
  const alerts = await fetchAlerts();
  if (alerts.length > 0) {
    const mainElement = document.querySelector("main");
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");
    mainElement.prepend(alertSection);
    renderListWithTemplate(alertTemplate, alertSection, alerts);
  }
}

export async function showRegisterModal() {
  const modalFn = loadTemplate("/partials/registration-modal.html");
  let modalElement = document.querySelector("#registrationModal");
  await renderWithTemplate(modalFn, modalElement);
  const modal = document.querySelector("#registrationModal");
  const closeBtn = document.querySelector(".close");
  const registerBtn = document.querySelector("#registerButton");
  closeBtn.onclick = () => {
    modalElement.classList.add("hide");
  };
  registerBtn.onclick = () => {
    modalElement.classList.add("hide");
  };
  window.onclick = (event) => {
    if (event.target === modal) {
      modalElement.classList.add("hide");
    }
  };
}
