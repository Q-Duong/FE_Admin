import React, { useRef } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function CreateCategoryForm(props) {
    const {onCreateCategory, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
  
  function handleClose ()  {
    onCloseCreateform()
  };

  function handleCreateCategory() {
    if(onCreateCategory)
      onCreateCategory(formRef);
  }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm danh mục </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Tên danh mục"
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
                <Button variant="primary" onClick={handleCreateCategory}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateCategoryForm;