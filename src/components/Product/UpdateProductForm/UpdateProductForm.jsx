import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { brandAPI, categoryAPI } from '../../../axios/exeAPI';

const UpdateProductForm = (props) => {
  const {activeProduct, onUpdateProduct, isShow, onCloseUpdateform} = props;
  const [categories, setCategories] =
        useState([{_id:"123",categoryName:"???",categoryImage: "???"}]);
  const [brands, setBrands] =
        useState([{_id:"123",brandName:"???",brandImage: "???"}]);
  const formRef = useRef(null);
  const [category, setCategory] = useState(activeProduct.categoryId);
  const [brand, setBrand] = useState(activeProduct.brandId);
  const [name, setName] = useState(activeProduct.productName);
  const [unit, setUnit] = useState(activeProduct.unit);
  const [status, setStatus] = useState(activeProduct.productStatus);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedProduct() {
    if(onUpdateProduct)
      onUpdateProduct(formRef);
  }

  useEffect(()=> {
    async function getCategories() {
        const categories = await categoryAPI.getAll();
        setCategories(categories.data);
    }
    getCategories()
  },[])
  useEffect(()=> {
    async function getBrands() {
        const brands = await brandAPI.getAll();
        setBrands(brands.data);
    }
    getBrands()
  },[])

  useEffect(() => {
    setCategory(activeProduct.categoryId)
    setBrand(activeProduct.brandId)
    setName(activeProduct.productName)
    setUnit(activeProduct.unit)
    setStatus(activeProduct.productStatus)
  },[activeProduct])

  return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} enctype="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Danh mục</Form.Label>
              <select name="categoryId" class="form-control m-bot15">
                  {categories.map((category) => (
                      <option value={category._id}>{category.categoryName}</option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Thương hiệu</Form.Label>
              <select name="brandId" class="form-control m-bot15">
                  {brands.map((brand) => (
                      <option value={brand._id}>{brand.brandName}</option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                placeholder="Product Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="myFile"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Đơn vị</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                placeholder="Đơn vị"
                value={unit}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tình trạng</Form.Label>
              <Form.Control
                type="text"
                name="productStatus"
                placeholder="Tinhf trajng"
                value={status}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatedProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateProductForm;
