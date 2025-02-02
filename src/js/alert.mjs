import { renderListWithTemplate } from "./utils.mjs";

async function fetchAlerts() {
  const response = await fetch("../json/alerts.json");
  return await response.json();
}

function alertTemplate(alert) {
  return `<p style="background: ${alert.background}; color: ${alert.color};">${alert.message}</p>`;
}

export default async function loadAlerts() {
  const alerts = await fetchAlerts();
  if (alerts.length > 0) {
    const mainElement = document.querySelector("main");
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");
    mainElement.prepend(alertSection);
    renderListWithTemplate(alertTemplate, alertSection, alerts);
  }
}
