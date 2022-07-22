import React, { useRef } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function CreateNewsCategoryForm(props) {
    const {onCreateNewsCategory, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
  
  function handleClose ()  {
    onCloseCreateform()
  };

  function handleCreateNewsCategory() {
    if(onCreateNewsCategory)
      onCreateNewsCategory(formRef);
  }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm mục tin tức </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên tin tức</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Tên tin tức "
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
                <Button variant="primary" onClick={handleCreateNewsCategory}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateNewsCategoryForm;