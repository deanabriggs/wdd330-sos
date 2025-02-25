const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// add to cart button event handler
export async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

export async function getProductsByCategory(category = "hammocks") {
  console.log(baseURL + `products/search/${category}`);
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);

  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);

  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  console.log(options);
  return await fetch(baseURL + "checkout", options).then((data) => {
    console.log(data);
    return convertToJson(data);
  });
}
