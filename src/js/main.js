import productList from "./productList.mjs";
import { totalQuantity } from "./utils.mjs";

productList(".product-list", "tents");

document.addEventListener("DOMContentLoaded", () => {
  totalQuantity();
});
