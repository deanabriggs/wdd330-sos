import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function showCartTotal(products) {
  let total = 0;
  products.forEach((product) => (total += product.FinalPrice));
  document.querySelector(".cart-footer").innerHTML = `Total: $${total}`;
  const cartFooterElement = document.querySelector(".cart-footer");
  if (total > 0) {
    cartFooterElement.classList.remove("hide");
  } else {
    cartFooterElement.classList.add("hide");
  }
}

function removeItemFromCart(itemId) {
  const cartItems = getLocalStorage("so-cart");
  // Create a new array for all items that does not have the same id
  const updatedCart = cartItems.filter(item => item.Id !== itemId);

  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  // if cart is empty, create an array
  if (cartItems === null || cartItems === undefined) {
    setLocalStorage("so-cart", []);
    cartItems = [];
  }

  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  cartItems.map((item) => {
    const cartItemHTML = cartItemTemplate(item);

    // Create the remove item button (X)
    const removeButton = document.createElement("span");
    removeButton.textContent = "Ｘ";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("product-id", item.Id);

    // Event listener for remove item button
    removeButton.addEventListener("click", (e) => {
      const itemId = e.target.getAttribute("product-id");
      removeItemFromCart(itemId);
    });

    // Wrap the item HTML and add the remove item button
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("cart-item-container");
    itemContainer.innerHTML = cartItemHTML;
    itemContainer.prepend(removeButton);

    productList.appendChild(itemContainer);
  })

  showCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
