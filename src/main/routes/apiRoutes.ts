const baseUrl = "https://burgerlivery-api.vercel.app";

export const apiRoutes = {
  login: `${baseUrl}/user/login`,
  order: `${baseUrl}/order/create-order`,
  categories: `${baseUrl}/categories`,
  hamburgers: `${baseUrl}/hamburgers`,
  appetizers: `${baseUrl}/appetizers`,
  desserts: `${baseUrl}/desserts`,
  beverages: `${baseUrl}/beverages`,
  payment: `${baseUrl}/payment/options`,
};
