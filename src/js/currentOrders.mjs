import { getOrders } from "./externalServices.mjs";

export async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders.map(orderTemplate).join(""); //TODO: Update this to adjacentHTML
  } catch (err) {
    console.error(err);
  }
}

function orderTemplate(order) {
  return `<tr><td>${order.id}</td>
  <td${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${order.orderTotal}</td></tr>`;
}
