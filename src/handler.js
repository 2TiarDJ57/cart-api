const { nanoid } = require('nanoid')
const carts = require('./carts')

const addProductHandler = (request, h) => {
  const { nameProduct, publisher, price, category, qtyProduct } = request.payload
  const productId = nanoid(16)
  const totalPrice = qtyProduct * price
  let stock = Math.floor(Math.random() * 10)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  if (nameProduct === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, nama product harus di isi!'
    }).code(400)
  }

  if (price === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, price product harus di isi'
    }).code(400)
  }

  if (qtyProduct === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, qty product harus di isi'
    }).code(400)
  }

  if (qtyProduct > stock) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan product, qty product tidak boleh lebih dari stock'
    }).code(400)
  }

  stock -= qtyProduct

  const newProduct = {
    productId,
    nameProduct,
    publisher,
    price,
    stock,
    category,
    createdAt,
    updatedAt,
    totalPrice,
    qtyProduct
  }

  carts.push(newProduct)

  const isSuccess = carts.filter((p) => p.productId === productId).length > 0
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Product berhasil ditambahkan',
      data: {
        productId
      }
    }).code(201)
  }
}

const getAllProductsHandler = (request, h) => {
  const { nameProduct, stock, category } = request.query

  return h.response({
    status: 'success',
    data: carts
  })
}

module.exports = { addProductHandler, getAllProductsHandler }
