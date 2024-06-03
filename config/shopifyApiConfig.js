const { shopifyApi } = require("@shopify/shopify-api");
const Shopify = require("shopify-api-node");

const shopifyApiConfig = new Shopify({
  shopName: `${process.env.shopName}`,
  accessToken: `${process.env.accessToken}`
});



module.exports = shopifyApiConfig