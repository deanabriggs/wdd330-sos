import productList from "./productList.mjs";
import { totalQuantity } from "./utils.mjs";
import loadAlerts from "./alert.mjs";

productList(".product-list", "tents");
loadAlerts();

document.addEventListener("DOMContentLoaded", () => {
  totalQuantity();
});
