import axios from 'axios';

const axi =  axios.create({
  baseURL: `http://127.0.0.1:3001`
});

const brandAPI = {
  getAll: () => axi.get('/brand'),
  update: (brand) => 
    axi.put(`/brand/${brand.get('_id')}`, 
      brand,
      {headers: { 'content-type': `multipart/form-data; boundary=${brand._boundary}` }}
    ),
  create: (brand) => 
    axi.post(`/brand`, 
      brand,
      {headers: { 'content-type': `multipart/form-data; boundary=${brand._boundary}` }}
  ),
  delete: (id) => axi.delete(`/brand/${id}`)
}

const categoryAPI = {
  getAll: () => axi.get('/category'),
  update: (category) => 
    axi.put(`/category/${category.get('_id')}`, 
      category,
      {headers: { 'content-type': `multipart/form-data; boundary=${category._boundary}` }}
    ),
  create: (category) => 
    axi.post(`/category`, 
      category,
      {headers: { 'content-type': `multipart/form-data; boundary=${category._boundary}` }}
  ),
  delete: (id) => axi.delete(`/category/${id}`)
}

const customerAPI = {
  getAll: () => axi.get('/customer'),
  update: (customer) => {
    return axi.put(`/customer/${customer._id}`,{
      customerName:customer.customerName, 
      customerPhone:customer.customerPhone, 
      customerAddress:customer.customerAddress, 
      customerEmail:customer.customerEmail, 
      customerPassword:customer.customerPassword,
      customerActive:customer.customerActive
    })
  }
}

const employeeAPI = {
  getAll: () => axi.get('/employee'),
  update: (employee) => {
    return axi.put(`/employee/${employee._id}`,{
      employeeName:employee.employeeName,
      employeePhone:employee.employeePhone,
      employeeEmail:employee.employeeEmail,
      employeeRole:employee.employeeRole,
      employeeActive:employee.employeeActive,
      employeePassword:employee.employeePassword,
    })
  }
}

const productAPI = {
  getAll: () => axi.get('/product'),
  getBySupplier: (supplierId) => axi.get(`/product/supplier/${supplierId}`),
  update: (product) => 
    axi.put(`/product/${product.get('_id')}`, 
      product,
      {headers: { 'content-type': `multipart/form-data; boundary=${product._boundary}` }}
    ),
  create: (product) => 
    axi.post(`/product`, 
      product,
      {headers: { 'content-type': `multipart/form-data; boundary=${product._boundary}` }}
  ),
  delete: (id) => axi.delete(`/product/${id}`)
}

const supplierAPI = {
  getAll: () => axi.get('/supplier'),
 
  update: (supplier) => 
    axi.put(`/supplier/${supplier.get('_id')}`, 
      supplier,
      {headers: { 'content-type': `multipart/form-data; boundary=${supplier._boundary}` }}
    ),
  create: (supplier) => 
    axi.post(`/supplier`, 
      supplier,
      {headers: { 'content-type': `multipart/form-data; boundary=${supplier._boundary}` }}
  ),
  delete: (id) => axi.delete(`/supplier/${id}`)
}

const importOrderAPI = {
  getAll: () => axi.get('/supplier'),
 
  create: (data) => 
    axi.post(`/importOrder`, data)
}
export {brandAPI, categoryAPI, customerAPI, employeeAPI, productAPI, supplierAPI, importOrderAPI};