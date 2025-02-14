import { getData } from "./productData.mjs";
import { qs } from "./utils.mjs";
import { renderListWithTemplate, totalQuantity } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__suggested_price">Suggested Price: <span class="strikethrough">$${product.SuggestedRetailPrice}</span></p>
    <p class="product-card__price">Our Price: $${product.FinalPrice}</p></a
  >
</li>`;
}

function renderList(selector, products) {
  let productList = qs(selector);
  totalQuantity();
  renderListWithTemplate(productCardTemplate, productList, products);
}

export default async function productList(selector, category) {
  let tentNames = [];
  let displayedProducts = [];
  const data = await getData(category);
  data.forEach((product) => {
    const cleanName = product.NameWithoutBrand.split("-")[0].trim();
    if (!tentNames.includes(cleanName)) {
      tentNames.push(cleanName);
      displayedProducts.push(product);
    }
  });
  renderList(selector, displayedProducts);
}
