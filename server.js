require('dotenv').config();
const express = require('express');
/* const cors = require('cors'); */
// const shopify = require('@shopify/shopify-api')
const { authorize, redirect } = require('./ShopifyOAuthHelper')
const app = express();
const { shopifyApi, LATEST_API_VERSION, ApiVersion } = require('@shopify/shopify-api');
require('@shopify/shopify-api/adapters/node');



// router 
const admin = require('./routes/routers');
const shopify = shopifyApi({
  apiKey: process.env.apiKey,
  apiSecretKey: `${process.env.apiSecret}`,
  scopes: ['read_products'],
  hostName: 'ngrok-tunnel-address',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false // Set this to true if app is embedded in backend
});

app.use(express.json());
/* app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only specific headers
})); */

app.use('/admin', admin)
app.use('/customersInfo', admin)

app.get('/api/shopify/authorize', async (req, res) => {
  res.redirect(await authorize(req.query.shop))
})

app.get('/api/shopify/redirect', async (req, res) => {
  return res.json(await redirect(req.query.code, req.query.shop))
})

// Requests to /my-endpoint must be made with authenticated Fetch for embedded apps
app.get('/my-endpoint', async (req, res) => {
  const sessionId = await shopify.session.getCurrentId({
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });

  console.log({sessionId})

  // use sessionId to retrieve session from app's session storage
  // getSessionFromStorage() must be provided by application
  

  const client = new shopify.clients.Rest({
    session: sessionId,
    apiVersion: ApiVersion.January23,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listing on the port ${process.env.PORT}`)
})