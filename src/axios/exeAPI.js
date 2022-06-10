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
  update: (category) => {
    return axi.put(`/category/${category._id}`,{
      categoryName:category.categoryName,
      categoryImage:category.categoryImage
    })
  }
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
  update: (product) => {
    return axi.put(`/product/${product._id}`,{
      productName:product.productName,
      productImage:product.productImage,
      unit:product.unit,
      productStatus:product.productStatus,
      categoryId:product.categoryId,
      brandId:product.brandId})
  }
}

const supplierAPI = {
  getAll: () => axi.get('/supplier'),
  update: (supplier) => {
    return axi.put(`/supplier/${supplier._id}`,{
      supplierName:supplier.supplierName,
      address:supplier.address,
      phone:supplier.phone})
  }
}
export {brandAPI, categoryAPI, customerAPI, employeeAPI, productAPI, supplierAPI};