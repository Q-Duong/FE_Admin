import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { brandAPI, categoryAPI, NewsAPI } from '../../../axios/exeAPI';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateNewsForm = (props) => {
  const { activeNews, onUpdateNews, isShow, onCloseUpdateform } = props;
  const [categories, setCategories] =
    useState([{ _id: "123", name: "???", image: "???" }]);
  const [brands, setBrands] =
    useState([{ _id: "123", name: "???", image: "???" }]);
  // const [Newss, setNewss] =
  //       useState([{_id:"123",name:"???",image: "???"}]);
  const formRef = useRef(null);
  const [category, setCategory] = useState(activeNews.categoryId);
  const [brand, setBrand] = useState(activeNews.brandId);
  const [categoryID, setCategoryId] = useState(activeNews.category);
  const [name, setName] = useState(activeNews.name);
  const [unit, setUnit] = useState(activeNews.unit);
  const [status, setStatus] = useState(activeNews.status);
  const [description, setDescription] = useState(activeNews.description);

  var selected = (categoryID === category) ? 'selected' : 'false';

  function handleClose() {
    if (onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedNews() {
    if (onUpdateNews)
      onUpdateNews(formRef);
  }

  useEffect(() => {
    async function getCategories() {
      const categories = await categoryAPI.getAll();
      setCategories(categories.data);
    }
    getCategories()
  }, [])
  useEffect(() => {
    async function getBrands() {
      const brands = await brandAPI.getAll();
      setBrands(brands.data);
    }
    getBrands()
  }, [])

  useEffect(() => {
    setCategory(activeNews.categoryId)
    setBrand(activeNews.brandId)
    setName(activeNews.name)
    setUnit(activeNews.unit)
    setStatus(activeNews.status)
    setDescription(activeNews.description)

  }, [activeNews])

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
              <Form.Label>Mô tả sản phẩm</Form.Label>
              {/* <Form.Control
                type="text"
                name="expireUnit"
                placeholder="Đơn vị hạn dùng"
                value={expireUnit}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                autoFocus
              /> */}
              <input type="text" name="description" value={description} style={{ display: "none" }} id="a" onChange={(e) => {
                setDescription(e.target.value);
              }} />
              <CKEditor
                editor={ClassicEditor}


                // onReady={ editor => {
                //     // You can store the "editor" and use when it is needed.
                //     console.log( 'Editor is ready to use!', editor );
                // } }
                onChange={(event, editor) => {
                  const data = editor.getData();
                  document.getElementById("a").setAttribute("value", data);

                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatedNews}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateNewsForm;
