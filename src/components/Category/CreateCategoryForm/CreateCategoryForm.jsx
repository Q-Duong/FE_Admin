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
                <Modal.Title>Create Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form ref={formRef} enctype="multipart/form-data">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="categoryName"
                        placeholder="Category Name"
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
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateCategory}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateCategoryForm;