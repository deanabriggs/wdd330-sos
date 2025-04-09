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

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
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
    if (parentElement) {
      parentElement.innerHTML = "";
    }
  }
  list.map((item) => {
    const templateItem = templateFn(item);
    if (parentElement) {
      parentElement.insertAdjacentHTML(position, templateItem);
    }
  });
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  callback,
  data,
  position = "beforeend",
  clear = true
) {
  if (clear) {
    if (parentElement) {
      parentElement.innerHTML = "";
    }
  }

  const template = await templateFn();
  if (parentElement) {
    parentElement.insertAdjacentHTML(position, template);
  }
  if (callback) {
    callback(data);
  }
}

export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const header = document.querySelector("#mainHeader");
  const footer = document.querySelector("#mainFooter");
  renderWithTemplate(headerTemplateFn, header, null, null, "beforeend", false);
  renderWithTemplate(footerTemplateFn, footer);
}

export function totalQuantity() {
  const cart = getLocalStorage("so-cart") || [];
  if (cart.length === 0) return null;

  const total = cart.reduce((sum, item) => sum + Number(item.Quantity), 0);

  const headerCheck = setInterval(() => {
    const superscriptElement = qs("#superscript");
    if (superscriptElement) {
      clearInterval(headerCheck);
      superscriptElement.innerText = total;
    }
  }, 100);

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
  message.textContent =
    "The product you are looking for does not exist or may have been removed.";

  // Append 404 content
  section.appendChild(heading);
  section.appendChild(message);

  mainContent.appendChild(section);
}

// Converts form data to JSON format
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement), // Create a FormData object form the form
    convertedJSON = {}; // Empty object to store key-value pairs

  formData.forEach(function(value, key) {
    // Loop through form data entries
    convertedJSON[key] = value; // assign key-value pairs to JSON object
  });

  return convertedJSON; // Return formatted JSON object
}
