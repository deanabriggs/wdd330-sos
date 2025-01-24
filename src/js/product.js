import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

const productId = getParam("product");
console.log(findProductById(productId));

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || []; // retrieve current cart info from local storage or make an empty list
  const exists = cart.some((cartItem) => cartItem.Id === product.Id); // check if the product is already in the cart

  // if the product isn't already in the cart, add it, otherwise do nothing
  if (!exists) {
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
