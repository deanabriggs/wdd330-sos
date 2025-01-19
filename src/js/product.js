import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // Retrieve the cart data from local storage
  let cart = getLocalStorage("so-cart");

  if (cart) {
    // If the cart exists and is an array, add the new product
    if (Array.isArray(cart)) {
      cart.push(product);
    } else {
      // If the cart contains a single item, convert it to an array and add the new product
      cart = [cart, product];
    }
  } else {
    // If no cart exists, create a new array with the product
    cart = [product];
  }

  // Save the updated cart back to local storage
  setLocalStorage("so-cart", cart);
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
