import React, { useRef } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

function CreateBrandForm(props) {
    const {onCreateBrand, isShow, onCloseCreateform} = props;
    const formRef = useRef(null);
  
  function handleClose ()  {
    onCloseCreateform()
  };

  function handleCreateBrand() {
    if(onCreateBrand)
      onCreateBrand(formRef);
  }

    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm thương hiệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên thương hiệu</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Tên thương hiệu"
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
                <Button variant="primary" onClick={handleCreateBrand}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateBrandForm;