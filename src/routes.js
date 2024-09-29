const { addProductHandler, getAllProductsHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/carts',
    handler: addProductHandler
  },

  {
    method: 'GET',
    path: '/carts',
    handler: getAllProductsHandler
  }
]

module.exports = routes
