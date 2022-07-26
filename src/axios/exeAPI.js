import { queryAllByAltText } from '@testing-library/react';
import axios from 'axios';

const axi = axios.create({
  baseURL: `http://127.0.0.1:3001`
});

const brandAPI = {
  getAll: () => axi.get('/brand'),
  update: (brand) =>
    axi.put(`/brand/${brand.get('_id')}`,
      brand,
      { headers: { 'content-type': `multipart/form-data; boundary=${brand._boundary}` } }
    ),
  create: (brand) =>
    axi.post(`/brand`,
      brand,
      { headers: { 'content-type': `multipart/form-data; boundary=${brand._boundary}` } }
    ),
  delete: (id) => axi.delete(`/brand/${id}`)
}

const newsCategoryAPI = {
  getAll: () => axi.get('/newsCategory'),
  update: (newsCategory) =>
    axi.put(`/newsCategory/${newsCategory.get('_id')}`,
      newsCategory,
      { headers: { 'content-type': `multipart/form-data; boundary=${newsCategory._boundary}` } }
    ),
  create: (newsCategory) =>
    axi.post(`/newsCategory`,
      newsCategory,
      { headers: { 'content-type': `multipart/form-data; boundary=${newsCategory._boundary}` } }
    ),
  delete: (id) => axi.delete(`/newsCategory/${id}`)
}

const categoryAPI = {
  getAll: () => axi.get('/category'),
  update: (category) =>
    axi.put(`/category/${category.get('_id')}`,
      category,
      { headers: { 'content-type': `multipart/form-data; boundary=${category._boundary}` } }
    ),
  create: (category) =>
    axi.post(`/category`,
      category,
      { headers: { 'content-type': `multipart/form-data; boundary=${category._boundary}` } }
    ),
  delete: (id) => axi.delete(`/category/${id}`)
}

const customerAPI = {
  getAll: () => axi.get('/customer'),
  update: (customer) => {
    return axi.put(`/customer/${customer._id}`, {
      customerName: customer.customerName,
      customerPhone: customer.customerPhone,
      customerAddress: customer.customerAddress,
      customerEmail: customer.customerEmail,
      customerPassword: customer.customerPassword,
      customerActive: customer.customerActive
    })
  }
}

const employeeAPI = {
  getAll: () => axi.get('/employee'),
  update: (employeeId, employee) =>
    axi.put(`/employee/${employee._id}`,
      employee,
      { headers: { 'content-type': `application/json` } }
    ),
  login: (inputLogin) => axi.post('/employee/login', inputLogin),
}

const productAPI = {
  getAll: () => axi.get('/product'),
  getBySupplier: (supplierId) => axi.get(`/product/supplier/${supplierId}`),
  update: (product) =>
    axi.put(`/product/${product.get('_id')}`,
      product,
      { headers: { 'content-type': `multipart/form-data; boundary=${product._boundary}` } }
    ),
  create: (product) =>
    axi.post(`/product`,
      product,
      { headers: { 'content-type': `multipart/form-data; boundary=${product._boundary}` } }
    ),
  delete: (id) => axi.delete(`/product/${id}`)
}

const newsAPI = {
  getAll: () => axi.get('/news'),

  update: (news) =>
    axi.put(`/news/${news.get('_id')}`,
      news,
      { headers: { 'content-type': `multipart/form-data; boundary=${news._boundary}` } }
    ),
  create: (news) =>
    axi.post(`/news`,
      news,
      { headers: { 'content-type': `multipart/form-data; boundary=${news._boundary}` } }
    ),
  delete: (id) => axi.delete(`/news/${id}`)
}

const supplierAPI = {
  getAll: () => axi.get('/supplier'),

  update: (supplierId, supplier) =>
    axi.put(`/supplier/${supplierId}`,
      supplier,
      { headers: { 'content-type': `application/json` } }
    ),
  create: (supplier) =>
    axi.post(`/supplier`, supplier,
      { headers: { 'content-type': `application/json` } }
    ),
  delete: (id) => axi.delete(`/supplier/${id}`)
}

const wareHouseAPI = {
  getAll: (activePage) => axi.get(`/wareHouse/admin?reqPage=${activePage}&reqLimit=${6}`),
  search: (searchTerm) => axi.get(`/warehouse?searchTerm=${searchTerm}`),
  getById: (id) => axi.get(`/warehouse/${id}`),
  delete: (id) => axi.delete(`/warehouse/${id}`),
  update: ({ wareHouseId, productId, wareHouse }) =>
    axi.put(`/wareHouse/${wareHouseId}?productId=${productId}`,
      wareHouse,
      { headers: { 'content-type': `application/json` } }
    ),
}

const importOrderAPI = {
  getAll: () => axi.get('/importOrder'),

  create: (data) =>
    axi.post(`/importOrder`, data)
}

const exportOrderAPI = {
  getAll: () => axi.get('/exportOrder'),

  create: (data) =>
    axi.post(`/exportOrder`, data)
}

const protectedAPI = {
  getAllLinkRoute: (token) => axi.get('/protected/linkroute', {
    headers: {
      "x-access-token": token
    }
  }),
  checkRoute: (token, permission) => axi.get(`/protected/checkroute?permission=${permission}`, {
    headers: {
      "x-access-token": token
    }
  })
}

const notificationAPI = {
  getAll: (token) => axi.get(`/notification`, {
    headers: {
      "x-access-token": token
    }
  })
}
export { notificationAPI, protectedAPI, brandAPI, categoryAPI, customerAPI, employeeAPI, productAPI, supplierAPI, importOrderAPI, exportOrderAPI, wareHouseAPI };