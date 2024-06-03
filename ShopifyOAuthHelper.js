const axios = require('axios');
const authorize = async (shop) => {
  return encodeURI(`https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.ClientID}&scopes=${process.env.scopes}&redirect_uri=${process.env.redirectUri}`)
}

const redirect = async (code, shop) => {
  let shopifyOAuthUri = `https://${shop}/admin/oauth/access_token?client_id=${process.env.ClientID}&client_secret=${process.env.Clientsecret}&code=${code}`
  const {data} = await axios({
    url: shopifyOAuthUri,
    method:'post',
    data:{}
  }).then(response => {
    console.log({response});
    return response
  })
  .catch(err => {
    console.log(err.message);
    return err.message
  })

  console.log({data})
  return data
}

module.exports = {
  authorize,
  redirect
}