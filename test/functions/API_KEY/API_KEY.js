const process = require('process')

const handler = function () {
  // apply our function to the queryStringParameters and assign it to a variable
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { API_SECRET } = process.env.API_SECRET;
  const URL = `${API_SECRET}`

  console.log('Constructed URL is ...', URL)

  return URL;
}

module.exports = { handler }
