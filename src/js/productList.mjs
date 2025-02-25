import { getProductsByCategory } from "./externalServices.mjs";
import { qs, renderWithTemplate } from "./utils.mjs";
import { renderListWithTemplate, totalQuantity } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimarySmall}"
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
  renderListWithTemplate(productCardTemplate, productList, products);
}

function breadCrumbTemplate(category, productCount) {
  return async function () {
    const template = `<div className="breadcrumb">
  <a href="/">${category}</a>
  <span className="separator">-></span>
  <span>(${productCount} items)</span>
</div>`;
    return template;
  };
}

function renderBreadCrumbs(category, productCount) {
  const templateFn = breadCrumbTemplate(category, productCount);
  const breadcrumbContainer = document.querySelector(".breadcrumb-container");
  renderWithTemplate(templateFn, breadcrumbContainer);
}

export default async function productList(selector, category) {
  let tentNames = [];
  let displayedProducts = [];
  const data = await getProductsByCategory(category);
  const productCount = data.length;
  renderBreadCrumbs(category, productCount);
  data.forEach((product) => {
    const cleanName = product.NameWithoutBrand.split("-")[0].trim();
    if (!tentNames.includes(cleanName)) {
      tentNames.push(cleanName);
      displayedProducts.push(product);
    }
  });
  renderList(selector, displayedProducts);
}
