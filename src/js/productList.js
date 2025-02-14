import productList from "./productList.mjs";
import { totalQuantity, loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", getParam("category"));