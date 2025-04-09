import { getProductsByCategory, findProductById } from "./externalServices.mjs";
import {
  qs,
  renderWithTemplate,
  renderListWithTemplate,
  totalQuantity,
  loadTemplate,
} from "./utils.mjs";
import { calculateDiscountPercentage } from "./productDetails.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimarySmall}"
      alt="${product.Name}" 
      loading="lazy"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__suggested_price">Suggested Price: <span class="strikethrough">$${product.SuggestedRetailPrice}</span></p>
    <p class="product-card__price">Our Price: $${product.FinalPrice}</p></a>
  <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
</li>`;
}

function renderProductDetails(product) {
  qs("#modalProductName").innerText = product.Brand.Name;
  qs("#modalProductNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs("#modalProductImage").src = product.Images.PrimaryLarge;
  qs("#modalProductImage").alt = product.Name;
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    let discount =
      "Discount -" +
      calculateDiscountPercentage(
        product.SuggestedRetailPrice,
        product.FinalPrice
      ) +
      "% OFF";
    qs(
      "#modalProductDiscount"
    ).innerHTML = `<span class="flag-discount">${discount}</span>`;
  }
  qs("#modalProductSuggestPrice").innerHTML =
    `<span class="product-card__suggested_price">Suggested Price: <span
  class="strikethrough">$${product.SuggestedRetailPrice}</span></span>`;
  qs("#modalProductFinalPrice").innerHTML = `Our Price: <strong>$${product.FinalPrice}</strong>`;
  qs("#modalProductColorName").innerText = product.Colors[0].ColorName;
  qs("#modalProductDescHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
}

async function showProductModal(product) {
  const modalElement = document.getElementById("productModal");
  await renderWithTemplate(
    loadTemplate("/partials/product-detail.html"),
    modalElement
  );
  const productFn = renderProductDetails(product);
  modalElement.classList.remove("hide");
  const modal = document.querySelector("#productModal");
  const closeBtn = document.querySelector(".close");
  closeBtn.onclick = () => {
    modalElement.classList.add("hide");
  };
  window.onclick = (event) => {
    if (event.target === modal) {
      modalElement.classList.add("hide");
    }
  };
}

async function addQuickViewEventListener() {
  const buttons = document.querySelectorAll(".quick-view-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-id");
      const product = await findProductById(productId);
      await showProductModal(product);
    });
  });
}

function renderList(selector, products) {
  let productList = qs(selector);
  renderListWithTemplate(productCardTemplate, productList, products);
  addQuickViewEventListener();
}

function breadCrumbTemplate(category, productCount) {
  return async function () {
    const template = `<div class="breadcrumb">
  <a href="/">${category}</a>
  <span class="separator">-></span>
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

document.addEventListener("DOMContentLoaded", () => {
  totalQuantity();
});
