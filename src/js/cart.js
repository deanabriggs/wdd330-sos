import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function showCartTotal(products) {
  let total = 0;
  products.forEach((product) => (total += product.FinalPrice));
  document.querySelector(".cart-footer").innerHTML = `Total: \$${total}`;
  const cartFooterElement = document.querySelector(".cart-footer");
  console.log(total);
  if (total > 0) {
    cartFooterElement.classList.remove("hide");
  } else {
    cartFooterElement.classList.add("hide");
  }
}

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems === null || cartItems === undefined) {
    setLocalStorage("so-cart", []);
    cartItems = [];
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
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

