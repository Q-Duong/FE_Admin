import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const UpdateNewsCategoryForm = (props) => {
  const { activeNewsCategory, onUpdateNewsCategory, isShow, onCloseUpdateform } = props;
  const formRef = useRef(null);
  const [name, setName] = useState(activeNewsCategory.name);

  function handleClose() {
    if (onCloseUpdateform)
      onCloseUpdateform()
  };

  function handleUpdatedNewsCategory() {
    if (onUpdateNewsCategory)
      onUpdateNewsCategory(formRef);
  }

  useEffect(() => {
    setName(activeNewsCategory.name)
  }, [activeNewsCategory])

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật tin tức</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} enctype="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên tin tức</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên tin tức "
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
          <Button variant="primary" onClick={handleUpdatedNewsCategory}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default UpdateNewsCategoryForm;
