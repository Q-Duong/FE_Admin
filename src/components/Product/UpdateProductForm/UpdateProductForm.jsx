import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { brandAPI, categoryAPI ,productAPI} from '../../../axios/exeAPI';

const UpdateProductForm = (props) => {
  const {activeProduct, onUpdateProduct, isShow, onCloseUpdateform} = props;
  const [categories, setCategories] =
        useState([{_id:"123",name:"???",image: "???"}]);
  const [brands, setBrands] =
        useState([{_id:"123",name:"???",image: "???"}]);
  // const [products, setProducts] =
  //       useState([{_id:"123",name:"???",image: "???"}]);
  const formRef = useRef(null);
  const [category, setCategory] = useState(activeProduct.categoryId);
  const [brand, setBrand] = useState(activeProduct.brandId);
  const [categoryID, setCategoryId] = useState(activeProduct.category);
  const [name, setName] = useState(activeProduct.name);
  const [unit, setUnit] = useState(activeProduct.unit);
  const [status, setStatus] = useState(activeProduct.status);
  const [expireNumber, setExpireNumber] = useState(activeProduct.expireNumber);
  const [expireUnit, setExpireUnit] = useState(activeProduct.expireUnit);
  var selected = (categoryID === category) ? 'selected' : 'false';
  
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
    setName(activeProduct.name)
    setUnit(activeProduct.unit)
    setStatus(activeProduct.status)
    setExpireNumber(activeProduct.expireNumber)
    setExpireUnit(activeProduct.expireUnit)
  },[activeProduct])

  return (
    
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật sẩn phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} enctype="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Danh mục</Form.Label>
              <select name="categoryId" class="form-control m-bot15">
                  {categories.map((category) => (
                      <option value={category._id}>{category.name}</option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Thương hiệu</Form.Label>
              <select name="brandId" class="form-control m-bot15">
                  {brands.map((brand) => (
                      <option value={brand._id}>{brand.name}</option>
                  ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="myFile"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Đơn vị tính</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                placeholder="Đơn vị tính"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tình trạng</Form.Label>
              <Form.Control
                type="text"
                name="status"
                placeholder="Tình trạng"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hạn dùng</Form.Label>
              <Form.Control
                type="text"
                name="expireNumber"
                placeholder="Hạn dùng"
                value={expireNumber}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Đơn vị hạn dùng</Form.Label>
              <Form.Control
                type="text"
                name="expireUnit"
                placeholder="Đơn vị hạn dùng"
                value={expireUnit}
                onChange={(e) => {
                  setStatus(e.target.value);
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
