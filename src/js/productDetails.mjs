// Responsible for all of the functionality needed to lookup data for a specific product and display it in HTML
import {
  getLocalStorage,
  setLocalStorage,
  qs,
  totalQuantity,
  inject404Page,
} from "./utils.mjs";

import { findProductById, findRandomProduct } from "./productData.mjs";

let product = {};

//Random Products

function getRandomStringFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
let recProducts = [
  "880RR",
  "989CG",
  "985PR",
  "880RT",
  "344YJ"
];
let randomProduct1 = {};
let randomProduct2 = {};
let randomProduct3 = {};

export default async function productDetails(productId) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);

  //Random Products
  randomProduct1 = await findProductById(getRandomStringFromArray(recProducts));
  randomProduct2 = await findProductById(getRandomStringFromArray(recProducts));
  randomProduct3 = await findProductById(getRandomStringFromArray(recProducts));

  if (product) {
    // once we have the product details we can render out the HTML
    renderProductDetails(productId);
   
    //Random Products
    renderRandomProduct();
    // add a listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", () => addProductToCart(product));
  } else {
    // Display error page
    inject404Page("main.divider");
  }
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

function calculateDiscountPercentage(suggestedPrice, storePrice) {
    
  if (suggestedPrice <= storePrice) {
      return 0; 
  }

  var discountAmount = suggestedPrice - storePrice;

  var discountPercentage = (discountAmount / suggestedPrice) * 100;

  return Math.round(discountPercentage * 100) / 100;
}

function renderProductDetails(productId) {
  qs("#productName").innerText = product.Brand.Name;
  qs("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs("#productImage").src = product.Image;
  qs("#productImage").alt = product.Name;
  if(product.FinalPrice < product.SuggestedRetailPrice){
    var discount = "Discount -" + calculateDiscountPercentage(product.SuggestedRetailPrice, product.FinalPrice) + "% OFF";
    qs("#productDiscount").innerHTML = '<span class="flag-discount" id="productDiscount">' + discount + '</span>';
  }
  qs("#productSuggestPrice").innerHTML =
    '<p class="product-card__suggested_price">Suggested Price: <span class="strikethrough">$' +
    product.SuggestedRetailPrice +
    "</span></p>";
  qs("#productFinalPrice").innerText = "Our Price: $" + product.FinalPrice;
  qs("#productColorName").innerText = product.Colors[0].ColorName;
  qs("#productDescHtmlSimple").innerHTML = product.DescriptionHtmlSimple;

  // Create the button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("product-detail__add");

  // Create the Add to Cart button
  const addToCartButton = document.createElement("button");
  addToCartButton.id = "addToCart";
  addToCartButton.dataset.id = product.Id;
  addToCartButton.textContent = "Add to Cart";

  // Append the button to the container
  buttonContainer.appendChild(addToCartButton);

  // Inject into DOM
  document.body.appendChild(buttonContainer);
  totalQuantity();
}

//Random Products
function renderRandomProduct() {
  qs("#productNameWithoutBrand1").innerText = randomProduct1.NameWithoutBrand;
  qs("#productImage1").src = randomProduct1.Image;
  qs("#productImage1").alt = randomProduct1.Name;
  qs("#productFinalPrice1").innerText = "$" + randomProduct1.FinalPrice;
  qs("#productLink1").innerHTML = '<a class="recBuy" href="/product_pages/index.html?product=' + randomProduct1.Id + '">Buy Now</a>';

  qs("#productNameWithoutBrand2").innerText = randomProduct2.NameWithoutBrand;
  qs("#productImage2").src = randomProduct2.Image;
  qs("#productImage2").alt = randomProduct2.Name;
  qs("#productFinalPrice2").innerText = "$" + randomProduct2.FinalPrice;
  qs("#productLink2").innerHTML = '<a class="recBuy" href="/product_pages/index.html?product=' + randomProduct2.Id + '">Buy Now</a>';

  qs("#productNameWithoutBrand3").innerText = randomProduct3.NameWithoutBrand;
  qs("#productImage3").src = randomProduct3.Image;
  qs("#productImage3").alt = randomProduct3.Name;
  qs("#productFinalPrice3").innerText = "$" + randomProduct3.FinalPrice;
  qs("#productLink3").innerHTML = '<a class="recBuy" href="/product_pages/index.html?product=' + randomProduct3.Id + '">Buy Now</a>';
}
