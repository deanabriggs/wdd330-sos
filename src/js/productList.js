import productList from "./productList.mjs";
import { loadHeaderFooter, getParam, totalQuantity } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", getParam("category"));

document.addEventListener("DOMContentLoaded", () => {
  totalQuantity();
});
