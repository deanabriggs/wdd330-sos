const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
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

export async function findRandomProduct(prodId) {
  const response = await fetch(baseURL + `product/${prodId}`);
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


// async function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw { name: 'servicesError', message: jsonResponse };
//   }
// }

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: user,
  };
  const url = `${baseURL}login`;
  const response = await fetch(url, options).then(convertToJson);
  console.log("loginResponse", response);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `${baseURL}orders`;
  return await fetch(url, options).then(convertToJson);
}
