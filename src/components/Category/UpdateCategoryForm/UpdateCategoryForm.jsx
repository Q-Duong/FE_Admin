import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateCategoryForm = (props) => {
  const {activeCategory, onUpdateCategory, isShow, onCloseUpdateform} = props;
  const formRef = useRef(null);
  const [name, setName] = useState(activeCategory.name);
  
  function handleClose ()  {
    if(onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedCategory() {
    if(onUpdateCategory)
      onUpdateCategory(formRef);
  }

  useEffect(() => {
    setName(activeCategory.name)
  },[activeCategory])

  return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} enctype="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên danh mục"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Logo</Form.Label>
              <Form.Control
                type="file"
                name="myFile"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdatedCategory}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateCategoryForm;
