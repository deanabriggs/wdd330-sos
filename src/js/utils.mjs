// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param = "product") {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "beforeend",
  clear = true
) {
  if (clear) {
    while (parentElement.lastChild) {
      parentElement.lastChild.remove();
    }
  }
  list.map((item) => {
    const templateItem = templateFn(item);
    parentElement.insertAdjacentHTML(position, templateItem);
  });
}

export function totalQuantity() {
  const cart = getLocalStorage("so-cart") || [];
  if (cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + Number(item.Quantity), 0);
  qs(".superscript").innerText = total;

  return total;
}

export function inject404Page(selector) {

  // Select the main content element to replace
  const mainContent = document.querySelector(selector);

  mainContent.innerHTML = "";

  // Create 404 content
  const section = document.createElement("section");
  section.classList.add("error-page");

  const heading = document.createElement("h1");
  heading.textContent = "404 - Product Not Found";

  const message = document.createElement("p");
  message.textContent = "The product you are looking for does not exist or may have been removed.";

  // Append 404 content
  section.appendChild(heading);
  section.appendChild(message);

  mainContent.appendChild(section);
}