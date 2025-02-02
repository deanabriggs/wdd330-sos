// Responsible for all of the functionality needed to lookup data for a specific product and display it in HTML
import {
  getLocalStorage,
  setLocalStorage,
  qs,
  totalQuantity,
} from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product = {};

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // add a listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", () => addProductToCart(product));
}

function addProductToCart(productInfo) {
  const cart = getLocalStorage("so-cart") || []; // retrieve current cart info from local storage or make an empty list
  const existingProd = cart.find((cartItem) => cartItem.Id === productInfo.Id); // check if the product is already in the cart

  // if the product already exists in the cart, increase the Quantity
  if (existingProd) {
    existingProd.Quantity = Number(existingProd.Quantity) + 1;
    // If the product doesn't exist in the cart, add the item with a Quantity of 1
  } else {
    productInfo.Quantity = 1;
    cart.push(productInfo);
  }

  // Set LocalStorage with new cart values
  setLocalStorage("so-cart", cart);
  totalQuantity();

  // should play if quantity is changed or product is added
  playBounce();
}

function playBounce() {
  const bounceElement = qs(".bounce");
  bounceElement.classList.add("play-bounce");
  setTimeout(() => {
    bounceElement.classList.remove("play-bounce");
  }, 2000);
}

function renderProductDetails() {
  qs("#productName").innerText = product.Brand.Name;
  qs("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs("#productImage").src = product.Image;
  qs("#productImage").alt = product.Name;
  qs("#productFinalPrice").innerText = product.FinalPrice;
  qs("#productColorName").innerText = product.Colors[0].ColorName;
  qs("#productDescHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  qs("#addToCart").dataset.id = product.Id;
}

document.addEventListener("DOMContentLoaded", () => {
  totalQuantity();
});
